"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.natsClient = void 0;
const node_nats_streaming_1 = __importDefault(require("node-nats-streaming"));
const appError_1 = require("@cloud10lms/shared/build/utils/appError");
class NatsClient {
    get client() {
        if (!this._client)
            throw new appError_1.AppError("Can't access NATS client before connecting", 400);
        return this._client;
    }
    connect(clusterId, clientId, url) {
        this._client = node_nats_streaming_1.default.connect(clusterId, clientId, { url });
        this._client.on("close", () => {
            console.log("NATS connection closed!");
            process.exit();
        });
        process.on("SIGINT", () => this.client.close());
        process.on("SIGTERM", () => this.client.close());
        return new Promise((resolve, reject) => {
            this.client.on("connect", () => {
                resolve();
            });
            this.client.on("error", (err) => {
                reject(err);
            });
        });
    }
}
exports.natsClient = new NatsClient();
