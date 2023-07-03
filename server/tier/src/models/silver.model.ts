import { Schema, model } from "mongoose";

import { TierType } from "../../types";

const sliveTierSchema = new Schema<TierType>({
  name: {
    type: String,
    auto: false,
    default: "Silver",
  },
  points: {
    type: Number,
    default: 5,
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Manager",
    required: [true, "Manager is required"],
  },
  rewards: [
    {
      type: String,
      default: ["Free Room Upgrade", "Late Check-Out"],
    },
  ],
});

const SilverTier = model<TierType>("SilverTier", sliveTierSchema);

export default SilverTier;
