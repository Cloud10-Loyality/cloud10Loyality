import {
  IntegrationDeletedEvent,
  Publisher,
  Subjects,
} from "@cloud10lms/shared";

export class IntegrationDeletedPublisher extends Publisher<IntegrationDeletedEvent> {
  subject: Subjects.IntegrationDeleted = Subjects.IntegrationDeleted;
}
