import { BOOKING_COLUMN } from "@/constants/table-columns";
import BookingTable from "@/components/booking/BookingTable";
import { Loader } from "lucide-react";
import { Reservation } from "../../bookings/page";
import { Suspense } from "react";
import { USER_BOOKING_COLUMN } from "@/constants/user/user-booking-column";
import { User } from "@/libs/hooks/use-user";
import UserDetails from "@/components/user/UserDetails";
import axios from "axios";
import { decodeStr } from "@/libs/utils";

export interface Root {
  status: string;
  error: boolean;
  data: Data;
}

export interface Data {
  user: User;
}

export interface BookingsRoot {
  status: string;
  error: boolean;
  totalResults: number;
  data: {
    bookings: Reservation[];
  };
}

async function getUser(accessToken?: string, userId?: string): Promise<User> {
  try {
    const res = await axios.get<Root>(
      `http://cloud10lms.com/api/v1/manager/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data.data?.user;
  } catch (err) {
    console.log(err.response.data);
  }
}

async function getUserBookings(
  accessToken: string,
  email: string
): Promise<Reservation[]> {
  try {
    const res = await axios.get<BookingsRoot>(
      `http://cloud10lms.com/api/v1/manager/user/bookings?userEmail=${email}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data.data.bookings;
  } catch (err) {
    console.log(err);
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    userId: string;
  };
  searchParams: {
    q: string;
  };
}) {
  const q = searchParams["q"];

  const query = q && decodeStr(q);

  const user = await getUser(query?.accessToken, params?.userId);
  const userBookings = await getUserBookings(query?.accessToken, user?.email);

  return (
    <div>
      <Suspense fallback={<Loader className="animate-spin" />}>
        <UserDetails user={user} />
      </Suspense>
      <Suspense fallback={<Loader className="animate-spin" />}>
        <UserBookings data={userBookings} />
      </Suspense>
    </div>
  );
}

function UserBookings({ data }: { data: Reservation[] }) {
  return (
    <div className="mt-6">
      <h1 className="font-bold mb-2">Boookings</h1>
      <BookingTable column={USER_BOOKING_COLUMN} data={data} />
    </div>
  );
}
