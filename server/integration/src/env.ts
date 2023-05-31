import { cleanEnv, str, num, port } from "envalid";

const env = cleanEnv(process.env, {
  INTEGRATION_PORT: num({ default: 6000 }),
  MONGO_URI: str({
    default:
      "mongodb+srv://cloud10loyality:<PASSWORD>@integration.qpskjne.mongodb.net/integrationsDB?retryWrites=true&w=majority",
  }),
  MONGO_PASS: str({ default: "45pCz21Zzeee0P1U" }),
  JWT_ACCESS_EXPIRES_IN_DEV: str({ default: "15d" }),
  //   JWT_ACCESS_EXPIRES_IN_PROD: str(),
  JWT_REFRESH_EXPIRES_IN_DEV: str({
    default: "30d",
  }),
  //   JWT_REFRESH_EXPIRES_IN_PROD: str(),
  ACCESS_TOKEN_SECRET: str({
    default:
      "e1564103561f8724c7c78ecdb69da92ceb59e1f3fa8d9771eb30010e741fbef2176abe8780c03b577030d22e21826a2d",
  }),
  REFRESH_TOKEN_SECRET: str({
    default:
      "865d5ecd83b4a070aba3e7c50d4779643fb8e43870368f655cef25666ee222751139867e26f6ec02c9f6b4b1c68aa692",
  }),
  NODE_ENV: str({ default: "development" }),
  NATS_URL: str({
    default: "http://nats-srv:4222",
  }),
  NATS_CLUSTER_ID: str({
    default: "cloud10LMS",
  }),
});

export { env };
