import {
  Listener,
  ReservationCreatedEvent,
  UserCreatedEvent,
} from "@cloud10lms/shared";

import { Message } from "node-nats-streaming";
import { Subjects } from "@cloud10lms/shared/build/events/subjects";
import { Types } from "mongoose";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = "manager-service";

  async onMessage(data: UserCreatedEvent["data"], msg: any) {
    console.log("Event data!", data);
    msg.ack();
  }
}
