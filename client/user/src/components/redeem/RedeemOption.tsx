"use client";

import React, { useState, useEffect } from "react";

interface RedemptionOptionsProps {
  options: string[];
  selectedReward: string | null;
  onRedeem: (option: string) => void;
}

const RedemptionOptions: React.FC<RedemptionOptionsProps> = ({
  options,
  selectedReward,
  onRedeem,
}) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleRedeem = (option: string) => {
    onRedeem(option);
    setShowMessage(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showMessage) {
      timer = setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [showMessage]);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold">Redemption Options:</h2>
      {selectedReward && (
        <ul className="pl-6">
          {options.map((option, index) => (
            <li key={index} className="text-lg">
              {selectedReward === option && (
                <div>
                  <span className="text-blue-500">{option}</span>
                  <button
                    className="ml-3 px-3 py-1 mt-2 bg-blue-500 text-white rounded"
                    onClick={() => handleRedeem(option)}
                  >
                    Redeem
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      {showMessage && (
        <div className="bg-green-500 text-white py-2 px-4 rounded mt-4">
          Redemption successful!
        </div>
      )}
    </div>
  );
};

export default RedemptionOptions;
