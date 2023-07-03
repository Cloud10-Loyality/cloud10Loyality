import {
  IntegrationDeletedEvent,
  Publisher,
  Subjects,
} from "@c10lms/common";

export class IntegrationDeletedPublisher extends Publisher<IntegrationDeletedEvent> {
  subject: Subjects.IntegrationDeleted = Subjects.IntegrationDeleted;
}
