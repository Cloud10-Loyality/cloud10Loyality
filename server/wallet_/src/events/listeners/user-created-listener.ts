import { Listener, Subjects, UserCreatedEvent } from "@cloud10lms/shared";

import { walletService } from "../../services/wallet.db";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = "wallet-service";

  async onMessage(data: UserCreatedEvent["data"], msg: any) {
    await walletService.createWallet(data);
    msg.ack();
  }
}
