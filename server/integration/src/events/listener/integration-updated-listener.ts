import {
  IntegrationUpdatedEvent,
  Listener,
  Subjects,
} from "@cloud10lms/shared";

import { Types } from "mongoose";
import { integrationService } from "../../services/integrations.db";

export class IntegrationUpdatedListener extends Listener<IntegrationUpdatedEvent> {
  subject: Subjects.IntegrationUpdated = Subjects.IntegrationUpdated;
  queueGroupName = "integration-service";

  async onMessage(data: IntegrationUpdatedEvent["data"], msg: any) {
    console.log("Event data!", data);
    await integrationService.updateIntegration(data.id!, data);
    msg.ack();
  }
}
