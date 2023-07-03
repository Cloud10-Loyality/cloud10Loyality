import { deleteUser, getAllUsers } from "../controllers/user.controller";

import { Router } from "express";

const router = Router();

router.route("/").get(getAllUsers).delete(deleteUser);

export default router;
