import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controller";

import { Router } from "express";

const router = Router();

router
  .route("/")
  .get(getAllUsers as any)
  .post(createUser as any);

router
  .route("/:id")
  .get(getUser as any)
  .patch(updateUser as any)
  .delete(deleteUser as any);

export default router;
