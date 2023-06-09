import { Types } from "mongoose";

export type UserType = {
  _id?: Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  uid: string;
  dob: Date;
  age: number;
  gender: "male" | "female" | "other";
  phone: number;
  country: string;
  state: string;
  city: string;
  zipCode: number;
};

export type ManagerType = {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER" | "MANAGER";
  city: string;
  state: string;
  pin: string;
  description: string;
};

type Role = "ADMIN" | "MANAGER" | "USER";
