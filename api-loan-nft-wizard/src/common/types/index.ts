interface TransactionLogWebhook {
  accountData: object[];
  description: '';
  events: object;
  fee: number;
  feePayer: string;
  instructions: object[];
  nativeTransfers: any[];
  signature: string;
  slot: number;
  source: string;
  timestamp: number;
  tokenTransfers: any[];
  transactionError: any;
  type: string;
}

interface AssetType {
  interface: 'string';
  id: 'string';
  content: {
    $schema: 'string';
    json_uri: 'string';
    files: [];
    items: any;
    metadata: {
      attributes: [];
      description: 'string';
      name: 'string';
      symbol: 'string';
    };
    links: {
      external_url: 'string';
    };
  };
  authorities: {
    address: 'string';
    scopes: [];
    items: 'string';
  };
  compression: {
    eligible: true;
    compressed: true;
    data_hash: 'string';
    creator_hash: 'string';
    asset_hash: 'string';
    tree: 'string';
    seq: 0;
    leaf_id: 0;
  };
  grouping: {
    group_key: 'string';
    group_value: 'string';
  };
  royalty: {
    royalty_model: 'string';
    target: 'string';
    percent: 0;
    basis_points: 0;
    primary_sale_happened: true;
    locked: true;
  };
  creators: {
    address: 'string';
    share: 0;
    verified: true;
  };
  ownership: {
    frozen: true;
    delegated: true;
    delegate: 'string';
    ownership_model: 'string';
    owner: 'string';
    supply: 'string';
    mutable: true;
  };
}

export { TransactionLogWebhook, AssetType };
