import { PrivateTxWrapper, getSendTxWithViewingKey } from '@elusiv/sdk';
import React, { useContext, useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { GlobalIcon } from './icons';
import Modal from './common/Modal';
import { Button } from '@chakra-ui/react';
import { AppContext } from '@/contexts/AppProvider';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import TransactionItem from './TransactionItem';
interface ViewPrivateTransactionProps {
  isViewTransactionModalVisible: boolean;
  toggleViewTransactionModalVisible: () => void;
  className?: string;
}

interface TransactionModal {
  owner: string;
  recepient: string;
  amount: number;
}

export default function ViewPrivateTransaction({
  isViewTransactionModalVisible,
  toggleViewTransactionModalVisible,
  className,
}: ViewPrivateTransactionProps) {
  const {
    wallet: { elusiv },
  } = useContext(AppContext);
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [listOfTxs, setListOfTxs] = useState<TransactionModal[]>([]);

  const handleViewTransaction = async () => {
    if (!publicKey || !elusiv) return;
    setLoading(true);
    const last10Txs = await elusiv.getPrivateTransactions(10, 'LAMPORTS');
    if (last10Txs.length === 0) {
      setLoading(false); // Set loading to false if there are no transactions
      return;
    }
    const listOfSendTx = last10Txs.filter((tx) => tx.txType === 'SEND');

    const listOfResolvedTx = await Promise.all(
      listOfSendTx.map(transformTransaction)
    );
    setListOfTxs(
      listOfResolvedTx.filter((tx) => tx !== null) as TransactionModal[]
    );
    setLoading(false);
  };

  const transformTransaction = async (
    tx: PrivateTxWrapper
  ): Promise<TransactionModal | null> => {
    if (!elusiv) return null;

    const viewingKey = elusiv.getViewingKey(tx);
    const decryptedTx = await getSendTxWithViewingKey(
      connection,
      'devnet',
      viewingKey
    );

    return {
      owner: decryptedTx.owner.toString(),
      recepient: decryptedTx.sendTx.recipient!.toString(),
      amount: decryptedTx.sendTx.amount,
    };
  };

  return (
    <div className={className}>
      <Button
        leftIcon={<GlobalIcon />}
        colorScheme="telegram"
        isLoading={loading}
        onClick={async () => {
          await handleViewTransaction();
          toggleViewTransactionModalVisible();
        }}
        className="w-[200px]"
      >
        View transaction
      </Button>
      {!loading && (
        <Modal
          loading={loading}
          isOpen={isViewTransactionModalVisible}
          onClose={toggleViewTransactionModalVisible}
          modalLabel="View Private Transaction on Elusiv"
          onSubmit={() => {}}
        >
          {
            <div className="max-h-[400px] w-[400px] overflow-scroll overflow-x-hidden scroll-mx-0">
              {listOfTxs.map((tx, index) => {
                return (
                  <TransactionItem
                    amount={tx.amount}
                    owner={tx.owner}
                    recepient={tx.recepient}
                    key={index}
                  />
                );
              })}
            </div>
          }
        </Modal>
      )}
    </div>
  );
}
