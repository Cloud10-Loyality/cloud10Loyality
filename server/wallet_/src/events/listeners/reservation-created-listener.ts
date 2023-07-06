import { Listener, ReservationCreatedEvent } from "@c10lms/common";

import { PointsCreatedPublisher } from "../publishers/points-created-publisher";
import { Subjects } from "@c10lms/common/build/events/subjects";
import { natsClient } from "../../nats-client";
import { nftService } from "../../services/nft.db";
import { userService } from "../../services/user.db";

export class ReservationCreatedListener extends Listener<ReservationCreatedEvent> {
  subject: Subjects.ReservationCreated = Subjects.ReservationCreated;
  queueGroupName = "wallet-service";

  async onMessage(data: ReservationCreatedEvent["data"], msg: any) {
    const {
      user: { email, firstname, lastname },
      managerId,
    } = data;

    const { txHash, UNIT_VALUE, metadata } = await nftService.mintNFTMetadata({
      email,
      description: "This is a token for " + firstname + lastname,
      label: 20,
      tokenName: firstname + lastname,
      name: firstname,
      managerId: data.managerId,
    });

    const totalUnits = await nftService.getPoints(email, managerId);

    await new PointsCreatedPublisher(natsClient.client).publish({
      email: email,
      points: totalUnits,
      managerId: data.managerId,
    });

    console.log({ txHash, UNIT_VALUE, metadata });

    const user = await userService.getUserByEmail(email);
    // await reservationService.createReservation(data);
    msg.ack();
  }
}
