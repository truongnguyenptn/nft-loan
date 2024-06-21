import { Box, Card, CardBody, Heading, Stack, StackDivider, Text } from '@chakra-ui/react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import React from 'react'

interface TransactionItemProps {
    owner: string,
    recepient: string,
    amount: number
}

function TransactionItem({ owner, recepient, amount }: TransactionItemProps) {
    return (
        <Card className='mb-2 bg-zinc-700 mr-2' >
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Heading size='xs' textTransform='uppercase' color='white'>
                            Owner: {owner}
                        </Heading>
                    </Box>
                    <Box>
                        <Heading size='xs' textTransform='uppercase' color='white'>
                            Recepient: {recepient}
                        </Heading>
                    </Box>
                    <Box>
                        <Heading size='xs' textTransform='uppercase' color='white'>
                            Amount: {amount / LAMPORTS_PER_SOL} (SOL)
                        </Heading>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default TransactionItem;