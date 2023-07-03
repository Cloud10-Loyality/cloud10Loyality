import {
  Publisher,
  ReservationCreatedEvent,
  Subjects,
} from "@c10lms/common";

export class ReservationCreatedPublisher extends Publisher<ReservationCreatedEvent> {
  subject: Subjects.ReservationCreated = Subjects.ReservationCreated;
}
