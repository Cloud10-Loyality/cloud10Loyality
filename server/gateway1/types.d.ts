import { Types } from "mongoose";
import { Request as BaseRequest } from "express-serve-static-core";

export interface Reservations {
  hotel_name: string;
  hotel_id: string;
  city: string;
  state: string;
  pin: string;
  check_in: Date;
  check_out: Date;
  payment_method: PaymentMethodType;
  amount: number;
  payment_card: PaymentCard;
  user: User;
}

export interface Integration {
  _id: ObjectId;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  phone: number;
  loyality_tier: LoyalityTierType;
  location: Location;
  language: string;
  country_ISO: string;
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
