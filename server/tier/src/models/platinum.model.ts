import { Schema, model } from "mongoose";

import { TierType } from "../../types";

const platinumTierSchema = new Schema<TierType>({
  name: {
    type: String,
    auto: false,
    default: "Platinum",
  },
  points: {
    type: Number,
    default: 25,
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Manager",
  },
  rewards: [
    {
      type: String,
      default: [
        "Free Room Upgrade",
        "Late Check-Out",
        "Complimentary Breakfast",
        "Spa Credits",
      ],
    },
  ],
});

const PlatinumTier = model<TierType>("PlatinumTier", platinumTierSchema);

export default PlatinumTier;
