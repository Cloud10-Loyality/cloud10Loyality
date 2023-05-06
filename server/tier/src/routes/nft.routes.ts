// import { mintNFT, burnNFT } from "../controllers/mint-burn-controller";
// import { Lucid } from "lucid-cardano";
import {Router} from 'express'
import { createNFT, useNFT } from '../controllers/mintNFT.controller';

const router = Router();

router.route("/mint").post(createNFT)
router.route("/burn").post(useNFT)

// Mint Nft
// app.post("/mint-nft", async (req, res) => {
//     const name = req.body.name;
//     const txHash = await mintNFT(name);
//     res.send({ txHash });
//   });
  
//   // Burn Nft
//   app.post("/burn-nft", async (req, res) => {
//     const name = req.body.name;
//     const txHash = await burnNFT(name);
//     res.send({ txHash });
//   });

export default router
