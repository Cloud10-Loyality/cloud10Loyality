import { CLIENT_ID, PORT } from ".";

import app from ".";
import mongoose from "mongoose";
import { natsClient } from "./nats-client";
import { ReservationCreatedListener } from "./events/listener/reservation-created-listener";
import { env } from "./env";

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

    try {
      const connection = await mongoose.connect(DB!);
      console.log(
        `[Integration-Service DB]: Database successfully running ons ${connection.connection.host}`
      );
      app.listen(PORT, () => {
        console.log(
          `⚡️[Integration-Service server]: Server is running at https://localhost:${PORT}`
        );
      });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  })
  .catch((err) => console.log(`${err}: Error connecting to NATS`));
