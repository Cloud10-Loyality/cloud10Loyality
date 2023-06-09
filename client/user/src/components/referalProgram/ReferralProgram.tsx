"use client";
import React, { useState } from "react";
import { EmailShareButton, FacebookShareButton } from "react-share";

interface ReferralPoints {
  name: string;
  claimedBy: string;
}

const ReferralProgramPage: React.FC = () => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralPoints, setReferralPoints] = useState<ReferralPoints[]>([]);

  const generateReferralCode = () => {
    const code = generateUniqueCode();
    setReferralCode(code);
  };

  const shareReferralCode = () => {
    const emailBody = `Join me at the hotel and use my referral code: ${referralCode}`;
    window.location.href = `mailto:?subject=Join me at the hotel&body=${encodeURIComponent(
      emailBody
    )}`;
  };

  const generateUniqueCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const codeLength = 6;
    let code = "";
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  };

  const claimReferralCode = (referralCode: string) => {
    const referredGuest = "John Doe"; // Replace with the actual referred guest
    const referralReward = "10% off"; // Replace with the actual referral reward
    const referralPoint: ReferralPoints = {
      name: referralCode,
      claimedBy: referredGuest,
    };
    setReferralPoints([...referralPoints, referralPoint]);
    alert(
      `${referredGuest} claimed your referral code. You earned ${referralReward} reward!`
    );
  };

  return (
    <div className=" ml-3 mx-auto p-4 dark:text-white">
      {/* <h1 className="text-3xl font-bold mb-4">Referral Program</h1> */}
      <div className="box shadow p-8 bg-white max-w-max dark:bg-[#33383e] ">
        <h2 className="text-2xl font-bold">Your Referral Code</h2>
        {referralCode ? (
          <p className="mb-4 mt-2 text-gray-400">{referralCode}</p>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={generateReferralCode}
          >
            Generate Referral Code
          </button>
        )}
        {referralCode && (
          <>
            <h3>Share on</h3>
            <div className="flex flex-row mt-4 space-x-5">
              <div className=" bg-blue-500 max-w-max text-white px-4 py-2 rounded">
                <EmailShareButton
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  subject="Join me at the hotel"
                  body={`Join me at the hotel and use my referral code: ${referralCode}`}
                  url={"www.cloud10.com"}
                >
                  Email
                </EmailShareButton>
              </div>

              <div className=" bg-blue-500 max-w-max text-white px-4 py-2 rounded">
                <FacebookShareButton
                  quote={`Join me at the hotel and use my referral code: ${referralCode}`}
                  url={"www.cloud10.com"}
                >
                  Facebook
                </FacebookShareButton>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Referral Points</h2>
        {referralPoints.length > 0 ? (
          <ul className="list-disc pl-6 mt-4">
            {referralPoints.map((referral, index) => (
              <li
                key={index}
              >{`${referral.name} claimed by ${referral.claimedBy}`}</li>
            ))}
          </ul>
        ) : (
          <p>No referral points earned yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReferralProgramPage;
