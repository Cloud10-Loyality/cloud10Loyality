"use client";
import { useProfile, User } from "@/utils/hooks/use-profile";
export default function UserProfile() {
  const { user, loading } = useProfile();

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
      {loading ? (
        <p>Loading user data...</p>
      ) : user.length !== 0 ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Welcome, {user.firstname}!</h1>
            <h2 className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
              Points: {user.points}
            </h2>
          </div>
          <div className="border-b pb-4 mb-6 grid grid-cols-2 gap-8">
            <div>
              <p className="flex items-center mb-2">
                <span className="font-semibold mr-2">Full Name:</span>
                <span>
                  {user.firstname} {user.lastname}
                </span>
              </p>
              <p className="flex items-center mb-2">
                <span className="font-semibold mr-2">Dob:</span>
                <span>{user.dob}</span>
              </p>
              <p className="flex items-center mb-2">
                <span className="font-semibold mr-2">Email:</span>
                <span>{user.email}</span>
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
                <span className="font-semibold mr-2">Zip Code:</span>
                <span>{user.zipCode}</span>
              </p>
              {/* Render other user properties */}
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Edit Profile
          </button>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
}
