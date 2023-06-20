import { Router } from "express";
import { getReservations } from "../controllers/reservation.controller";

const router = Router();

router.route("/").get(getReservations as any);

export default router;
