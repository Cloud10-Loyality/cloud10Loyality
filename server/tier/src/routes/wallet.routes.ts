import { Router } from "express";
import {
  createWallet,
  deleteUser,
  getWallets,
  getWalletById,
  updateWallet,
} from "../controllers/wallet.controller";

const router = Router();

router.route("/").get(getWallets).post(createWallet);
router.route("/:id").get(getWalletById).patch(updateWallet).delete(deleteUser);

export default router;
