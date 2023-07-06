import { Publisher, Subjects, TierCreatedEvent } from "@c10lms/common";

export class TierCreatedPublisher extends Publisher<TierCreatedEvent> {
  subject: Subjects.TierCreated = Subjects.TierCreated;
}
