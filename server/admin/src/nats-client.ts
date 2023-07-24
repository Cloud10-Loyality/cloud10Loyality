import nats, { Stan } from "node-nats-streaming";

import { AppError } from "@c10lms/common/build/utils/appError";

class NatsClient {
  private _client?: Stan;

  get client(): Stan {
    if (!this._client)
      throw new AppError("Can't access NATS client before connecting", 400);

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    this._client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    process.on("SIGINT", () => this.client.close());
    process.on("SIGTERM", () => this.client.close());

    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", () => {
        resolve();
      });

      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsClient = new NatsClient();
