import {
  createIntegration,
  deleteIntegration,
  getIntegration,
  getIntegrations,
  updateIntegration,
} from "../controllers/integration.controller";

import { Router } from "express";

const router = Router();

router.route("/").get(getIntegrations).post(createIntegration);
router
  .route("/:id")
  .get(getIntegration)
  .patch(updateIntegration)
  .delete(deleteIntegration);

export default router;
