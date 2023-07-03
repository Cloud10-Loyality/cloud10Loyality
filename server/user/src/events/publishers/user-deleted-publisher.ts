import { Publisher, Subjects, UserDeletedEvent } from "@c10lms/common";

export class UserDeletedPublisher extends Publisher<UserDeletedEvent> {
  subject: Subjects.UserDeleted = Subjects.UserDeleted;
}
