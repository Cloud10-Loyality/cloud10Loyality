import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true,unique: true },
    phone: { type: Number, required: true },
    privateKey: { type: String },
    address: { type: String },
    txHash:{ type: String},
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
