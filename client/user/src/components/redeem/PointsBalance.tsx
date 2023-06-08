import React from "react";

interface LoyaltyPointsBalanceProps {
  points: number;
}

const LoyaltyPointsBalance: React.FC<LoyaltyPointsBalanceProps> = ({
  points,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold">Loyalty Points Balance:</h2>
      <p className="text-xl">{points} points</p>
    </div>
  );
};

export default LoyaltyPointsBalance;
