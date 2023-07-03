import {
  Publisher,
  ReservationCancelledEvent,
  Subjects,
} from "@c10lms/common";

export class ReservationDeletedPublisher extends Publisher<ReservationCancelledEvent> {
  subject: Subjects.ReservationCancelled = Subjects.ReservationCancelled;
}
