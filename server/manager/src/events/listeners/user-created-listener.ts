import {
  Listener,
  ReservationCreatedEvent,
  UserCreatedEvent,
} from "@cloud10lms/shared";

import { Message } from "node-nats-streaming";
import { Subjects } from "@cloud10lms/shared/build/events/subjects";
import { Types } from "mongoose";
import { UserType } from "../../../types";
import { userService } from "../../services/user.db";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = "manager-service";

  async onMessage(data: UserCreatedEvent["data"], msg: any) {
    const {
      firstname,
      lastname,
      email,
      phone,
      uid,
      city,
      country,
      gender,
      age,
      dob,
      state,
      zipCode,
    } = data as unknown as UserType;

    await userService.createUser({
      firstname,
      lastname,
      email,
      phone,
      uid,
      city,
      country,
      dob,
      state,
      zipCode,
      age,
      gender,
    });
    msg.ack();
  }
}
