import Admin from "../models/admin.model";
import { AdminType } from "../../types";

class AdminService {
  private model = Admin;

  async signup(data: AdminType): Promise<AdminType> {
    const newAdmin = await this.model.create(data);
    return newAdmin;
  }

  async getAdminByUsername(username: string): Promise<AdminType[]> {
    const admin = await this.model.find().byUsername(username);
    return admin;
  }
}

export const adminService = new AdminService();
