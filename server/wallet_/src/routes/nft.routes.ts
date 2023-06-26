import { Router } from "express";
import {
  burnByPolicyId,
  burnNFTtoken,
  getNfts,
  mintNFTtoken,
  mintTokenMetadata,
} from "../controllers/nft.controller";

const router = Router();

router.route("/mint/").post(mintNFTtoken).get(getNfts);
router.route("/burn").post(burnNFTtoken);
router.route("/burn/:policyId").delete(burnByPolicyId);
router.route("/mintnftmetadata").post(mintTokenMetadata);

export default router;
