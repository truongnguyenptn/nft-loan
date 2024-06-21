// THIS IS A FAKE DATA FOR OUR BACKEND, YOU CAN BASE ON THE DATA TO CREATE A DATABASE WITH (PG OR MYSQL) TO HAVE A GOOD STORAGE
export enum ROLE {
  LENDER = 'LENDER',
  BORROWER = 'BORROWER',
}

export enum REQUEST_STATUS {
  REJECT = 'REJECT',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
}

// CREATE A TABLE USER WITH THIS COLUMN
export type USER = {
  id: number;
  publickKey: string;
  email: string;
  role: ROLE;
};

// CREATE A TABLE OFFER WITH THIS COLUMN
export type OFFER = {
  id: number;
  ownerId: number;
  amount: number;
  interest: number;
};

// CREATE A TABLE REQUEST WITH THIS COLUMN
export type REQUEST = {
  id: number;
  ownerId: number;
  assetId: string;
  status: REQUEST_STATUS;
  offerId: number;
};

export const DATA_USERS: USER[] = [
  {
    id: 1,
    email: 'billcipher310@gmail.com',
    publickKey: 'UPDATE THIS TO PUBLICK KEY OF WHO IS LENDER',
    role: ROLE.LENDER,
  },
  {
    id: 2,
    email: 'truongnguyenptn@gmail.com',
    publickKey: 'UPDATE THIS TO PUBLICK KEY OF WHO IS BORROWER',
    role: ROLE.BORROWER,
  },
  {
    id: 3,
    email: 'user1@gmail.com',
    publickKey: 'ksadlbfasdfhkjsadjhfbsdjfhbsdafsbdfjk',
    role: ROLE.BORROWER,
  },
  {
    id: 4,
    email: 'user2@gmail.com',
    publickKey: 'asdhkbasdaskdjasknaskjbkasfbkasnjdkjasnd',
    role: ROLE.BORROWER,
  },
];

export const DATA_REQUESTS: REQUEST[] = [
  {
    id: 1,
    ownerId: 3,
    assetId: 'asjhdbasjdhbajsbdfmnfwekjdfbkejwdndfnksjf',
    status: REQUEST_STATUS.PROCESSING,
    offerId: 1,
  },
  {
    id: 2,
    ownerId: 4,
    assetId: 'asdjnasdkjansdkjnfrekewufhewnwefncwejfnwe',
    status: REQUEST_STATUS.PROCESSING,
    offerId: 1,
  },
];
