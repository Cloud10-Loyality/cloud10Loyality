import { Listener, ReservationCreatedEvent } from "@cloud10lms/shared";

import { Message } from "node-nats-streaming";
import { Subjects } from "@cloud10lms/shared/build/events/subjects";
import { Types } from "mongoose";
import { UserType } from "../../../types";
import { userService } from "../../services/user.db";

export class ReservationCreatedListener extends Listener<ReservationCreatedEvent> {
  subject: Subjects.ReservationCreated = Subjects.ReservationCreated;
  queueGroupName = "reservation-service";

  async onMessage(data: ReservationCreatedEvent["data"], msg: any) {
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
