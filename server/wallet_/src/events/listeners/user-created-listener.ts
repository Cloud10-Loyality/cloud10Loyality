import { Listener, Subjects, UserCreatedEvent } from "@c10lms/common";

import { nftService } from "../../services/nft.db";
import { walletService } from "../../services/wallet.db";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = "wallet-service";

  async onMessage(data: UserCreatedEvent["data"], msg: any) {
    // const { firstname, email, lastname } = data;
    // const { txHash, UNIT_VALUE, metadata } = await nftService.mintNFTMetadata({
    //   email,
    //   description: "This is a token for " + firstname + lastname,
    //   label: 20,
    //   tokenName: firstname + lastname,
    //   name: firstname,
    // });

    // await nftService.handleBurning({
    //   metadata,
    //   txHash,
    //   tokenName: firstname + lastname,
    // });

    // console.log("Metadata: ", metadata);

    msg.ack();
  }
}
