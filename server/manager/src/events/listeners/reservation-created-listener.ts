import { Listener, ReservationCreatedEvent } from "@cloud10lms/shared";

import { Message } from "node-nats-streaming";
import { Subjects } from "@cloud10lms/shared/build/events/subjects";
import { Types } from "mongoose";

export class ReservationCreatedListener extends Listener<ReservationCreatedEvent> {
  subject: Subjects.ReservationCreated = Subjects.ReservationCreated;
  queueGroupName = "manager-service";

  async onMessage(data: ReservationCreatedEvent["data"], msg: any) {
    console.log("Event data!", data);
    msg.ack();
  }
}
