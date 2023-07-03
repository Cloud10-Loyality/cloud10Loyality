import {
  deleteReservation,
  getReservations,
} from "../controllers/reservation.controller";

import { Router } from "express";

const router = Router();

router.route("/").get(getReservations as any);
router.route("/:id").delete(deleteReservation as any);

export default router;
