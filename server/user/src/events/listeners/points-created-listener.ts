import { Listener, PointsCreatedEvent, Subjects } from "@c10lms/common";

import { Types } from "mongoose";
import { integrationsService } from "../../services/integrations.db";
import { tierService } from "../../services/tiers.db";
import { userTiersService } from "../../services/userTiers.db";

export class PointsCreatedListener extends Listener<PointsCreatedEvent> {
  subject: Subjects.PointsCreated = Subjects.PointsCreated;
  queueGroupName = "user-service";

  async onMessage(data: PointsCreatedEvent["data"], msg: any) {
    const [manager, managerTiers, userTiers] = await Promise.all([
      integrationsService.getIntegration(data.managerId),
      tierService.getAllManagerTiers(
        data.managerId as unknown as Types.ObjectId
      ),
      userTiersService.getUserTiersByManagerIdAndUserEmail(
        data.managerId!,
        data.email!
      ),
    ]);

    if (userTiers.length > 0) {
      userTiers.forEach(async (userTier: any) => {
        userTier.points = data.points;
        await userTier.save();
      });
      managerTiers.map(async (tier) => {
        if (tier.points! <= data.points!) {
          userTiers.forEach(async (userTier: any) => {
            userTier.tier = tier?.name;
            await userTier.save();
          });
          msg.ack();
        }
      });
      msg.ack();
    } else {
      await userTiersService.createUserTier({
        email: data?.email,
        manager: {
          _id: data?.managerId,
          email: manager?.email,
          name: manager?.name,
        },
        points: data?.points,
        tier: data?.tier,
      });
      msg.ack();
    }
  }
}
