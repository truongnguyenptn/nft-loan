import React, { useContext, useState } from 'react';
import {
  Button,
  FormControl,
  Input,
  useToast,
  FormLabel,
} from '@chakra-ui/react';
import { TopUpIcon } from './icons';
import Modal from './common/Modal';
import { TopupTxData } from '@elusiv/sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { AppContext } from '@/contexts/AppProvider';
import { useMutation } from 'react-query';
import { sendRequest } from '@/api/server';

export default function BorrowingRequest({
  isBorrowingRequestodalVisible,
  toggleBorrowingRequestodalVisible,
  className,
}: {
  className?: string;
  isBorrowingRequestodalVisible: boolean;
  toggleBorrowingRequestodalVisible: () => void;
}) {
  const {
    wallet: { elusiv },
  } = useContext(AppContext);
  const { signTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>();
  const [receivingAccount, setReceivingAccount] = useState<string>();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(e.target.value as unknown as number);

  const handleReceivingAccountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setReceivingAccount(e.target.value as unknown as number);
  const toast = useToast();
  const { mutate: sendReq } = useMutation(sendRequest, {
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Request verified',
        position: 'top-right',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return (
    <div className={className}>
      <Button
        isLoading={loading}
        leftIcon={<TopUpIcon />}
        colorScheme="purple"
        onClick={toggleBorrowingRequestodalVisible}
        className="w-[200px]"
      >
        Request
      </Button>
      <Modal
        loading={loading}
        isOpen={isBorrowingRequestodalVisible}
        actionLabel="Submit request"
        onClose={toggleBorrowingRequestodalVisible}
        modalLabel="Request to borrow money"
        onSubmit={() => {
          sendReq({
            assetId: 'F9Lw3ki3hJ7PF9HQXsBzoY8GyE6sPoEZZdXJBsTTD2rk',
            owner: 'CbSKdjmeR8ursxzJHXqk6sQJjQUCCC1sof6NLtABoTC4',
          });
        }}
      >
        <FormControl isRequired>
          <FormLabel>NFT ID</FormLabel>
          <Input value={amount} onChange={handleAmountChange}></Input>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Receiving Account</FormLabel>
          <Input
            value={receivingAccount}
            onChange={handleReceivingAccountChange}
          ></Input>
        </FormControl>
      </Modal>
    </div>
  );
}
