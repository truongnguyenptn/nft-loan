import { sendRequest } from '@/api/server';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import React from 'react';

export default function Modal({
  onClose,
  isOpen,
  onSubmit,
  modalLabel,
  loading,
  children,
  actionLabel,
}: {
  onClose: () => void;
  children?: React.ReactNode;
  onSubmit: () => void;
  isOpen: boolean;
  modalLabel: string;
  actionLabel?: string;
  loading: boolean;
}) {

  return (
    <ChakraModal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent
        bg="#181818"
        color="white"
        borderRadius="base"
        _focus={{
          outline: 'none',
        }}
      >
        <ModalHeader>{modalLabel}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter justifyContent="center">
          {!!actionLabel && (
            <Button
              colorScheme="purple"
              onClick={onSubmit}
              isLoading={loading}
              fontWeight="bold"
              textTransform="uppercase"
            >
              {actionLabel}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
}
