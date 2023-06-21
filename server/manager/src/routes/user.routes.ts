import { deleteUser, getUsers } from "../controllers/user.controller";

import { Router } from "express";

const router = Router();

router.route("/").get(getUsers as any);

router.route("/:id").delete(deleteUser as any);

export default router;
