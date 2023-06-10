import { ManagerType, UserType } from "../../types";
import { NullExpression, Types } from "mongoose";

import Manager from "../models/manager.model";
import User from "../models/user.model";

class ManagerService {
  private model = Manager;

  public async getAllManagers(
    queryObj?: Record<string, any>,
    options?: {
      limit?: string;
      sort?: string;
      fields?: string;
    }
  ): Promise<ManagerType[]> {
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

    const managers = await query;

    return managers;
  }

  public async getManagerById(id: Types.ObjectId): Promise<ManagerType | null> {
    const manager = await this.model.findById(id);

    return manager;
  }

  //   public async getUserByEmail(email: string): Promise<UserType[] | null> {
  //     const user = this.model.find().byEmail(email);

  //     return user;
  //   }

  public async createManager(body: ManagerType): Promise<ManagerType> {
    console.log("Integration Body--", body);
    const manager = await this.model.create({ ...body });

    return manager;
  }

  //   public async getUserByPhone(phone: number): Promise<UserType[] | null> {
  //     const user = await this.model.find().byPhone(phone);

  //     return user;
  //   }

  public async updateManager(
    id: Types.ObjectId,
    data: Partial<ManagerType>
  ): Promise<ManagerType | null> {
    const manager = await this.model.findByIdAndUpdate(id, data);

    return manager;
  }

  public async deleteManager(id: Types.ObjectId): Promise<ManagerType | null> {
    const manager = await this.model.findByIdAndDelete(id);

    return manager;
  }
}

export const managerService = new ManagerService();
