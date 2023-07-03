import { Listener, ReservationCancelledEvent, Subjects } from "@c10lms/common";

// import { reservationService } from "../../services/reservation.db";

export class ReservationDeletedListener extends Listener<ReservationCancelledEvent> {
  subject: Subjects.ReservationCancelled = Subjects.ReservationCancelled;
  queueGroupName = "wallet-service";

  async onMessage(data: ReservationCancelledEvent["data"], msg: any) {
    // await reservationService.deleteReservation(data._id as unknown as string);
    msg.ack();
  }
}
