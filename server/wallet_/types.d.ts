export type WalletType = {
  _id?: string;
  name?: string;
  email?: string;
  phone?: number;
  privateKey?: string;
  address?: string;
  txHash?: string;
  points?: array;
};

export type MintType = {
  _id?: string;
  policyId?: string;
  tokenName?: string;
  address?: string;
  txHash?: string;
  unit?: number;
};

export type BurnType = {
  _id?: string;
  policyId?: string;
  tokenName?: string;
  address?: string;
  txHash?: string;
  unit?: number;
};

export type MintMetadataType = {
  _id?: string;
  policyId: String;
  metadata: {
    email: String;
    description: String;
    label: String;
    policyId: String;
    tokenName: String;
    image: String;
  };
};
