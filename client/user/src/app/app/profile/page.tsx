"use client";
import { useProfile, User } from "@/utils/hooks/use-profile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

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
    <div className="w-10/12 ml-6 mt-8 ">
      {loading ? (
        <p>Loading user data...</p>
      ) : user.length !== 0 ? (
        <div>
          <Card>
            <CardHeader className="text-2xl">
              <h1>
                Welcome, <span>{user.firstname}!</span>
              </h1>
            </CardHeader>
            <CardContent>
              <p className="flex items-center mb-2">
                <span className=" mr-2">Full Name:</span>
                <CardDescription>
                  {user.firstname} {user.lastname}
                </CardDescription>
              </p>
              <p className="flex items-center mb-2">
                <span className=" mr-2">Dob:</span>
                <CardDescription>{formatDate(user.dob)}</CardDescription>
              </p>
              <p className="flex items-center mb-2">
                <span className=" mr-2">Email:</span>
                <CardDescription>{user.email}</CardDescription>
              </p>
              <p className="flex items-center mb-2">
                <span className=" mr-2">Phone:</span>
                <CardDescription>{user.phone}</CardDescription>
              </p>
              <p className="flex items-center mb-2">
                <span className=" mr-2">City:</span>
                <CardDescription>{user.city}</CardDescription>
              </p>

              <p className="flex items-center mb-2">
                <span className=" mr-2">State:</span>
                <CardDescription>{user.state}</CardDescription>
              </p>
              <p className="flex items-center mb-2">
                <span className=" mr-2">Country:</span>
                <CardDescription>{user.country}</CardDescription>
              </p>
              <p className="flex items-center mb-2">
                <span className="mr-2">Zip Code:</span>
                <CardDescription>{user.zipCode}</CardDescription>
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
}
