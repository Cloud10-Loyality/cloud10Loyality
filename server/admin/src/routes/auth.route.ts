import { login, signup } from "../controllers/auth.controller";

import { Router } from "express";

const router = Router();

router.route("/signup").post(signup as any);
router.route("/login").post(login as any);

export default router;
