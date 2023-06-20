import { Types } from "mongoose";
import { Request as BaseRequest } from "express-serve-static-core";

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
  firstname?: string;
  lastname?: string;
  email?: string;
  gender?: "male" | "female" | "other" | string;
  age?: number;
  uid?: string;
  dob?: Date;
  phone?: number;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: number;
};

export interface Integration {
  _id: ObjectId;
  name: string;
}

export type PaymentMethodType = "card" | "cash";

export interface PaymentCard {
  card_holder_name: string;
  card_number: string;
}

type Role = "ADMIN" | "MANAGER" | "USER";

export type Request<Manager = unknown, Role = unknown> = BaseRequest & {
  jwt: string;
  manager: Manager;
  role: Role;
};
