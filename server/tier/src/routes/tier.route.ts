import { Router } from "express";
import { createTier } from "../controllers/tier.controllors";

const router = Router();

router.route("/").post(createTier as any);

export default router;
