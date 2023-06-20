import { Types } from "mongoose";
import User from "../models/user.model";
import { UserType } from "../../types";

class UserService {
  private model = User;

  public async getAllUsers(): Promise<UserType[] | null> {
    const users = await this.model.find();

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

  public async deleteUser(email?: string): Promise<UserType | null> {
    const user = await this.model.findOneAndDelete({ email });

    return user;
  }
}

export const userService = new UserService();
