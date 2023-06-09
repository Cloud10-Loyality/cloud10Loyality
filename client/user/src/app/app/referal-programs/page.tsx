import RedemptionOptions from "@/components/redeem/RedeemOption";
import ReferralProgram from "@/components/referalProgram/ReferralProgram";
import React from "react";

type Props = {};

const Page: React.FC<Props> = (props) => {
  return (
    <div>
      <ReferralProgram />
    </div>
  );
};

export default Page;
