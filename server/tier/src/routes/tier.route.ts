import {
  createTier,
  deleteTier,
  getAllTiersByManagerId,
  getTiers,
  updateTier,
} from "../controllers/tier.controllors";

import { Router } from "express";

const router = Router();

router
  .route("/")
  .get(getTiers as any)
  .post(createTier as any);

router
  .route("/:managerId")
  .get(getAllTiersByManagerId as any)
  .patch(updateTier as any)
  .delete(deleteTier as any);

export default router;
