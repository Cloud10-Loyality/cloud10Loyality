import mongoose from "mongoose";
import { config } from "dotenv";
import app from ".";
config();

const DB = process.env.MONGO_URI;

mongoose
  .connect(DB!)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Error connecting to database", error));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  const walletDb = db.useDb("Wallet-Database");
  const walletCollection = walletDb.collection("wallets");
  console.log("Database and collection created successfully");
});

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(`Error starting server: ${error}`);
  }
};

startServer();
