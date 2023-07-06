import mongoose, {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  Types,
} from "mongoose";
import { MintMetadataType } from "../../types";

interface MintNFTMetadataQueryHelpers {
  byEmailAndManagerId(
    email: string,
    managerId: Types.ObjectId
  ): QueryWithHelpers<
    HydratedDocument<MintMetadataType>[],
    HydratedDocument<MintMetadataType>,
    MintNFTMetadataQueryHelpers
  >;
}

type MintMetadataModelType = Model<
  MintMetadataType,
  MintNFTMetadataQueryHelpers
>;

const mintMetadataSchema = new Schema<
  MintMetadataType,
  {},
  {},
  MintNFTMetadataQueryHelpers
>(
  {
    policyId: { type: String },
    metadata: {
      email: { type: String },
      description: { type: String },
      label: { type: String },
      policyId: { type: String },
      tokenName: { type: String },
      image: { type: String },
      unit: { type: Number },
      managerId: {
        type: Schema.Types.ObjectId,
        required: [true, "Manager Id required"],
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

mintMetadataSchema.query.byEmailAndManagerId = function (
  this: QueryWithHelpers<
    any,
    HydratedDocument<MintMetadataType>,
    MintNFTMetadataQueryHelpers
  >,
  email?: string,
  managerId?: Types.ObjectId
) {
  return this.where({
    "metadata.email": email,
    "metadata.managerId": managerId,
  });
};

const MintMetadata = mongoose.model<MintMetadataType, MintMetadataModelType>(
  "MintMetadata",
  mintMetadataSchema
);

export default MintMetadata;
