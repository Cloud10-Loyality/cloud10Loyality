// import { mintNFT, burnNFT } from "../controllers/mint-burn-controller";
// import { Lucid } from "lucid-cardano";
import { Router } from "express";
import {
  burnByPolicyId,
  burnNFTtoken,
  getNfts,
  mintNFTtoken,
} from "../controllers/nft.controller";

const router = Router();

router.route("/mint/:id").post(mintNFTtoken).get(getNfts);
router.route("/burn").post(burnNFTtoken);
router.route("/burn/:policyId").delete(burnByPolicyId);

export default router;
