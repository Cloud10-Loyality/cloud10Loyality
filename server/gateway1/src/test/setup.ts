import { MongoMemoryServer } from "mongodb-memory-server";
import app from "..";
import mongoose from "mongoose";

let mongo: any;

jest.mock("../nats-client");

beforeAll(async () => {
  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});
