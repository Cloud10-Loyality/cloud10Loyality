import { Schema, model } from "mongoose";

import { TierType } from "../../types";

const goldTierSchema = new Schema<TierType>({
  name: {
    type: String,
    auto: false,
    default: "Gold",
  },
  points: {
    type: Number,
    default: 20,
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
        "Personalized Butler Service",
        "Exclusive Access to Club Lounge",
      ],
    },
  ],
});

const GoldTier = model<TierType>("GoldTier", goldTierSchema);

export default GoldTier;
