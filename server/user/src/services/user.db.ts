import { Types } from "mongoose";
import User from "../models/user.model";
import { UserType } from "../../types";

class UserService {
  private model = User;

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

  public async getUserId(id: Types.ObjectId): Promise<UserType | null> {
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

  public async updateUserById(
    editBy: "Name" | "Email" | "Id",
    body: Partial<UserType>
  ): Promise<UserType | null> {
    const user = await this.model.findByIdAndUpdate(editBy, { ...body });
    return user;
  }

  public async deleteUser(id: Types.ObjectId): Promise<UserType | null> {
    const user = await this.model.findByIdAndDelete(id);

    return user;
  }
}

export const userService = new UserService();
