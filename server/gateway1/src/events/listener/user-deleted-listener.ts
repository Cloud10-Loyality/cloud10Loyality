import { Listener, Subjects, UserDeletedEvent } from "@cloud10lms/shared";

import { userService } from "../../services/users.db";

export class UserDeletedListener extends Listener<UserDeletedEvent> {
  subject: Subjects.UserDeleted = Subjects.UserDeleted;
  queueGroupName = "reservation-service";

  async onMessage(data: UserDeletedEvent["data"], msg: any) {
    const { email } = data;
    await userService.deleteUser(email);
    console.log("User deleted successfully");
    msg.ack();
  }
}
