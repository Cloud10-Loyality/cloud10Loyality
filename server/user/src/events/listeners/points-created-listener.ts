import { Listener, PointsCreatedEvent, Subjects } from "@c10lms/common";

import { userService } from "../../services/user.db";
import { userTiersService } from "../../services/userTiers.db";

export class PointsCreatedListener extends Listener<PointsCreatedEvent> {
  subject: Subjects.PointsCreated = Subjects.PointsCreated;
  queueGroupName = "user-service";

  async onMessage(data: PointsCreatedEvent["data"], msg: any) {
    await userService.updateUserByEmail(data.email, { points: data.points });
    await userTiersService.createUserTier({
      email: data?.email,
      manager: data?.managerId,
      points: data?.points,
      tier: data?.tier,
    });
    msg.ack();
  }
}
