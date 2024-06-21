import { Cluster } from '@solana/web3.js';

export const DEVNET_RPC_URL = "https://api.devnet.solana.com";
export const CLUSTER: Cluster = 'devnet';


export const supportedNFTs = [];

export const OFFERS = [
  {
    "id": 1,
    "title": "Lending offer for Mad lad NFTs",
    // "description:" "I can let you rentmy NFT for 1 day",
    "nftCollectionName": "Mad lad collection",
    "nftCollectionImg": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/mad_lads_pfp_1682211343777.png",
    "maximumLending": 20,
    "interestRate": 10,
    "userImg": "https://pbs.twimg.com/media/EAG8lr6XkAA5ltJ.jpg",
    "userName": "Tony Stark",
  },
  {
    "id": 2,
    "title": "Lending offer for Famous Fox Federation NFTs",
    // "description:" "I can let you rentmy NFT for 1 day",
    "nftCollectionName": "Famous Fox Federation collection",
    "nftCollectionImg": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/famous_fox_federation_pfp_1679672949828.gif",
    "maximumLending": "50",
    "interestRate": "10",
    "userImg": "https://pm1.aminoapps.com/6874/6829d8215d0c64bf35e489a120a87e58f6b451eer1-372-442v2_uhq.jpg",
    "userName": "Steve Rogers",
    // "content": "Lending"
  },
  {
    "id": 3,
    "title": "Lending offer for The Heist NFTs",
    // "description:" "I can let you rentmy NFT for 1 day",
    "nftCollectionName": "The Heist collection",
    "nftCollectionImg": "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://bafybeigch4m7rbec2l255powwbjmacnyj5n5o54qcboiwfgs2nnw6thimq.ipfs.nftstorage.link/",
    "maximumLending": "40",
    "interestRate": "10",
    "userImg": "https://i.pinimg.com/originals/48/1c/dc/481cdcac403956bed3c24e56da0595b9.jpg",
    "userName": "Carol Danvers",
    // "content": "Lending"
  },
]
export const ELUSIV_KEY = "THIS_IS_A_ELUSIV_KEY";