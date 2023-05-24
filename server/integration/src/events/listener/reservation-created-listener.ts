import {
  Listener,
  ReservationCreatedEvent,
  Subjects,
} from "@cloud10lms/shared";

export class ReservationCreatedListener extends Listener<ReservationCreatedEvent> {
  subject: Subjects.ReservationCreated = Subjects.ReservationCreated;
  queueGroupName = "reservation-service";

  async onMessage(data: ReservationCreatedEvent["data"], msg: any) {
    console.log("Event data!", data);
    msg.ack();
  }
}
