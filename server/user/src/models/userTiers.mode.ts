import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  Types,
  model,
} from "mongoose";
import { TierEnum, UserTierType } from "../../types";

interface UserTiersQueryHelpers {
  byUserEmailAndManagerId(
    email: string,
    managerId: Types.ObjectId
  ): QueryWithHelpers<
    HydratedDocument<UserTierType>[],
    HydratedDocument<UserTierType>,
    UserTiersQueryHelpers
  >;
  byUserEmail(
    email: string
  ): QueryWithHelpers<
    HydratedDocument<UserTierType>[],
    HydratedDocument<UserTierType>,
    UserTiersQueryHelpers
  >;
}

type UserTiersModelType = Model<UserTierType, UserTiersQueryHelpers>;

const userTiersSchema = new Schema<UserTierType, {}, {}, UserTiersQueryHelpers>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    tier: {
      type: String,
      enum: ["Silver", "Gold", "Platinum"],
    },
    points: {
      type: Number,
    },
    manager: {
      type: Schema.Types.ObjectId,
      required: [true, "Manager is required"],
    },
  }
);

userTiersSchema.query.byUserEmail = function byUserEmail(
  this: QueryWithHelpers<
    any,
    HydratedDocument<UserTierType>,
    UserTiersQueryHelpers
  >,
  email: string
) {
  return this.where({ email });
};

userTiersSchema.query.byUserEmailAndManagerId =
  function byUserEmailAndManagerId(
    this: QueryWithHelpers<
      any,
      HydratedDocument<UserTierType>,
      UserTiersQueryHelpers
    >,
    email: string,
    managerId: Types.ObjectId
  ) {
    return this.where({ email, manager: managerId });
  };

export const UserTiers = model<UserTierType, UserTiersModelType>(
  "UserTiers",
  userTiersSchema
);
