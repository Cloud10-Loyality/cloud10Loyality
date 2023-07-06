import { deleteTiers, getMe, getTiers } from "../controllers/tiers.controller";

import { Router } from "express";
import { protect } from "@c10lms/common";
import { protectRoute } from "../middleware/auth.handler";

const router = Router();

router.route("/").get(getTiers as any);

router.route("/me").get(protect as any, protectRoute as any, getMe as any);
// router.route("/:id").delete(deleteTiers as any);

export default router;
