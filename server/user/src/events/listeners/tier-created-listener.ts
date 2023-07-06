import { Listener, Subjects, TierCreatedEvent } from "@c10lms/common";

import { Message } from "node-nats-streaming";
import { TierEnum } from "../../../types";
import { tierService } from "../../services/tiers.db";

export class TierCreatedListener extends Listener<TierCreatedEvent> {
  subject: Subjects.TierCreated = Subjects.TierCreated;
  queueGroupName = "user-service";

  async onMessage(data: TierCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);
    await tierService.createTier({
      name: data.name as TierEnum,
      points: data.points,
      rewards: data.rewards,
      manager: data.manager,
    });

    msg.ack();
  }
}
