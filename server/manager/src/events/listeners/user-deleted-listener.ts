import { Listener, Subjects, UserDeletedEvent } from "@c10lms/common";

import { Types } from "mongoose";
import { userService } from "../../services/user.db";

export class UserDeleteListener extends Listener<UserDeletedEvent> {
  subject: Subjects.UserDeleted = Subjects.UserDeleted;
  queueGroupName = "manager-service";

  async onMessage(data: UserDeletedEvent["data"], msg: any) {
    await userService.deleteUser(data.id as unknown as Types.ObjectId);
    msg.ack();
  }
}
