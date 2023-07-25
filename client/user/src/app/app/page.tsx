import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleDotDashed, CheckCheck, Award } from "lucide-react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className=" font-light h-full">
      <div className="flex flex-row  ml-3">
        <Card className="w-[25%] bg-[#0072f5] border-none text-white rounded-xl drop-shadow-xl">
          <CardHeader>
            <CardTitle>Total Spending</CardTitle>
            <CardDescription>{"totalSpending"}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-md space-y-3">
              <li className="flex place-content-between gap-x-8 ">
                <h4>Avg Booking Value</h4>
                <span>{""}</span>
              </li>
              <li className="flex place-content-between">
                <h4>Bookings</h4>
                <span>{""}</span>
              </li>
              <li className="flex place-content-between gap-x-8">
                <h4>Last booking</h4>
                <span>{""}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="w-[25%] ml-8 bg-[#16181a] border-none text-white rounded-xl drop-shadow-xl">
          <CardHeader>
            <CardTitle>Active Points</CardTitle>
            <CardDescription>{"points"}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-md space-y-3">
              <li className="flex place-content-between gap-4 ">
                <h4>Pending point</h4>
                <span>0</span>
              </li>
              <li className="flex place-content-between">
                <h4>Used points</h4>
                <span>0</span>
              </li>
              <li className="flex place-content-between">
                <h4>Expired points</h4>
                <span>0</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="w-[25%] ml-8 bg-[#17c964] border-none text-white rounded-xl drop-shadow-xl">
          <CardHeader>
            <CardTitle>Current Tier</CardTitle>
            <CardDescription>Silver</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-md space-y-3">
              <li className="flex place-content-between gap-4 ">
                <h4>Points to the next tier</h4>
                <span>21</span>
              </li>
              <li className="flex place-content-between">
                <h4>Tier promotion date</h4>
                <span>20 aug 2024</span>
              </li>
              <li className="flex place-content-between">
                <h4>Tier reset date</h4>
                <span>19 jan 2024</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
