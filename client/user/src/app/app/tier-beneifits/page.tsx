import TierComponent from "@/components/Tier/TierComponents";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="bg-white rounded-md ml-5 mt-4 mr-5">
      <div className="flex justify-center items-center p-6">
        <div className="text-center space-y-3 ">
          <h1 className="font-bold text-[40px]">
            pick the perfect <span className="text-blue-700">pricing plan</span>
          </h1>
          <p className="text-sm text-gray-400">
            Just starting your journey? We have the best plan for you.
          </p>
          <button className="bg-blue-800 p-2 text-white mt-5 rounded-md w-[90px]">
            Try Now
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-3 mr-3 mt-5 max-w-screen-lg mx-auto">
        <div className="bg-white rounded-md shadow-2xl p-4">
          <h2 className="text-xl font-bold mb-2">Silver</h2>
          <p>
            <span>Complimentary room upgrades:</span> We believe in making your
            experience exceptional. As a Silver member, you'll receive
            complimentary upgrades to higher room categories, allowing you to
            indulge in more luxurious accommodations during your stay.
          </p>
          <p>
            <span className="text-blue-600">
              Early check-in and late check-out
            </span>
            <br />
            We understand the importance of flexibility. Enjoy the convenience
            of early check-in and late check-out, subject to availability, so
            you can make the most of your time at our hotel.
          </p>
        </div>
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-xl font-bold mb-2">Gold</h2>
          <p>
            All Silver Tier benefits: You'll continue to enjoy all the
            privileges of the Silver Tier.
          </p>
          <p>
            Guaranteed availability: Never worry about room availability again.
            As a Gold member, we guarantee a room for you, even during our
            busiest periods. Simply make a reservation in advance, and your room
            will be ready upon arrival.
          </p>
          <p>
            Exclusive access to the executive lounge: Unwind in style at our
            exclusive executive lounge, reserved solely for Gold members. Enjoy
            complimentary refreshments, snacks, and a tranquil atmosphere
            perfect for work or relaxation.
          </p>
        </div>
        <div className="bg-white rounded-md shadow-md p-4">
          <h2 className="text-xl font-bold mb-2">Platinum</h2>
          <p>
            <span>All Silver and Gold Tier benefits</span>
            As a Platinum member, you'll receive all the benefits and privileges
            of both the Silver and Gold tiers.
          </p>
          <p>
            <span>Personalized concierge service</span>
            Our dedicated concierge team is at your service round the clock.
            From arranging transportation and making reservations to providing
            insider tips and recommendations, our concierge will ensure every
            aspect of your stay exceeds your expectations.
          </p>
          <p>
            <span> Complimentary spa treatment</span>
            Indulge in a luxurious spa treatment on us. Enjoy a relaxing
            massage, rejuvenating facial, or other pampering services to unwind
            and rejuvenate during your stay.
          </p>
          <p>
            <span>VIP airport transfers</span>
            Begin and end your journey in ultimate comfort with complimentary
            VIP airport transfers. Our chauffeur will meet you at the airport,
            ensuring a seamless transition from your flight to our hotel.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <TierComponent points={60} />
      </div>
    </div>
  );
};

export default Page;
