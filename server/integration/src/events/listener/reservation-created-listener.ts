import {
  Listener,
  ReservationCreatedEvent,
  Subjects,
} from "@c10lms/common";

export class ReservationCreatedListener extends Listener<ReservationCreatedEvent> {
  subject: Subjects.ReservationCreated = Subjects.ReservationCreated;
  queueGroupName = "integration-service";

  async onMessage(data: ReservationCreatedEvent["data"], msg: any) {
    console.log("Event data!", data);
    msg.ack();
  }
}
