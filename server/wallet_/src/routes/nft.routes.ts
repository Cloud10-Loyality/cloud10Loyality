import { Router } from "express";
import {
  burnByPolicyId,
  burnNFTtoken,
  getAssetDetails,
  getNfts,
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
export default router;
