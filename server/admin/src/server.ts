import { CLIENT_ID, PORT } from ".";

import app from ".";
import mongoose from "mongoose";
import { natsClient } from "./nats-client";

// import { IntegrationCreatedListener } from "./events/listener/integration-created-listener";
// import { UserCreatedListener } from "./events/listener/user-created-listener";
// import { UserDeletedListener } from "./events/listener/user-deleted-listener";

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

    console.log("[Admin-Service Nats]: Connected to NATS!");

    // await new IntegrationCreatedListener(natsClient.client).listen();
    // await new UserCreatedListener(natsClient.client).listen();
    // await new UserDeletedListener(natsClient.client).listen();

    try {
      const connection = await mongoose.connect(DB!);
      console.log(
        `[Admin-Service DB]: Database successfully running ons ${connection.connection.host}`
      );
      app.listen(PORT, () => {
        console.log(
          `⚡️[Admin-Service server]: Server is running at https://localhost:${PORT}`
        );
      });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  })
  .catch((err) => console.log(`${err}: Error connecting to NATS`));
