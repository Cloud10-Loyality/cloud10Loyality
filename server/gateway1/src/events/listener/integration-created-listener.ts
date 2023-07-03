import { IntegrationCreatedEvent } from "@c10lms/common/build/events/";
import { Listener } from "@c10lms/common/build/events/base-listener";
import { Message } from "node-nats-streaming";
import { Subjects } from "@c10lms/common/build/events/subjects";
import { Types } from "mongoose";
import { integrationService } from "../../services/integrations.db";

export class IntegrationCreatedListener extends Listener<IntegrationCreatedEvent> {
  subject: Subjects.IntegrationCreated = Subjects.IntegrationCreated;
  queueGroupName = "reservation-service";

  async onMessage(data: IntegrationCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);
    await integrationService.createIntegration({
      _id: data.id as unknown as Types.ObjectId,
      name: data.name!,
    });
    msg.ack();
  }
}
