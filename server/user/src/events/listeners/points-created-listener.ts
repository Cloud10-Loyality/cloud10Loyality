import { Listener, PointsCreatedEvent, Subjects } from "@c10lms/common";

import { UserTiers } from "../../models/userTiers.mode";
import { userService } from "../../services/user.db";
import { userTiersService } from "../../services/userTiers.db";

export class PointsCreatedListener extends Listener<PointsCreatedEvent> {
  subject: Subjects.PointsCreated = Subjects.PointsCreated;
  queueGroupName = "user-service";

  async onMessage(data: PointsCreatedEvent["data"], msg: any) {
    await userService.updateUserByEmail(data.email, { points: data.points });

    const userTiers =
      await userTiersService.getUserTiersByManagerIdAndUserEmail(
        data.managerId!,
        data.email!
      );

    if (userTiers.length > 0) {
      userTiers.forEach(async (userTier: any) => {
        userTier.points = data.points;
        await userTier.save();
      });
      msg.ack();
    } else {
      await userTiersService.createUserTier({
        email: data?.email,
        manager: data?.managerId,
        points: data?.points,
        tier: data?.tier,
      });
      msg.ack();
    }
  }
}
