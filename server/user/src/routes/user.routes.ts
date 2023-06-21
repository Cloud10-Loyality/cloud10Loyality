import {
  createUser,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  login,
  updateUser,
} from "../controllers/user.controller";

import { Router } from "express";
import { protect } from "@cloud10lms/shared";
import { protectRoute } from "../middleware/auth.handler";

const router = Router();

router.route("/me").get(protect as any, protectRoute as any, getMe as any);

router
  .route("/")
  .get(getAllUsers as any)
  .post(createUser as any);

router
  .route("/:id")
  .get(getUser as any)
  .patch(updateUser as any)
  .delete(deleteUser as any);

router.route("/login").post(login as any);

export default router;
