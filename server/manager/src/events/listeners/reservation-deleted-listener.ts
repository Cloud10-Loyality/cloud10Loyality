import {
  Listener,
  ReservationCancelledEvent,
  Subjects,
} from "@cloud10lms/shared";

import { Types } from "mongoose";
import { reservationService } from "../../services/reservation.db";

export class ReservationDeletedListener extends Listener<ReservationCancelledEvent> {
  subject: Subjects.ReservationCancelled = Subjects.ReservationCancelled;
  queueGroupName = "manager-service";

  async onMessage(data: ReservationCancelledEvent["data"], msg: any) {
    await reservationService.deleteReservation(data._id as unknown as string);
    msg.ack();
  }
}
