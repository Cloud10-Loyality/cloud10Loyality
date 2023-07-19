import {
  deleteAllTiers,
  deleteMyTiers,
  deleteTiers,
  getMe,
  getTiers,
} from "../controllers/tiers.controller";

import { Router } from "express";
import { protect } from "@c10lms/common";
import { protectRoute } from "../middleware/auth.handler";

const router = Router();

router
  .route("/")
  .get(getTiers as any)
  .delete(deleteAllTiers as any);

router
  .route("/me")
  .get(protect as any, protectRoute as any, getMe as any)
  .delete(protect as any, protectRoute as any, deleteMyTiers as any);
router.route("/:id").delete(deleteTiers as any);

export default router;
