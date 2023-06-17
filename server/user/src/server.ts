import { CLIENT_ID, PORT } from ".";

import { IntegrationCreatedListener } from "./events/listeners/integration-created-listener";
import { ReservationCreatedListener } from "./events/listeners/reservation-created-listener";
import app from ".";
import mongoose from "mongoose";
import { natsClient } from "./nats-client";

const DB = process.env.MONGO_URI;

natsClient
  .connect("cloud10LMS", CLIENT_ID, "http://nats-srv:4222")
  .then(async () => {
    // Listen for close events
    natsClient.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });

    // Graceful shutdown
    process.on("SIGINT", () => natsClient.client.close());
    process.on("SIGTERM", () => natsClient.client.close());

    console.log("[User Service Nats]: Connected to NATS!");

    await new ReservationCreatedListener(natsClient.client).listen();
    await new IntegrationCreatedListener(natsClient.client).listen();

    mongoose
      .connect(DB!)
      .then((conn) => {
        console.log(
          `[User-Service DB]: Database successfully running ons ${conn.connection.host}`
        );
        app.listen(PORT, () => {
          console.log(
            `⚡️[User-Service server]: Server is running at https://localhost:${PORT}`
          );
        });
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  })
  .catch((err) => console.log(`${err}: Error connecting to NATS`));
