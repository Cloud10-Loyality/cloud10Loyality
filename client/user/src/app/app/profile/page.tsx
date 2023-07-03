"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const { accessToken } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://cloud10lms.com/api/v1/user/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (accessToken) {
      fetchUserData();
    }
  }, [accessToken]);
  // Function to format date in "dd.mm.yyyy" format
function formatDate(dateString: string | number | Date) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Pad day and month with leading zeros if necessary
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}.${formattedMonth}.${year}`;
}


  return (
 <div className="w-10/12 ml-6 mt-8 dark:text-white dark:bg-[#272F3C] bg-white p-6 rounded-lg shadow-lg">
  {user && Object.keys(user).length > 0 ? (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.firstname}!</h1>
      <div className="border-b pb-4 mb-6 grid grid-cols-2 gap-8">
        <div>
          <p className="flex items-center mb-2">
            <span className="font-semibold mr-2">Full Name:</span>
            <span>{user.firstname} {user.lastname}</span>
          </p>
          <p className="flex items-center mb-2">
            <span className="font-semibold mr-2">Email:</span>
            <span>{user.email}</span>
          </p>
          <p className="flex items-center mb-2">
            <span className="font-semibold mr-2">Gender:</span>
            <span>{user.gender}</span>
          </p>
          <p className="flex items-center mb-2">
            <span className="font-semibold mr-2">Date of Birth:</span>
            <span>{formatDate(user.dob)}</span>
          </p>
        </div>
        <div>
          <p className="flex items-center mb-2">
            <span className="font-semibold mr-2">Phone:</span>
            <span>{user.phone}</span>
          </p>
          <p className="flex items-center mb-2">
            <span className="font-semibold mr-2">City:</span>
            <span>{user.city}</span>
          </p>
          <p className="flex items-center mb-2">
            <span className="font-semibold mr-2">State:</span>
            <span>{user.state}</span>
          </p>
          <p className="flex items-center mb-2">
            <span className="font-semibold mr-2">Country:</span>
            <span>{user.country}</span>
          </p>
          <p className="flex items-center mb-2">
            <span className="font-semibold mr-2">Zipcode:</span>
            <span>{user.zipCode}</span>
          </p>
        </div>
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Edit Profile
      </button>
    </div>
  ) : (
    <p>Loading user data...</p>
  )}
</div>




  );
}
