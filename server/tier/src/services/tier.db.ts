import { TierName, TierType } from "../../types";

import GoldTier from "./../models/gold.model";
import PlatinumTier from "../models/platinum.model";
import SilverTier from "../models/silver.model";
import { Types } from "mongoose";

export class TierService {
  private goldModel = GoldTier;
  private silverModel = SilverTier;
  private platinumModel = PlatinumTier;

  private getModel(
    type: TierName
  ):
    | typeof this.goldModel
    | typeof this.silverModel
    | typeof this.platinumModel
    | undefined {
    switch (type) {
      case "SILVER":
        return this.silverModel;
      case "GOLD":
        return this.goldModel;
      case "PLATINUM":
        return this.platinumModel;
    }
  }

  public async getTiers(type: TierName): Promise<TierType[] | null> {
    const model = this.getModel(type);
    const res = await model!.find();

    return res;
  }

  public async createTier(
    type: TierName,
    body: TierType
  ): Promise<TierType | null> {
    const model = await new Promise<
      | typeof this.goldModel
      | typeof this.silverModel
      | typeof this.platinumModel
      | undefined
    >((res, rej) => {
      res(this.getModel(type));
    });
    const { name, points, rewards, manager } = body;
    return await model!.create({
      name,
      points,
      rewards,
      manager,
    });
  }

  public async getAllTiersByManagerId(id: Types.ObjectId): Promise<TierType[]> {
    const res = await Promise.all([
      this.goldModel.find({ manager: id }),
      this.silverModel.find({ manager: id }),
      this.platinumModel.find({ manager: id }),
    ]);

    return res.flat();
  }

  public async updateTier(
    manager: Types.ObjectId,
    type: TierName,
    body: TierType
  ): Promise<TierType | null> {
    const model = await new Promise<
      | typeof this.goldModel
      | typeof this.silverModel
      | typeof this.platinumModel
      | undefined
    >((res, rej) => {
      res(this.getModel(type));
    });
    const { name, points, rewards } = body;
    return await model!.findOneAndUpdate(
      { manager },
      {
        name,
        points,
        rewards,
      }
    );
  }

  public async deleteTier(
    manager: Types.ObjectId,
    type: TierName
  ): Promise<TierType | null> {
    const model = await new Promise<
      | typeof this.goldModel
      | typeof this.silverModel
      | typeof this.platinumModel
      | undefined
    >((res, rej) => {
      res(this.getModel(type));
    });
    return await model!.findOneAndDelete({ manager });
  }
}

export const tierService = new TierService();
