import {
  deleteUser,
  getUser,
  getUserBookings,
  getUsers,
} from "../controllers/user.controller";

import { Router } from "express";

const router = Router();

router.route("/").get(getUsers as any);

router.route("/bookings").get(getUserBookings as any);

router
  .route("/:id")
  .get(getUser as any)
  .delete(deleteUser as any);

export default router;
