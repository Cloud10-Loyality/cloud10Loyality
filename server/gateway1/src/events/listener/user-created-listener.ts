import { Listener, Subjects, UserCreatedEvent } from "@cloud10lms/shared";

import { Message } from "node-nats-streaming";
import { userService } from "../../services/users.db";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = "user-service";

  async onMessage(data: UserCreatedEvent["data"], msg: Message) {
    const { id, email, phone } = data;
    console.log("Event data!: User Created", data);
    await userService.createUser({ _id: id, email, phone });
    msg.ack();
  }
}
