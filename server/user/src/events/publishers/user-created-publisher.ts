import { Publisher, Subjects, UserCreatedEvent } from "@c10lms/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
