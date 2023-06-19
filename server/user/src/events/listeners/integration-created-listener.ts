import {
  IntegrationCreatedEvent,
  Listener,
  Subjects,
} from "@cloud10lms/shared";

export class IntegrationCreatedListener extends Listener<IntegrationCreatedEvent> {
  subject: Subjects.IntegrationCreated = Subjects.IntegrationCreated;
  queueGroupName = "user-service";

  async onMessage(data: IntegrationCreatedEvent["data"], msg: any) {
    console.log("Event data!", data);
    msg.ack();
  }
}
