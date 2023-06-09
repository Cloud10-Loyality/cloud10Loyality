import { Publisher, Subjects, UserDeletedEvent } from "@cloud10lms/shared";

export class UserDeletedPublisher extends Publisher<UserDeletedEvent> {
  subject: Subjects.UserDeleted = Subjects.UserDeleted;
}
