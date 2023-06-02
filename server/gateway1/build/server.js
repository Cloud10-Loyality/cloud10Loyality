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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const integration_created_listener_1 = require("./events/listener/integration-created-listener");
const _2 = __importDefault(require("."));
const mongoose_1 = __importDefault(require("mongoose"));
const nats_client_1 = require("./nats-client");
const DB = (_a = process.env.MONGO_URI) === null || _a === void 0 ? void 0 : _a.replace("<PASSWORD>", process.env.MONGO_PASS);
nats_client_1.natsClient
    .connect("cloud10LMS", _1.CLIENT_ID, "http://nats-srv:4222")
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    // Listen for close events
    nats_client_1.natsClient.client.on("close", () => {
        console.log("NATS connection closed!");
        process.exit();
    });
    // Graceful shutdown
    process.on("SIGINT", () => nats_client_1.natsClient.client.close());
    process.on("SIGTERM", () => nats_client_1.natsClient.client.close());
    console.log("[Gateway Service Nats]: Connected to NATS!");
    new integration_created_listener_1.IntegrationCreatedListener(nats_client_1.natsClient.client).listen();
    try {
        const connection = yield mongoose_1.default.connect(DB);
        console.log(`[Gateway1-Service DB]: Database successfully running ons ${connection.connection.host}`);
        _2.default.listen(_1.PORT, () => {
            console.log(`⚡️[Gateway1-Service server]: Server is running at https://localhost:${_1.PORT}`);
        });
    }
    catch (err) {
        console.log(`Error: ${err}`);
    }
}))
    .catch((err) => console.log(`${err}: Error connecting to NATS`));
