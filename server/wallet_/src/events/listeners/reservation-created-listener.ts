import { Listener, ReservationCreatedEvent } from "@c10lms/common";

import { Message } from "node-nats-streaming";
import { Subjects } from "@c10lms/common/build/events/subjects";
import { Types } from "mongoose";
import { nftService } from "../../services/nft.db";
import { userService } from "../../services/user.db";

// import { reservationService } from "../../services/reservation.db";

export class ReservationCreatedListener extends Listener<ReservationCreatedEvent> {
  subject: Subjects.ReservationCreated = Subjects.ReservationCreated;
  queueGroupName = "wallet-service";

  async onMessage(data: ReservationCreatedEvent["data"], msg: any) {
    const {
      user: { email, firstname, lastname },
    } = data;

    const { txHash, UNIT_VALUE, metadata } = await nftService.mintNFTMetadata({
      email,
      description: "This is a token for " + firstname + lastname,
      label: 20,
      tokenName: firstname + lastname,
      name: firstname,
    });

    console.log({ txHash, UNIT_VALUE, metadata });

    const user = await userService.getUserByEmail(email);
    // await reservationService.createReservation(data);
    msg.ack();
  }
}
