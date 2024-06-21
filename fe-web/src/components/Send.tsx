import React, { useContext, useEffect, useState } from "react";
import { Elusiv } from '@elusiv/sdk';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { SendIcon } from "./icons";
import Modal from '@/components/common/Modal';
import { AppContext } from "@/contexts/AppProvider";

interface SendProps {
    totalBalance: bigint | undefined,
    isSendModalVisible: boolean,
    toggleSendModalVisible: () => void,
    setTransaction: (obj: any) => void
}

export default function Send({ totalBalance, isSendModalVisible, toggleSendModalVisible, setTransaction }: SendProps) {
    const { publicKey } = useWallet();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [receivePubKey, setReceivePubKey] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const { wallet: {elusiv} } = useContext(AppContext);

    const handleSendPrivateBalance = async (pubKey: string, amount: number) => {
        if (!elusiv || !publicKey || !totalBalance) {
            toast({
                title: "Can not process when you not have accept Elusiv Transfer",
                status: "warning",
                duration: 9000,
                isClosable: true
            });

            return;
        };

        if (new BigNumber(totalBalance.toString()).isLessThan(amount)) {
            toast({
                title: "Not enough balance in Elusiv",
                description: "The amount you send is more than total balance you have in Elusiv",
                status: "warning",
                duration: 9000,
                isClosable: true,
                position: "top-right"
            })
        }
        setIsLoading(true);
        const sendTx = await elusiv!.buildSendTx(LAMPORTS_PER_SOL * amount, new PublicKey(pubKey), "LAMPORTS");
        await elusiv!.sendElusivTx(sendTx);
        toast({
            title: "Send money success",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top-right"
        });
        setTransaction(sendTx);
        setIsLoading(false);
    }

    return (
        <div>
            <Button
                leftIcon={<SendIcon />}
                colorScheme="whatsapp"
                onClick={toggleSendModalVisible}
                isLoading={isLoading}
                className='w-[200px]'
            >
                send
            </Button>
            <Modal
                isOpen={isSendModalVisible}
                actionLabel="Send"
                onClose={toggleSendModalVisible}
                modalLabel="Send Private Balance from Elusiv to recepient"
                onSubmit={async () => {
                    await handleSendPrivateBalance(receivePubKey, amount);
                    toggleSendModalVisible()
                }}
                loading={isLoading}
            >
                <div>Total Balance: {totalBalance ? new BigNumber(totalBalance.toString()).dividedBy(LAMPORTS_PER_SOL).toString() + " SOL": "" }</div>

                <FormControl>
                    <FormLabel>Recipient Publick Key</FormLabel>
                    <Input type='text' onChange={(event) => setReceivePubKey(event.target.value)}/>
                </FormControl>

                <FormControl>
                    <FormLabel>Amount (SOL)</FormLabel>
                    <Input type='number' onChange={(event) => setAmount(+event.target.value)}/>
                </FormControl>
            </Modal>
        </div>
    )
}