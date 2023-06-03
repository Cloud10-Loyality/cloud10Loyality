"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reservation_controller_1 = require("../controllers/reservation.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router
    .route("/")
    .get(reservation_controller_1.getReservations)
    .post(reservation_controller_1.createReservation);
router.route("/:id").patch(reservation_controller_1.updateReservation);
exports.default = router;
