import { Listener, PointsCreatedEvent, Subjects } from "@c10lms/common";

import { userService } from "../../services/user.db";

export class PointsCreatedListener extends Listener<PointsCreatedEvent> {
  subject: Subjects.PointsCreated = Subjects.PointsCreated;
  queueGroupName = "user-service";

  async onMessage(data: PointsCreatedEvent["data"], msg: any) {
    userService.updateUserByEmail(data.email, { points: data.points });
    msg.ack();
  }
}
