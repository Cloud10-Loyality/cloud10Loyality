import { UserTierType } from "../../types";
import { UserTiers } from "../models/userTiers.mode";

export class UserTiersService {
  private model = UserTiers;

  public async getUserTiers(email: string): Promise<UserTierType[] | null> {
    const res = await this.model.find().byUserEmail(email);
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
}

export const userTiersService = new UserTiersService();
