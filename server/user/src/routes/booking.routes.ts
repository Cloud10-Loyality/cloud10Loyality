import {
  deleteAllBookings,
  deleteBooking,
  getBookings,
  getMe,
} from "../controllers/booking.controller";

import { Router } from "express";
import { protect } from "@c10lms/common";
import { protectRoute } from "../middleware/auth.handler";

const router = Router();

router.use(protect as any);
router.use(protectRoute as any);

router.route("/me").get(getMe as any);

router
  .route("/")
  .get(getBookings as any)
  .delete(deleteAllBookings as any);
router.route("/:id").delete(deleteBooking as any);

export default router;
