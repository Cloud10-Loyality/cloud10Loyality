import { Schema, model } from "mongoose";

import { TierType } from "../../types";

const goldTierSchema = new Schema<TierType>({
  name: {
    type: String,
    auto: false,
    default: "Gold",
  },
  minSpend: {
    type: Number,
    default: 30000,
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
