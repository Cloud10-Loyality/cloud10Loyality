import { Publisher, Subjects, UserCreatedEvent } from "@cloud10lms/shared";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
