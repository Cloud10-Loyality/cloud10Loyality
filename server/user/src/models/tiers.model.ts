import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  Types,
  model,
} from "mongoose";

import { TierType } from "../../types";

interface TiersQueryHelpers {
  byManager(
    managerId: Types.ObjectId
  ): QueryWithHelpers<
    HydratedDocument<TierType>[],
    HydratedDocument<TierType>,
    TiersQueryHelpers
  >;
}

type TiersModelType = Model<TierType, TiersQueryHelpers>;

const tiersSchema = new Schema<TierType, {}, {}, TiersQueryHelpers>(
  {
    name: {
      type: String,
      required: [true, "Tier name is required"],
      enum: ["Silver", "Gold", "Platinum"],
    },
    points: {
      type: Number,
      required: [true, "Points are required"],
    },
    rewards: [
      {
        type: String,
        required: [true, "Rewards are required"],
      },
    ],
    manager: {
      type: Schema.Types.ObjectId,
      ref: "Manager",
      required: [true, "Manager is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

tiersSchema.query.byManager = function byManager(
  this: QueryWithHelpers<any, HydratedDocument<TierType>, TiersQueryHelpers>,
  managerId: Types.ObjectId
) {
  return this.where({ manager: managerId });
};

export const Tiers = model<TierType, TiersModelType>("Tiers", tiersSchema);
