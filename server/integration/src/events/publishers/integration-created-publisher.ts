import { IntegrationCreatedEvent, Publisher } from '@c10lms/common/build/events';

import { Subjects } from '@c10lms/common/build/events/subjects';

export class IntegrationCreatedPublisher extends Publisher<IntegrationCreatedEvent> {
  subject: Subjects.IntegrationCreated = Subjects.IntegrationCreated;
}