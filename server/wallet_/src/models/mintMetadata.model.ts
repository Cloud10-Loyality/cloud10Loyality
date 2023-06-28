import mongoose, {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
} from "mongoose";
import { MintMetadataType } from "../../types";

interface MintNFTMetadataQueryHelpers {
  byEmail(
    email: string
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
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

mintMetadataSchema.query.byEmail = function (
  this: QueryWithHelpers<
    any,
    HydratedDocument<MintMetadataType>,
    MintNFTMetadataQueryHelpers
  >,
  email?: string
) {
  return this.where({ "metadata.email": email });
};

const MintMetadata = mongoose.model<MintMetadataType, MintMetadataModelType>(
  "MintMetadata",
  mintMetadataSchema
);

export default MintMetadata;
