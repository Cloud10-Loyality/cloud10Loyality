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

  return (
    <div className="max-w-md mx-auto mt-8 dark:text-white dark:bg-[#272F3C] bg-white p-6 rounded-lg shadow-lg">
      {user && Object.keys(user).length > 0 ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstname} !</h1>
          <div className="mb-4">
            <p className="mb-2">
              <span className="font-semibold">Full Name:</span> {user.firstname} {user.lastname}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Gender:</span> {user.gender}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Date of Birth:</span> {user.dob}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p className="mb-2">
              <span className="font-semibold">City:</span> {user.city}
            </p>
            <p className="mb-2">
              <span className="font-semibold">State:</span> {user.state}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Country:</span> {user.country}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Zipcode:</span> {user.zipCode}
            </p>
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
