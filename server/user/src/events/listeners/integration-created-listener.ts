import { IntegrationCreatedEvent, Listener, Subjects } from "@c10lms/common";

import { Types } from "mongoose";
import { integrationsService } from "../../services/integrations.db";

export class IntegrationCreatedListener extends Listener<IntegrationCreatedEvent> {
  subject: Subjects.IntegrationCreated = Subjects.IntegrationCreated;
  queueGroupName = "user-service";

  async onMessage(data: IntegrationCreatedEvent["data"], msg: any) {
    const integration = await integrationsService.getIntegration(
      data.id as unknown as Types.ObjectId
    );

    if (!integration) {
      await integrationsService.createIntegration({
        _id: data.id as unknown as Types.ObjectId,
        email: data.email,
        name: data.name,
      });
      msg.ack();
    }
  }
}
