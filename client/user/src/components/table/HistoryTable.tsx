import axios from 'axios';
import { useEffect, useState } from 'react';

export default function HistoryTable() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://cloud10lms.com/api/v1/user/bookings/me');
        setBookings(response.data.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
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
                <td className="py-2 px-4">{booking.hotelName}</td>
                <td className="py-2 px-4">{booking.city}</td>
                <td className="py-2 px-4">{booking.state}</td>
                <td className="py-2 px-4">{booking.zipCode}</td>
                <td className="py-2 px-4">{new Date(booking.checkIn).toLocaleDateString()}</td>
                <td className="py-2 px-4">{new Date(booking.checkOut).toLocaleDateString()}</td>
                <td className="py-2 px-4">{booking.country}</td>
                <td className="py-2 px-4">{booking.paymentMethod}</td>
                <td className="py-2 px-4">{booking.amount}</td>
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
