import {
  Publisher,
  ReservationCancelledEvent,
  Subjects,
} from "@cloud10lms/shared";

export class ReservationDeletedPublisher extends Publisher<ReservationCancelledEvent> {
  subject: Subjects.ReservationCancelled = Subjects.ReservationCancelled;
}
