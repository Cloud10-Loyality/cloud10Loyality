import { Router } from "express";
import { getUsers } from "../controllers/user.controller";

const router = Router();

router.route("/").get(getUsers as any);

export default router;
