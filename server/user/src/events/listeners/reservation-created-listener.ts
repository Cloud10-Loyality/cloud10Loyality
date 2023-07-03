import {
  Listener,
  ReservationCreatedEvent,
  Subjects,
} from "@c10lms/common";

import { UserType } from "../../../types";
import { bookingService } from "../../services/bookings.db";
import { userService } from "../../services/user.db";

export class ReservationCreatedListener extends Listener<ReservationCreatedEvent> {
  subject: Subjects.ReservationCreated = Subjects.ReservationCreated;
  queueGroupName = "user-service";

  async onMessage(data: ReservationCreatedEvent["data"], msg: any) {
    const user = data.user;
    const userExists = await userService.getUserByEmail(user!.email!);

    if (!userExists?.length) {
      await userService.createUser({
        ...(user as unknown as UserType),
      });
    }

    // TODO: Change the number of guests and country to the actual number of guests and country
    await bookingService.createBooking({
      _id: data._id,
      hotelName: data.hotelName,
      userEmail: user?.email,
      amount: data.amount,
      checkIn: data.checkIn as unknown as Date,
      checkOut: data.checkOut as unknown as Date,
      city: data.city,
      paymentMethod: data.paymentMethod,
      state: data.state,
      zipCode: data.pin as unknown as number,
      numberOfGuests: 2,
      country: "India",
    });

    msg.ack();
  }
}
