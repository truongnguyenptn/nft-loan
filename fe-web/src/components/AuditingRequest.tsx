import React, { useContext, useState } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { TopUpIcon } from './icons';
import Modal from './common/Modal';
import { useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { AppContext } from '@/contexts/AppProvider';
import Request from './Requests/Request';
import { useQuery } from 'react-query';
import { getAllRequest } from '@/api/server';
import { ELUSIV_KEY } from '@/constants';

export default function AuditingRequest({
  isAuditingRequestodalVisible,
  toggleAuditingRequestodalVisible,
}: {
  isAuditingRequestodalVisible: boolean;
  toggleAuditingRequestodalVisible: () => void;
}) {
  const {
    wallet: { elusiv },
  } = useContext(AppContext);
  const { signTransaction, publicKey } = useWallet();
  const [loading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState<number>();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(e.target.value as unknown as number);
  const toast = useToast();

  const { data: requests, refetch } = useQuery('requests', () =>
    getAllRequest('1')
  );

  const handleSendPrivateBalance = async (pubKey: string, amount: number) => {
    if (!elusiv || !publicKey) {
      toast({
        title: 'Can not process when you not have accept Elusiv Transfer',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    setIsLoading(true);
    const sendTx = await elusiv!.buildSendTx(
      LAMPORTS_PER_SOL * amount,
      new PublicKey(pubKey),
      'LAMPORTS',
      undefined,
      ELUSIV_KEY
    );
    await elusiv!.sendElusivTx(sendTx);
    toast({
      title: 'Send money success',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top-right',
    });
    setIsLoading(false);
  };
  return (
    <div>
      <Button
        isLoading={loading}
        leftIcon={<TopUpIcon />}
        colorScheme="purple"
        onClick={() => {
          toggleAuditingRequestodalVisible();
          refetch();
        }}
        className="w-[200px]"
      >
        Auditing request
      </Button>
      <Modal
        loading={loading}
        isOpen={isAuditingRequestodalVisible}
        onClose={toggleAuditingRequestodalVisible}
        modalLabel="Auditing Requests"
        onSubmit={() => {}}
      >
        {Array.isArray(requests?.data) && (
          <div className="flex flex-col gap-4">
            {requests?.data?.map((request) => {
              return (
                <Request
                  key={request.id}
                  request={request}
                  acceptRequestAction={async () => {
                    await handleSendPrivateBalance(
                      'CwntKGRnMEPUsGpi6ZYq9hWqrhzLNTgEq1YFJ9S2xy4X',
                      0.1
                    );
                    refetch();
                  }}
                />
              );
            })}
          </div>
        )}
      </Modal>
    </div>
  );
}
