import { Listener, Subjects, UserCreatedEvent } from "@cloud10lms/shared";

import { walletService } from "../../services/wallet.db";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = "user-service";

  async onMessage(data: UserCreatedEvent["data"], msg: any) {
    // Do something
    console.log("Event data!", data);
    await walletService.createWallet(data);
    msg.ack();
  }
}
