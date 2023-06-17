"use client";

import React, { useState, useEffect } from "react";
import PointsBalance from "../../../components/redeem/PointsBalance";
import RedemptionOptions from "../../../components/redeem/RedeemOption";
import RewardSelection from "../../../components/redeem/RewardSelection";

const LoyaltyProgramPage: React.FC = () => {
  const points = 1000;
  const redemptionOptions = ["Discount", "Free Upgrade", "Gift Card"];

  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [redemptionHistory, setRedemptionHistory] = useState<
    { option: string; timestamp: Date }[]
  >([]);

  const handleSelectReward = (reward: string) => {
    setSelectedReward(reward);
    setSelectedOption(null); // Deselect the option when a new reward is selected
  };

  const handleRedeem = (option: string) => {
    setSelectedOption(option);
    // Add  redemption logic here
    console.log(`Redeeming ${option}`);

    const newRedemption = { option, timestamp: new Date() };
    setRedemptionHistory((prevHistory) => [...prevHistory, newRedemption]);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (selectedOption) {
      timer = setTimeout(() => {
        setSelectedOption(null);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [selectedOption]);

  return (
    <div className="container mx-auto  dark:text-white p-4">
      <div className="flex justify-between  gap-2">
        {/* <h1 className="text-3xl font-bold mb-4">Loyalty Program</h1> */}
        <div className="box shadow p-4 flex-grow bg-white dark:bg-[#272F3C]">
          <PointsBalance points={points} />
        </div>
        <div className="box shadow p-4 flex-grow bg-white dark:bg-[#272F3C]">
          <RewardSelection
            rewards={redemptionOptions}
            selectedReward={selectedReward}
            onSelectReward={handleSelectReward}
          />
        </div>
        <div className="box shadow p-4 flex-grow bg-white dark:bg-[#272F3C]">
          <RedemptionOptions
            options={redemptionOptions}
            selectedReward={selectedReward}
            onRedeem={handleRedeem}
          />
        </div>
      </div>

      {selectedOption && (
        <div className="box shadow p-4 mt-4">
          <p className="text-green-500">Redemption Successful!</p>
          <p>Redeemed Option: {selectedOption}</p>
        </div>
      )}

      <h2 className="text-2xl font-bold mt-5">Redemption History</h2>
      <div className="box shadow p-4 mt-4 bg-white dark:bg-[#33383e]">
        {redemptionHistory.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Option</th>
                <th className="text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {redemptionHistory.map((redemption, index) => (
                <tr key={index}>
                  <td className="text-left">{redemption.option}</td>
                  <td className="text-left">
                    {redemption.timestamp.toString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No redemption history yet.</p>
        )}
      </div>
    </div>
  );
};

export default LoyaltyProgramPage;
