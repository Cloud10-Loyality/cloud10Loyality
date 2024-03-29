import { RootState } from "@/Redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Booking {
  id: string;
  hotelName: string;
  city: string;
  state: string;
  zipCode: string;
  checkIn: string; // or Date if you prefer
  checkOut: string; // or Date if you prefer
  country: string;
  paymentMethod: string;
  amount: number;
}

export default function HistoryTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { accessToken } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://cloud10lms.com/api/v1/user/bookings/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setBookings(response.data.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [accessToken]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 dark:text-white">My Bookings</h1>
      {bookings.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Hotel Name</th>
              <th className="py-2 px-4">City</th>
              <th className="py-2 px-4">State</th>
              <th className="py-2 px-4">Zip Code</th>
              <th className="py-2 px-4">Check-in</th>
              <th className="py-2 px-4">Check-out</th>
              <th className="py-2 px-4">Country</th>
              <th className="py-2 px-4">Payment Method</th>
              <th className="py-2 px-4">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="py-2 px-4 align-middle">{booking.hotelName}</td>
                <td className="py-2 px-4 align-middle">{booking.city}</td>
                <td className="py-2 px-4 align-middle">{booking.state}</td>
                <td className="py-2 px-4 align-middle">{booking.zipCode}</td>
                <td className="py-2 px-4 align-middle">
                  {new Date(booking.checkIn).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 align-middle">
                  {new Date(booking.checkOut).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 align-middle">{booking.country}</td>
                <td className="py-2 px-4 align-middle">
                  {booking.paymentMethod}
                </td>
                <td className="py-2 px-4 align-middle">{booking.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
}
