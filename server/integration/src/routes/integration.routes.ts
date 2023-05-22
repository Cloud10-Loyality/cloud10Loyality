import { protect } from "@cloud10lms/shared";
import { Router } from "express";

import { login, logout, refresh, signup } from "../controllers/auth.controller";
import {
  deleteIntegration,
  getIntegration,
  getIntegrations,
  updateIntegration,
} from "../controllers/integration.controller";
import { protectRoute } from "../middleware/auth.handler";

const router = Router();

// Integration routes
router
  .route("/")
  .get(protect as any, protectRoute as any, getIntegrations as any);

router
  .route("/:id")
  .get(protect as any, protectRoute as any, getIntegration as any)
  .patch(protect as any, protectRoute as any, updateIntegration as any)
  .delete(protect as any, protectRoute as any, deleteIntegration as any);

// Authentication routes
router.route("/register").post(signup as any);
router.route("/login").post(login as any);
router.route("/refresh").post(refresh as any);
router
  .route("/logout")
  .post(protect as any, protectRoute as any, logout as any);

export default router;
