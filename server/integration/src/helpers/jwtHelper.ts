import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { promisify } from "util";

export type Payload = {
  id?: Types.ObjectId;
  email?: string;
  role?: "USER" | "ADMIN" | "MANAGER";
};

export type TokenType = "ACCESS" | "REFRESH";

const expiresInSeconds = (days: number) => days * 24 * 60 * 60;

const assignToken = (payload: Payload, type: TokenType) => {
  return jwt.sign(payload, process.env[`${type}_TOKEN_SECRET`]!, {
    expiresIn: expiresInSeconds(
      parseInt(process.env[`JWT_${type}_EXPIRES_IN_DEV`]?.split("d")[0]!)
    ),
  });
};

const decodeToken = async (
  token: string,
  type: TokenType
): Promise<string | jwt.JwtPayload | any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env[`${type}_TOKEN_SECRET`]!, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};

export { assignToken, decodeToken };
