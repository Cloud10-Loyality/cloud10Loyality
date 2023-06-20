import { deleteUsers, getUsers } from "../controllers/user.controller";

import { Router } from "express";

const router = Router();

router
  .route("/")
  .get(getUsers as any)
  .delete(deleteUsers as any);

export default router;
