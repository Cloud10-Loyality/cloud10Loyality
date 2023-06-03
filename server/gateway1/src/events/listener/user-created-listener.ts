import {
  IntegrationCreatedEvent,
  Listener,
  Subjects,
  UserCreatedEvent,
} from "@cloud10lms/shared";

import { Message } from "node-nats-streaming";
import { Types } from "mongoose";
import { integrationService } from "../../services/integrations.db";

export class UserCreateListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = "user-service";

  async onMessage(data: UserCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);
    msg.ack();
  }
}
