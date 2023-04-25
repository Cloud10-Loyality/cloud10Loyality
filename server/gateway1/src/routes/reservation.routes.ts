import {
  createReservation,
  getReservations,
} from "../controllers/reservation.controller";

import { Router } from "express";

const router = Router();

router.route("/").get(getReservations).post(createReservation);

export default router;
