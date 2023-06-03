import { Subjects } from "@cloud10lms/shared/build/events/subjects";
import { Listener, ReservationCreatedEvent } from "@cloud10lms/shared";
import { Types } from "mongoose";
import { Message } from "node-nats-streaming";

export class ReservationCreatedListener extends Listener<ReservationCreatedEvent> {
  subject: Subjects.ReservationCreated = Subjects.ReservationCreated;
  queueGroupName = "reservation-service";

  async onMessage(data: ReservationCreatedEvent["data"], msg: any) {
    console.log("Event data!", data);
    msg.ack();
  }
}
