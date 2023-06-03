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

  return (
    <div className="flex items-center justify-center h-20 w-40 bg-gray-300 rounded-lg shadow">
      <span className="text-2xl font-bold">{tier}</span>
    </div>
  );
};

export default TierComponent;