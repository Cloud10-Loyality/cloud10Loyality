import mongoose from "mongoose";

const tierNFTSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  minimumPoints: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  rewardPoints: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const TierNFT = mongoose.model("TierNFT", tierNFTSchema);

export default TierNFT;
