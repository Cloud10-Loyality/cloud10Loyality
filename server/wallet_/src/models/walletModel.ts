import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  model,
} from "mongoose";

import { WalletType } from "../../types";

interface WalletQueryHelpers {
  byEmailorPhone(
    email?: string,
    phone?: number
  ): QueryWithHelpers<
    HydratedDocument<WalletType>[],
    HydratedDocument<WalletType>,
    WalletQueryHelpers
  >;
}

type WalletModelType = Model<WalletType, WalletQueryHelpers>;

const walletSchema = new Schema<WalletType, {}, {}, WalletQueryHelpers>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    privateKey: { type: String },
    address: { type: String },
    txHash: { type: String },
    points: { type: Array, default: [] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

walletSchema.query.byEmailorPhone = function byEmailOrPhone(
  this: QueryWithHelpers<any, HydratedDocument<WalletType>, WalletQueryHelpers>,
  email: string,
  phone?: number
) {
  return this.find({ $or: [{ email }, { phone }] });
};

const Wallet = model<WalletType, WalletModelType>("Wallet", walletSchema);

export default Wallet;
