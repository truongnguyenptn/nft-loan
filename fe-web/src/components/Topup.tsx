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

export default function Topup({
  isTopUpModalVisible,
  toggleTopUpModalVisible,
  setTransaction,
}: {
  isTopUpModalVisible: boolean;
  toggleTopUpModalVisible: () => void;
  setTransaction: (obj: any) => void;
}) {
  const {
    wallet: { elusiv },
  } = useContext(AppContext);
  const { signTransaction } = useWallet();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(e.target.value as unknown as number);
  const toast = useToast();
  // topup function to elusiv wallet
  const topup = async () => {
    if (!signTransaction || !elusiv || !amount) return;
    setLoading(true);
    try {
      const topupTx = await elusiv?.buildTopUpTx(
        amount * LAMPORTS_PER_SOL,
        'LAMPORTS'
      );
      const signature = await signTransaction(topupTx.tx);

      const rebuildTopup = new TopupTxData(
        topupTx.getTotalFee(),
        'LAMPORTS',
        topupTx.lastNonce,
        topupTx.commitmentHash,
        topupTx.merkleStartIndex,
        topupTx.wardenInfo,
        signature,
        topupTx.hashAccIndex,
        topupTx.merge
      );

      const reponse = await elusiv.sendElusivTx(rebuildTopup);
      setTransaction(reponse);
      if (reponse?.err) throw new Error(reponse.err.toString());
      toast({
        title: 'Topup succesfully.',
        description: `Topup ${amount} SOL succesfully.`,
        status: 'success',
        duration: 9000,
        position: 'top-right',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Topup failed.',
        description: error?.toString(),
        position: 'top-right',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Button
        isLoading={loading}
        leftIcon={<TopUpIcon />}
        colorScheme="purple"
        onClick={toggleTopUpModalVisible}
        className='w-[200px]'
      >
        Topup
      </Button>
      <Modal
        loading={loading}
        isOpen={isTopUpModalVisible}
        actionLabel="Topup"
        onClose={toggleTopUpModalVisible}
        modalLabel="Topup to Elusiv"
        onSubmit={() => {
          topup();
        }}
      >
        <FormControl isRequired>
          <FormLabel>Amount (SOL)</FormLabel>
          <Input value={amount} onChange={handleInputChange}></Input>
        </FormControl>
      </Modal>
    </div>
  );
}
