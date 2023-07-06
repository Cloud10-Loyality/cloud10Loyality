import {
  deleteReservation,
  getReservations,
  getReservationsByManager,
} from "../controllers/reservation.controller";

import { Router } from "express";
import { protect } from "@c10lms/common";
import { protectRoute } from "../middlewares/auth.handler";

const router = Router();

router
  .route("/")
  .get(protect as any, protectRoute as any, getReservationsByManager as any);

router
  .route("/:id")
  .delete(protect as any, protectRoute as any, deleteReservation as any);

export default router;
