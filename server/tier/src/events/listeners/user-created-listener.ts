import { Listener, Subjects, UserCreatedEvent } from "@cloud10lms/shared";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = "user-service";

  async onMessage(data: UserCreatedEvent["data"], msg: any) {
    console.log("Event data!", data);

    msg.ack();
  }
}
