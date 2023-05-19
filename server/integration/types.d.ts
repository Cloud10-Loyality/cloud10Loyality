// import { Request as BaseRequest } from "express";
import {
  Request as BaseRequest,
  Response,
  NextFunction,
} from "express-serve-static-core";

export interface Integration {
  username: string;
  password: string;
  email: string;
  id: ObjectID;
  name: string;
  description: string;
  city: string;
  state: string;
  pin: string;
}

type Role = "ADMIN" | "MANAGER" | "USER";

export type Request<Manager = unknown, Role = unknown> = BaseRequest & {
  jwt: string;
  manager: Manager;
  role: Role;
};
