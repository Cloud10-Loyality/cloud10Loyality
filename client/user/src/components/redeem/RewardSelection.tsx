import React from "react";

interface RewardSelectionProps {
  rewards: string[];
  selectedReward: string | null;
  onSelectReward: (reward: string) => void;
}

const RewardSelection: React.FC<RewardSelectionProps> = ({
  rewards,
  selectedReward,
  onSelectReward,
}) => {
  const handleSelectReward = (reward: string) => {
    if (selectedReward === reward) {
      // onSelectReward(null); // Deselect the reward if it's already selected
    } else {
      onSelectReward(reward); // Select the reward
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Reward Selection:</h2>
      <ul className="list-disc pl-6">
        {rewards.map((reward, index) => (
          <li
            key={index}
            onClick={() => handleSelectReward(reward)}
            className={`text-lg cursor-pointer ${
              selectedReward === reward ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {reward}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RewardSelection;
