import React from "react";

interface TierComponentProps {
  points: number;
}

const TierComponent: React.FC<TierComponentProps> = ({ points }) => {
  let tier = "";

  if (points >= 100) {
    tier = "Diamond";
  } else if (points >= 50) {
    tier = "Gold";
  } else if (points >= 10) {
    tier = "Silver";
  }

  const progressPercentage = Math.min((points / 100) * 100, 100); // Calculate progress percentage

  return (
    <div className="flex items-center justify-center h-20 w-[300px] bg-gray-300 rounded-lg shadow">
      <div className="w-full h-4 bg-blue-500">
        <div
          className="h-full bg-green-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <span className="text-2xl font-bold absolute">{tier}</span>
    </div>
  );
};

export default TierComponent;
