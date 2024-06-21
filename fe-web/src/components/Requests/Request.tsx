import { finalizeRequest } from '@/api/server';
import { REQUEST_STATUS, Request as RequestType } from '@/types';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';

interface Props {
  request: RequestType;
  acceptRequestAction: () => void;
}
export default function Request({ request, acceptRequestAction }: Props) {
  const toast = useToast();
  const { mutate: acceptRequest } = useMutation(finalizeRequest, {
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Request accepted',
        position: 'top-right',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      toast({
        title: 'Info',
        description: 'Sending money to borrower',
        position: 'top-right',
        status: 'info',
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
    <div>
      <Card
        style={{
          backgroundColor: '#1a202c',
          color: '#fff',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        }}
      >
        <CardHeader>
          <Heading size="md">Request</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4" gap={'1'}>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                {request.owner.email}
              </Heading>
              <Text pt="2" fontSize="sm">
                View a summary of all your clients over the last month.
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                OwnerId
              </Heading>
              <Text pt="2" fontSize="sm">
                {request.NftId}
              </Text>
            </Box>
            {request.status !== REQUEST_STATUS.PROCESSING && (
              <>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Status
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {request.status === REQUEST_STATUS.COMPLETE ? (
                      <>
                        Accepted <CheckIcon color={'green'} />
                      </>
                    ) : (
                      <>
                        Rejected <CloseIcon color={'red'} />
                      </>
                    )}
                  </Text>
                </Box>
              </>
            )}
            {request.status === REQUEST_STATUS.PROCESSING && (
              <Button
                colorScheme="green"
                disabled={request.status === REQUEST_STATUS.PROCESSING}
                onClick={() => {
                  acceptRequest({
                    id: request.id,
                  });
                  acceptRequestAction();
                }}
              >
                Accept
              </Button>
            )}
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}
