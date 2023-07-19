import { Types } from "mongoose";
import { UserTierType } from "../../types";
import { UserTiers } from "../models/userTiers.model";

export class UserTiersService {
  private model = UserTiers;

  public async getUserTiers(email: string): Promise<UserTierType[] | null> {
    const res = await this.model.find().byUserEmail(email);
    return res;
  }

  public async getUserTiersByManagerIdAndUserEmail(
    managerId: Types.ObjectId,
    email: string
  ): Promise<UserTierType[]> {
    const res = await this.model
      .find()
      .byUserEmailAndManagerId(email, managerId);
    return res;
  }

  public async createUserTier(body: UserTierType): Promise<UserTierType> {
    const { email, manager, points, tier } = body;

    const res = await this.model.create({
      email,
      manager,
      points,
      tier,
    });

    return res;
  }

  public async deleteUserTiers(email: string): Promise<any> {
    const res = await this.model.deleteMany().byUserEmail(email);

    return res;
  }
}

export const userTiersService = new UserTiersService();
