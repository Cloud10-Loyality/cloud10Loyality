"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationCreatedPublisher = void 0;
const shared_1 = require("@cloud10lms/shared");
class ReservationCreatedPublisher extends shared_1.Publisher {
    constructor() {
        super(...arguments);
        this.subject = shared_1.Subjects.ReservationCreated;
    }
}
exports.ReservationCreatedPublisher = ReservationCreatedPublisher;
