import {
  createManager,
  getManagers,
  getMe,
  updateManager,
} from "../controllers/manager.controller";

import { Router } from "express";
import { protect } from "@cloud10lms/shared";
import { protectRoute } from "./../middlewares/auth.handler";

const router = Router();

router.route("/me").get(protect as any, protectRoute as any, getMe as any);

router
  .route("/")
  .get(protectRoute as any, getManagers as any)
  .post(protect as any, protectRoute as any, createManager as any);

router
  .route("/:id")
  .patch(protect as any, protectRoute as any, updateManager as any);

export default router;
