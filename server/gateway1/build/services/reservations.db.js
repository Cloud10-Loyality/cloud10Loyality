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
exports.reservationService = void 0;
const reservation_model_1 = __importDefault(require("../models/reservation.model"));
class ReservationService {
    constructor() {
        this.model = reservation_model_1.default;
    }
    getAllReservations(queryObj, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, fields, sort, populate } = options !== null && options !== void 0 ? options : {};
            let queryStr;
            const excludedFields = ["populate", "sort", "limit", "fields"];
            queryStr = excludedFields.forEach((el) => delete queryObj[el]);
            let query = this.model.find((_a = queryStr) !== null && _a !== void 0 ? _a : queryObj);
            if (sort) {
                const sortBy = sort.split(",").join(" ");
                query = query.sort(sortBy);
            }
            if (limit)
                query = query.limit(limit);
            if (fields)
                query = query.select(fields);
            // if (populate) query = query.populate(populate);
            const reservations = yield query.sort(sort);
            return reservations;
        });
    }
    getReservationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const reservation = yield this.model.findById(id);
            return reservation;
        });
    }
    createReservation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReservation = yield this.model.create(data);
            return newReservation;
        });
    }
    updateReservation(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedReservation = yield this.model.findByIdAndUpdate(id, data);
            return updatedReservation;
        });
    }
    deleteReservation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedReservation = yield this.model.findByIdAndDelete(id);
            return deletedReservation;
        });
    }
}
exports.reservationService = new ReservationService();
