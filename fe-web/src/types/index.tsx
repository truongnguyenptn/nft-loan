export interface Request {
  id: string;
  ownerId: string;
  NftId: string;
  status: string;
  offerId: string;
  owner: {
    id: number;
    email: string;
    publickKey: string;
    role: Role;
  };
}

export enum REQUEST_STATUS {
  REJECT = 'REJECT',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
}
export enum ROLE {
  LENDER = 'LENDER',
  BORROWER = 'BORROWER',
}

export interface ApiRequest {
  assetId: string;
  owner: string;
}
export interface Offer {
  id: string;
  ownerId: string;
  Amount: string;
  Interest: string;
  Description: string;
}
