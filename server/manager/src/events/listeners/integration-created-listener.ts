import {
  IntegrationCreatedEvent,
  Listener,
  Subjects,
} from "@cloud10lms/shared";

import { Types } from "mongoose";
import { managerService } from "../../services/manager.db";

export class IntegrationCreatedListener extends Listener<IntegrationCreatedEvent> {
  subject: Subjects.IntegrationCreated = Subjects.IntegrationCreated;
  queueGroupName = "manager-service";

  async onMessage(data: IntegrationCreatedEvent["data"], msg: any) {
    console.log("--Event data!: In the manager--", data);

    try {
      await managerService.createManager({
        _id: data.id! as unknown as Types.ObjectId,
        name: data.name!,
        username: data.username!,
        email: data.email!,
        role: data.role!,
        city: data.city!,
        state: data.state!,
        pin: data.pin!,
        description: data.description!,
      });

      msg.ack();
    } catch (err) {
      console.log(err);
    }
  }
}
