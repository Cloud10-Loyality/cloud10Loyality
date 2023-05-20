import {
  createReservation,
  getReservations,
  updateReservation,
} from "../controllers/reservation.controller";

import { Router } from "express";

const router = Router();

router
  .route("/")
  .get(getReservations as any)
  .post(createReservation as any);
router.route("/:id").patch(updateReservation as any);

export default router;
