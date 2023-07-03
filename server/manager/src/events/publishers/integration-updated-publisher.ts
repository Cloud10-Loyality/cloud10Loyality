import {
  IntegrationUpdatedEvent,
  Publisher,
} from "@c10lms/common/build/events";

import { Subjects } from "@c10lms/common/build/events/subjects";

export class IntegrationUpdatedPublisher extends Publisher<IntegrationUpdatedEvent> {
  subject: Subjects.IntegrationUpdated = Subjects.IntegrationUpdated;
}
