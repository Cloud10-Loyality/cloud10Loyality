import {
  createReservation,
  getReservations,
  updateReservation,
} from "../controllers/reservation.controller";

import { Router } from "express";

const router = Router();

router.route("/").get(getReservations).post(createReservation);
router.route("/:id").patch(updateReservation);

export default router;
