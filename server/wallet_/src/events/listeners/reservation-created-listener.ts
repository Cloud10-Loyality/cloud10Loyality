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
    const MAX_RETRIES = 5; // Maximum number of retries
    const INITIAL_DELAY_MS = 100; // Initial delay in milliseconds
    const MAX_DELAY_MS = 5000; // Maximum delay in milliseconds

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

      let txHash, UNIT_VALUE, metadata;

      let retries = 0;
      let delay = INITIAL_DELAY_MS;

      while (retries < MAX_RETRIES) {
        try {
          // Attempt to mint NFT metadata
          ({ txHash, UNIT_VALUE, metadata } = await nftService.mintNFTMetadata({
            email,
            description: "This is a token for " + firstname + lastname,
            label: 20,
            tokenName: uniqueTokenName,
            name: firstname + lastname,
            managerId: data.managerId,
          }));

          // Transaction was successful, exit the retry loop
          break;
        } catch (error) {
          if (isTransientError(error)) {
            // Transient error, retry after a delay
            await sleep(delay);
            retries++;
            // Exponential backoff, increase the delay for the next retry
            delay = Math.min(delay * 2, MAX_DELAY_MS);
          } else {
            // Non-transient error, re-throw the error to be handled by the catch block
            throw error;
          }
        }
      }

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

function isTransientError(error: any) {
  // Implement your logic to check if the error is transient
  return error.code === "TRANSIENT_ERROR";
  // return true; // Placeholder, always return true for demonstration purposes
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
