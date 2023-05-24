import {
  Publisher,
  ReservationCreatedEvent,
  Subjects,
} from "@cloud10lms/shared";

export class ReservationCreatedPublisher extends Publisher<ReservationCreatedEvent> {
  subject: Subjects.ReservationCreated = Subjects.ReservationCreated;
}
