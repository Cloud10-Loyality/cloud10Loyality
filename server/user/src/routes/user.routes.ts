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

router.use(protect as any);
router.use(protectRoute as any);

router.route("/me").get(getMe as any);

router
  .route("/")
  .get(getAllUsers as any)
  .post(createUser as any);

router
  .route("/:id")
  .get(getUser as any)
  .patch(updateUser as any)
  .delete(deleteUser as any);

// router.route("/login").post(login as any);

export default router;
