import { NullExpression, Types } from "mongoose";
import { ReservationType, UserType } from "../../types";

import Reservation from "../models/reservation.model";
import User from "../models/user.model";

class UserService {
  private model = User;
  private reservationModel = Reservation;

  public async getAllUsers(
    queryObj?: Record<string, any>,
    options?: {
      limit?: string;
      sort?: string;
      fields?: string;
    }
  ): Promise<UserType[]> {
    const { limit, fields, sort } = options ?? {};

    let queryStr;

    const excludedFields = ["sort", "limit", "fields"];

    queryStr = excludedFields.forEach((el) => delete queryObj![el]);

    let query = this.model.find((queryStr as any) ?? queryObj);

    if (sort) {
      const sortBy = sort.split(",").join(" ");
      query = query.sort(sortBy);
    }
    if (limit) query = query.limit(parseInt(limit));
    if (fields) query = query.select(fields);

    const users = await query;

    return users;
  }

  public async getUserBookings(
    userEmail: string,
    queryObj?: Record<string, any>,
    options?: {
      limit?: string;
      sort?: string;
      fields?: string;
    }
  ): Promise<ReservationType[]> {
    const { limit, fields, sort } = options ?? {};

    let queryStr;

    // console.log("hello");

    const excludedFields = ["sort", "limit", "fields"];

    // console.log("byy");

    // queryStr = excludedFields.forEach((el) => delete queryObj![el]);

    // console.log("hii-------");
    let query = this.reservationModel
      .find((queryStr as any) ?? queryObj)
      .byUser(userEmail);

    if (sort) {
      const sortBy = sort.split(",").join(" ");
      query = query.sort(sortBy);
    }
    if (limit) query = query.limit(parseInt(limit));
    if (fields) query = query.select(fields);

    const bookings = await query;

    return bookings;
  }

  public async getUserById(id: Types.ObjectId): Promise<UserType | null> {
    const user = await this.model.findById(id);

    return user;
  }

  public async getUserByEmail(email: string): Promise<UserType[] | null> {
    const user = this.model.find().byEmail(email);

    return user;
  }

  public async createUser(body: UserType): Promise<UserType> {
    const user = await this.model.create({ ...body });

    return user;
  }

  public async getUserByPhone(phone: number): Promise<UserType[] | null> {
    const user = await this.model.find().byPhone(phone);

    return user;
  }

  public async updateUserById(
    editBy: "Name" | "Email" | "Id",
    body: Partial<UserType>
  ): Promise<UserType | null> {
    const user = await this.model.findByIdAndUpdate(editBy, { ...body });
    return user;
  }

  public async deleteUser(email: string): Promise<UserType | null> {
    const user = await this.model.findOneAndDelete({ email });

    return user;
  }
}

export const userService = new UserService();
