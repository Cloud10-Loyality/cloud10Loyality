import { Schema, model } from "mongoose";

import { TierType } from "../../types";

const sliveTierSchema = new Schema<TierType>({
  name: {
    type: String,
    auto: false,
    default: "Silver",
  },
  minSpend: {
    type: Number,
    default: 10000,
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Manager",
  },
  users: [
    {
      email: {
        type: String,
      },
    },
  ],
  rewards: [
    {
      type: String,
      default: ["Free Room Upgrade", "Late Check-Out"],
    },
  ],
});

const SilverTier = model<TierType>("SilverTier", sliveTierSchema);

export default SilverTier;
