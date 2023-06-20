import { Types } from "mongoose";

export type ReservationType = {
  _id?: Types.ObjectId;
  hotelName?: string;
  managerId?: Types.ObjectId;
  city?: string;
  state?: string;
  pin?: string;
  checkIn?: Date;
  checkOut?: Date;
  paymentMethod?: string;
  amount?: number;
  paymentCard?: {
    cardHolderName?: string;
    cardNumber?: string;
  };
  user?: Partial<UserType>;
};

export type UserType = {
  _id?: Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  uid: string;
  dob: Date;
  age: number;
  gender: "male" | "female" | "other" | string;
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
  role: Role;
  city: string;
  state: string;
  pin: string;
  description: string;
};

type Role = "ADMIN" | "MANAGER" | "USER";
