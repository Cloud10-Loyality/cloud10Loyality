import { Router } from "express";
import {
  createWallet,
  deleteUserData,
  getWallet,
  getWalletId,
  updateWallet,
} from "../controllers/wallet.controller";

const router = Router();

router.route("/").get(getWallet).post(createWallet);
router
  .route("/:id")
  .get(getWalletId)
  .patch(updateWallet)
  .delete(deleteUserData);

export default router;
