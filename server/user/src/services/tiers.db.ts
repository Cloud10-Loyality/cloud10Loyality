// import { TierName, TierType } from "../../types";

import { TierType } from "../../types";
import { Tiers } from "../models/tiers.model";
import { Types } from "mongoose";

export class TierService {
  private model = Tiers;

  public async getTiers(): Promise<TierType[] | null> {
    const res = await this.model.find();

    return res;
  }

  public async createTier(body: TierType): Promise<TierType | null> {
    const { name, points, rewards, manager } = body;
    const res = await this.model.create({
      name,
      points,
      rewards,
      manager,
    });

    return res;
  }

  //   public async getAllTiersByManagerId(id: Types.ObjectId): Promise<TierType[]> {
  //     const res = await Promise.all([
  //       this.goldModel.find({ manager: id }),
  //       this.silverModel.find({ manager: id }),
  //       this.platinumModel.find({ manager: id }),
  //     ]);

  //     return res.flat();
  //   }

  //   public async updateTier(
  //     manager: Types.ObjectId,
  //     type: TierName,
  //     body: TierType
  //   ): Promise<TierType | null> {
  //     const model = await new Promise<
  //       | typeof this.goldModel
  //       | typeof this.silverModel
  //       | typeof this.platinumModel
  //       | undefined
  //     >((res, rej) => {
  //       res(this.getModel(type));
  //     });
  //     const { name, points, rewards } = body;
  //     return await model!.findOneAndUpdate(
  //       { manager },
  //       {
  //         name,
  //         points,
  //         rewards,
  //       }
  //     );
  //   }

  public async deleteTierByTierId(
    id: Types.ObjectId
  ): Promise<TierType | null> {
    return await this.model.findByIdAndDelete(id);
  }

  //   public async deleteTier(
  //     manager: Types.ObjectId,
  //     type: TierName
  //   ): Promise<TierType | null> {
  //     const model = await new Promise<
  //       | typeof this.goldModel
  //       | typeof this.silverModel
  //       | typeof this.platinumModel
  //       | undefined
  //     >((res, rej) => {
  //       res(this.getModel(type));
  //     });
  //     return await model!.findOneAndDelete({ manager });
  //   }
}

export const tierService = new TierService();
