import { sign } from '@noble/ed25519';
import {
    ConfirmedSignatureInfo,
    Keypair,
    LAMPORTS_PER_SOL,
    Connection
} from '@solana/web3.js';
import { Elusiv, TokenType, SEED_MESSAGE } from '@elusiv/sdk';
import {
    CLUSTER, 
    DEVNET_RPC_URL
} from '@/constants';

export async function initElusiv(privateKey: Uint8Array): Promise<{
    elusiv: Elusiv,
    keyPair: Keypair,
    conn: Connection
}> {
    if(privateKey.length === 0) throw new Error('Need to provide a private key');
    const conn = new Connection(DEVNET_RPC_URL);
    const keyPair = Keypair.fromSecretKey(privateKey);

    const seed = await sign(
        Buffer.from(SEED_MESSAGE, 'utf-8'),
        keyPair.secretKey.slice(0, 32),
    );


    const elusiv = await Elusiv.getElusivInstance(
        seed,
        keyPair.publicKey,
        conn,
        CLUSTER
    );

    return { elusiv, keyPair, conn };
}

export async function topup(
    elusiv: Elusiv,
    keyPair: Keypair,
    amount: number,
    tokenType: TokenType
): Promise<ConfirmedSignatureInfo> {
    const topupTx = await elusiv.buildTopUpTx(amount, tokenType);
    topupTx.tx.partialSign(keyPair);

    return elusiv.sendElusivTx(topupTx);
}