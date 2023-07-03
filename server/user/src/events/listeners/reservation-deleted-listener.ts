import {
  Listener,
  ReservationCancelledEvent,
  Subjects,
} from "@c10lms/common";

import { UserType } from "../../../types";
import { userService } from "../../services/user.db";

export class ReservationDeletedListener extends Listener<ReservationCancelledEvent> {
  subject: Subjects.ReservationCancelled = Subjects.ReservationCancelled;
  queueGroupName = "user-service";

  async onMessage(data: ReservationCancelledEvent["data"], msg: any) {
    const user = data.user;
    const userExists = await userService.getUserByEmail(user!.email!);
    if (!userExists?.length) {
      console.log("test");
      await userService.createUser({
        ...(user as unknown as UserType),
      });
    }
    msg.ack();
  }
}
