import app, { CLIENT_ID } from ".";

import { UserCreatedListener } from "./events/listeners/user-created-listener";
import { config } from "dotenv";
import mongoose from "mongoose";
import { natsClient } from "./nats-client";

config();

const PORT = process.env.WALLET_PORT || 10000;
const DB = process.env.MONGO_URI;

natsClient
  .connect("cloud10LMS", CLIENT_ID, "http://nats-srv:4222")
  .then(async () => {
    natsClient.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsClient.client.close());
    process.on("SIGTERM", () => natsClient.client.close());

    console.log("[Wallet Service Nats]: Connected to NATS");

    await new UserCreatedListener(natsClient.client).listen();

    try {
      const connection = await mongoose.connect(DB!);

      console.log(
        `[Wallet-Service DB]: Database successfully running on ${connection.connection.host}`
      );
      app.listen(PORT, () =>
        console.log(`[Wallet-Service server]: Server running on port ${PORT}`)
      );
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  })
  .catch((err) => console.log(`${err}: Error connecting to NATS`));
