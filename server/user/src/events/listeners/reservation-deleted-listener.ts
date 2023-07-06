import { Listener, ReservationCancelledEvent, Subjects } from "@c10lms/common";

import { Types } from "mongoose";
import { bookingService } from "../../services/bookings.db";

export class ReservationDeletedListener extends Listener<ReservationCancelledEvent> {
  subject: Subjects.ReservationCancelled = Subjects.ReservationCancelled;
  queueGroupName = "user-service";

  async onMessage(data: ReservationCancelledEvent["data"], msg: any) {
    const { _id } = data;

    await bookingService.deleteBooking(_id as Types.ObjectId);
    msg.ack();
  }
}
