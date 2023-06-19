import {
  IntegrationCreatedEvent,
  Listener,
  Subjects,
} from "@cloud10lms/shared";

import { Message } from "node-nats-streaming";

export class IntegrationCreatedListener extends Listener<IntegrationCreatedEvent> {
  subject: Subjects.IntegrationCreated = Subjects.IntegrationCreated;
  queueGroupName = "tier-service";

  async onMessage(data: IntegrationCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);
    msg.ack();
  }
}
