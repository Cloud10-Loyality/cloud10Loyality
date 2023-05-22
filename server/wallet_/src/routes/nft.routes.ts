// import { mintNFT, burnNFT } from "../controllers/mint-burn-controller";
// import { Lucid } from "lucid-cardano";
import { Router } from "express";
import { createNFT, useNFT } from "../controllers/nft.controller";

const router = Router();

router.route("/mint").post(createNFT);
router.route("/burn").post(useNFT);

export default router;
