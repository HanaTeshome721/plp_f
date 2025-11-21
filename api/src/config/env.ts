import { config } from "dotenv";

config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URI: process.env.MONGO_URI ?? "mongodb://localhost:27017/plp_platform",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? "change-me-access",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? "change-me-refresh",
  CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:3000",
};
