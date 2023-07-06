import { Types } from "mongoose";

export type UserType = {
  _id?: Types.ObjectId;
  firstname?: string;
  lastname?: string;
  email?: string;
  uid?: string;
  dob?: Date;
  age?: number;
  points?: number;
  tier?: "SILVER" | "GOLD" | "PLATINUM";
  gender?: "male" | "female" | "other";
  phone?: number;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: number;
};

export type BookingType = {
  _id?: Types.ObjectId;
  hotelName?: string;
  checkIn?: Date;
  checkOut?: Date;
  amount?: number;
  numberOfGuests?: number;
  paymentMethod?: string;
  userEmail?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: number;
};

export type TierType = {
  name?: TierEnum;
  points?: number;
  rewards?: string[];
  manager?: Types.ObjectId;
};

export enum TierEnum {
  GOLD = "Gold",
  SILVER = "Silver",
  PLATINUM = "Platinum",
}

export type UserTierType = {
  _id?: Types.ObjectId;
  email?: string;
  points?: number;
  tier?: "Silver" | "Gold" | "Platinum";
  manager?: Types.ObjectId;
};

export type TierName = "GOLD" | "SILVER" | "PLATINUM";
