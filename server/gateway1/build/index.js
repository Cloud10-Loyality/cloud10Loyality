"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_ID = exports.PORT = void 0;
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const shared_1 = require("@cloud10lms/shared");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const reservation_routes_1 = __importDefault(require("./routes/reservation.routes"));
exports.PORT = process.env.GATEWAY_1_PORT || 5000;
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/reservation", reservation_routes_1.default);
app.all("*", (req, _res, next) => {
    next(new shared_1.AppError(`Can't find ${req.originalUrl} path on the server`, 404));
});
app.use(shared_1.errorHandler);
exports.CLIENT_ID = (0, shared_1.generateRandomString)(10);
exports.default = app;
