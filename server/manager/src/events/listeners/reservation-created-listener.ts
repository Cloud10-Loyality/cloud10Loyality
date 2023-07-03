import { Listener, ReservationCreatedEvent } from "@c10lms/common";

import { Message } from "node-nats-streaming";
import { Subjects } from "@c10lms/common/build/events/subjects";
import { Types } from "mongoose";
import { reservationService } from "../../services/reservation.db";

export class ReservationCreatedListener extends Listener<ReservationCreatedEvent> {
  subject: Subjects.ReservationCreated = Subjects.ReservationCreated;
  queueGroupName = "manager-service";

  async onMessage(data: ReservationCreatedEvent["data"], msg: any) {
    await reservationService.createReservation(data);
    msg.ack();
  }
}
