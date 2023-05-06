import { PORT } from ".";
import app from ".";
import mongoose from "mongoose";

// import { natsClient } from "./nats-client";

const DB = process.env.MONGO_URI?.replace(
  "<PASSWORD>",
  process.env.MONGO_PASS!
);

// natsClient
//   .connect("cloud10LMS", "1234", "nats-srv://nats-srv:4222")
//   .then(() =>
mongoose
  .connect(DB!)
  .then((conn) => {
    app.listen(PORT, () => {
      console.log(
        `[Integration-Service DB]: Database successfully running ons ${conn.connection.host}`
      );
      console.log(
        `⚡️[Integration-Service server]: Server is running at https://localhost:${PORT}`
      );
    });
  })
  .catch((err) => console.log(`${err}`));
// )
// .catch((err) => console.log(`${err}: Error connecting to NATS`));
