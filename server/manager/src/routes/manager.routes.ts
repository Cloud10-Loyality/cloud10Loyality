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

router.use(protect as any, protectRoute as any);

router.route("/me").get(getMe as any);

router
  .route("/")
  .get(getManagers as any)
  .post(createManager as any);

router.route("/:id").patch(updateManager as any);

export default router;
