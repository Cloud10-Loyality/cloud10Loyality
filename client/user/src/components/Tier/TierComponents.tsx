import React from "react";

interface TierComponentProps {
  points: number;
}

const TierComponent: React.FC<TierComponentProps> = ({ points }) => {
  let tier = "";

  if (points >= 70) {
    tier = "Platinum";
  } else if (points >= 40) {
    tier = "Gold";
  } else if (points >= 10) {
    tier = "Silver";
  }

  const progressPercentage = Math.min((points / 100) * 100, 100); // Calculate progress percentage

  const getTierStyle = (currentTier: string) => {
    return {
      fontWeight: tier === currentTier ? "bold" : "normal",
      color: tier === currentTier ? "gold" : "inherit",
    };
  };

  const renderGlowingDots = () => {
    const dots = [];
    for (let i = 10; i <= 100; i += 10) {
      const dotStyle = {
        display: progressPercentage >= i ? "block" : "none",
      };
      dots.push(<div key={i} className="glowing-dot" style={dotStyle} />);
    }
    return dots;
  };

  return (
    <div className="flex flex-col items-center justify-center h-32 min-w-min p-5 my-5 ml-4 mr-12 dark:bg-[#33383e] dark:text-white bg-gray-300 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <span className={`text-2xl font-bold ${getTierStyle("Silver").color}`}>
          Silver
        </span>
        <span className={`text-2xl mx-2 ${getTierStyle("Gold").color}`}>
          Gold
        </span>
        <span className={`text-2xl ${getTierStyle("Platinum").color}`}>
          Platinum
        </span>
      </div>
      <div className="w-full h-4 rounded-l-xl rounded-r-xl bg-white relative">
        <div
          className="h-full rounded-l-xl bg-[#C77930]"
          style={{ width: `${progressPercentage}%` }}
        >
          {renderGlowingDots()}
        </div>
      </div>
      <span className="text-2xl font-bold">{tier}</span>
    </div>
  );
};

export default TierComponent;
