import {
  burnByPolicyId,
  burnNFTtoken,
  burnTokenMetadata,
  deleteAssets,
  deleteMintMetaData,
  getAssetDetails,
  getNfts,
  getPoints,
  getPolicyId,
  mintNFTtoken,
  mintTokenMetadata,
} from "../controllers/nft.controller";

import { Router } from "express";

const router = Router();

router.route("/mint/").post(mintNFTtoken).get(getNfts);
router.route("/burn").post(burnNFTtoken);
router.route("/burn/:policyId").delete(burnByPolicyId);
router
  .route("/mintnftmetadata")
  .post(mintTokenMetadata)
  .get(getAssetDetails)
  .delete(deleteAssets);
router
  .route("/mintnftmetadata/:id")
  .get(getPolicyId)
  .delete(deleteMintMetaData);
router.route("/burnnftmetadata").post(burnTokenMetadata);
router.route("/points").get(getPoints);
export default router;
