import {
  IntegrationDeletedEvent,
  Listener,
  Subjects,
} from "@c10lms/common";

import { Types } from "mongoose";
import { managerService } from "../../services/manager.db";

export class IntegrationDeletedListener extends Listener<IntegrationDeletedEvent> {
  subject: Subjects.IntegrationDeleted = Subjects.IntegrationDeleted;
  queueGroupName = "manager-service";
  async onMessage(data: IntegrationDeletedEvent["data"], msg: any) {
    console.log("--Event data!: In the manager--", data);
    await managerService.deleteManager(data.id as unknown as Types.ObjectId);
    msg.ack();
  }
}
