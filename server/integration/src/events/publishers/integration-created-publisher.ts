import { IntegrationCreatedEvent, Publisher } from '@cloud10lms/shared/build/events';

import { Subjects } from '@cloud10lms/shared/build/events/subjects';

export class IntegrationCreatedPublisher extends Publisher<IntegrationCreatedEvent> {
  subject: Subjects.IntegrationCreated = Subjects.IntegrationCreated;
}