import {
  IntegrationUpdatedEvent,
  Publisher,
} from "@cloud10lms/shared/build/events";

import { Subjects } from "@cloud10lms/shared/build/events/subjects";

export class IntegrationUpdatedPublisher extends Publisher<IntegrationUpdatedEvent> {
  subject: Subjects.IntegrationUpdated = Subjects.IntegrationUpdated;
}
