import { PORT } from ".";
import app from ".";
import mongoose from "mongoose";

const DB = process.env.MONGO_URI?.replace(
  "<PASSWORD>",
  process.env.MONGO_PASS!
);

mongoose
  .connect(DB!)
  .then((conn) => {
    app.listen(PORT, () => {
      console.log(
        ` ▤ [Integration-Service DB]: Database successfully running on ${conn.connection.host}`
      );
      console.log(
        `⚡️[Integration-Service server]: Server is running at https://localhost:${PORT}`
      );
    });
  })
  .catch((err) => console.log(`${err}`));
