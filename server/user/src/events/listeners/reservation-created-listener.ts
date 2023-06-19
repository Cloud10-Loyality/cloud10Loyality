import {
  Listener,
  ReservationCreatedEvent,
  Subjects,
} from "@cloud10lms/shared";

import { UserType } from "../../../types";
import { userService } from "../../services/user.db";

export class ReservationCreatedListener extends Listener<ReservationCreatedEvent> {
  subject: Subjects.ReservationCreated = Subjects.ReservationCreated;
  queueGroupName = "user-service";

  async onMessage(data: ReservationCreatedEvent["data"], msg: any) {
    const user = data.user;
    const userExists = await userService.getUserByEmail(user!.email!);

    console.log("Reservation Created Event in User Service:", data);

    if (!userExists?.length) {
      console.log("test");
      await userService.createUser({
        ...(user as unknown as UserType),
      });
    }

    msg.ack();
  }
}

// import {
//   Listener,
//   ReservationCreatedEvent,
//   Subjects,
// } from "@cloud10lms/shared";

// import { UserType } from "../../../types";
// import { userService } from "../../services/user.db";

// export class ReservationCreatedListener extends Listener<ReservationCreatedEvent> {
//   subject: Subjects.ReservationCreated = Subjects.ReservationCreated;
//   queueGroupName = "reservation-service";

//   async onMessage(data: ReservationCreatedEvent["data"], msg: any) {
// const user = data.user;
// const userExists = await userService.getUserByEmail(user!.email!);

// console.log("Reservation Created Event in User Service:", data);

// if (!userExists?.length) {
//   console.log("test");
//   await userService.createUser({
//     ...(user as unknown as UserType),
//   });
// }

// msg.ack();
//   }
// }
