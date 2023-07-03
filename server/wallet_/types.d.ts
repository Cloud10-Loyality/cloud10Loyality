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
  metadata?: any;
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
    unit: Number;
  };
};

export type UserType = {
  _id?: Types.ObjectId;
  firstname?: string;
  lastname?: string;
  email?: string;
  uid?: string;
  dob?: Date;
  age?: number;
  points?: number;
  tier?: "SILVER" | "GOLD" | "PLATINUM";
  gender?: "male" | "female" | "other";
  phone?: number;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: number;
};
