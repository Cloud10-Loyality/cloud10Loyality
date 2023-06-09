import { CLIENT_ID, PORT } from ".";

import { IntegrationUpdatedListener } from "./events/listener/integration-updated-listener";
import { ReservationCreatedListener } from "./events/listener/reservation-created-listener";
import app from ".";
import { env } from "./env";
import mongoose from "mongoose";
import { natsClient } from "./nats-client";

const DB = env.MONGO_URI.replace("<PASSWORD>", env.MONGO_PASS);

natsClient
  .connect(env.NATS_CLUSTER_ID, CLIENT_ID, env.NATS_URL)
  .then(async () => {
    // Listen for close events
    natsClient.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    // Graceful shutdown
    process.on("SIGINT", () => natsClient.client.close());
    process.on("SIGTERM", () => natsClient.client.close());

    console.log("[Integration Service Nats]: Connected to NATS!");

    new ReservationCreatedListener(natsClient.client).listen();
    new IntegrationUpdatedListener(natsClient.client).listen();

    try {
      mongoose.connect(DB!).then((connection) => {
        console.log(
          `[Integration-Service DB]: Database successfully running ons ${connection.connection.host}`
        );
        app.listen(PORT, () => {
          console.log(
            `⚡️[Integration-Service server]: Server is running at https://localhost:${PORT}`
          );
        });
      });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  })
  .catch((err) => console.log(`${err}: Error connecting to NATS`));
