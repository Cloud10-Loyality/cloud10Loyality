import { Router } from "express";
import {
  burnByPolicyId,
  burnNFTtoken,
  burnTokenMetadata,
  getAssetDetails,
  getNfts,
  getPoints,
  getPolicyId,
  mintNFTtoken,
  mintTokenMetadata,
} from "../controllers/nft.controller";

const router = Router();

router.route("/mint/").post(mintNFTtoken).get(getNfts);
router.route("/burn").post(burnNFTtoken);
router.route("/burn/:policyId").delete(burnByPolicyId);
router.route("/mintnftmetadata").post(mintTokenMetadata).get(getAssetDetails);
router.route("/mintnftmetadata/:id").get(getPolicyId);
router.route("/burnnftmetadata").post(burnTokenMetadata);
router.route("/points").get(getPoints);
export default router;
