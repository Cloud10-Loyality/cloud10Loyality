import {
  createWallet,
  deleteWallet,
  getWallet,
  getWallets,
  updateWallet,
} from "../controllers/wallet.controller";

import { Router } from "express";

const router = Router();

router.route("/").get(getWallets).post(createWallet);
router.route("/:id").get(getWallet).patch(updateWallet).delete(deleteWallet);

export default router;
