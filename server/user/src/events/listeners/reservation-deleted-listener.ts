import {
  Listener,
  ReservationCancelledEvent,
  Subjects,
} from "@cloud10lms/shared";

import { userService } from "../../services/user.db";

export class ReservationDeletedListener extends Listener<ReservationCancelledEvent> {
  subject: Subjects.ReservationCancelled = Subjects.ReservationCancelled;
  queueGroupName = "reservation-service";

  async onMessage(data: ReservationCancelledEvent["data"], msg: any) {
    // const user = data.user;
    // const userExists = await userService.getUserByEmail(user!.email!);
    // if (!userExists?.length) {
    //   console.log("test");
    //   await userService.createUser({
    //     ...(user as unknown as UserType),
    //   });
    // }
    console.log;
    msg.ack();
  }
}
