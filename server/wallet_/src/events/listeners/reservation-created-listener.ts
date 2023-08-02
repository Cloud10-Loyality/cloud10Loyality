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
    try {
      const {
        user: { email, firstname, lastname },
        managerId,
      } = data;

      const randomCharacter = String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      );
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      const uniqueTokenName = `${firstname}_${randomCharacter}${randomNumber}`;

      const { txHash, UNIT_VALUE, metadata } = await nftService.mintNFTMetadata(
        {
          email,
          description: "This is a token for " + firstname + lastname,
          label: 20,
          tokenName: uniqueTokenName,
          name: firstname + lastname,
          managerId: data.managerId,
        }
      );

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
    } catch (error) {
      console.error("Error in ReservationCreatedListener:", error);
      msg.ack();
    }
  }
}
