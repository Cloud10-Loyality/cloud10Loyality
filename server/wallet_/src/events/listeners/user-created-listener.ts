import { Listener, Subjects, UserCreatedEvent } from "@cloud10lms/shared";

import { walletService } from "../../services/wallet.db";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = "wallet-service";

  async onMessage(data: UserCreatedEvent["data"], msg: any) {
    const { firstname, email, phone } = data;
    await walletService.createWallet({ name: firstname, email, phone });
    msg.ack();
  }
}
