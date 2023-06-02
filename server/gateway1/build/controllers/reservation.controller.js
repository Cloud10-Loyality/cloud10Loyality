"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReservation = exports.updateReservation = exports.getReservations = void 0;
const shared_1 = require("@cloud10lms/shared");
const reservation_model_1 = __importDefault(require("../models/reservation.model"));
const reservations_db_1 = require("../services/reservations.db");
const reservation_created_publisher_1 = require("../events/publisher/reservation-created-publisher");
const nats_client_1 = require("../nats-client");
exports.getReservations = (0, shared_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { populate, fields, limit, sort } = req.query;
    const queryObj = Object.assign({}, req.query);
    const options = {
        populate,
        fields,
        limit,
        sort,
    };
    const reservations = yield reservations_db_1.reservationService.getAllReservations(queryObj, options);
    res.status(200).json({
        message: "success",
        error: false,
        totalRecords: reservations.length,
        data: reservations,
    });
}));
exports.updateReservation = (0, shared_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const reservation = reservations_db_1.reservationService.getReservationById(id);
    if (!reservation) {
        return next(new shared_1.AppError("Reservation not found", 404));
    }
    yield reservation_model_1.default.findByIdAndUpdate(id, Object.assign({}, req.body));
    res.status(200).json({
        status: "success",
        error: false,
        data: null,
    });
}));
exports.createReservation = (0, shared_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (!body) {
        return next(new shared_1.AppError("Please provide all the required reservation details", 400));
    }
    const reservation = yield reservations_db_1.reservationService.createReservation(Object.assign({}, body));
    yield new reservation_created_publisher_1.ReservationCreatedPublisher(nats_client_1.natsClient.client).publish({
        _id: reservation._id,
        user: reservation._id,
        amount: reservation.amount,
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
        city: reservation.city,
        hotelName: reservation.hotelName,
        paymentMethod: "Testing",
        pin: reservation.pin,
        state: reservation.state,
    });
    res.status(201).json({
        message: "success",
        error: false,
        data: null,
    });
}));
