import TierComponent from "@/components/Tier/TierComponents";
import React from "react";

const Page = () => {
  return (
    <div className="rounded-md ml-5 mt-4 mr-5">
      <div className="flex justify-center items-center rounded-md p-6 dark:bg-[#272F3C]">
        <div className="text-center space-y-3 max-w-lg">
          <h1 className="font-bold text-4xl dark:text-white">
            Pick the Perfect <span className="">Pricing Plan</span>
          </h1>
          <p className="text-sm text-gray-400">
            Just starting your journey? We have the best plan for you.
          </p>
          <button className="bg-blue-800 p-2 text-white mt-5 rounded-md w-32">
            Try Now
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-3 mr-3 mt-5 max-w-screen-lg w-full mx-auto">
          {/* Silver */}
          <div className="dark:bg-[#272F3C] dark:text-white rounded-md shadow-2xl p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex justify-center">
                Silver
              </h2>
              <div>
                <h5 className="font-bold text-sm">Complimentary Room Upgrades</h5>
                <p className="text-sm">
                  We believe in making your experience exceptional. As a Silver
                  member, you'll receive complimentary upgrades to higher room
                  categories, allowing you to indulge in more luxurious
                  accommodations during your stay.
                </p>
              </div>
              <div className="mt-4">
                <h5 className="font-bold text-sm">
                  Early Check-in and Late Check-out
                </h5>
                <p className="text-sm">
                  We understand the importance of flexibility. Enjoy the
                  convenience of early check-in and late check-out, subject to
                  availability, so you can make the most of your time at our
                  hotel.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-900 to-blue-400 flex justify-center">
              <button className=" text-white py-2 px-4 rounded-md">$40</button>
            </div>
          </div>

          {/* Gold */}
          <div className="dark:bg-[#272F3C] dark:text-white rounded-md shadow-md p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex justify-center">
                Gold
              </h2>
              <div>
                <h5 className="font-bold text-sm">All Silver Tier Benefits</h5>
                <p className="text-sm">
                  You'll continue to enjoy all the privileges of the Silver Tier.
                </p>
              </div>
              <div className="mt-4">
                <h5 className="font-bold text-sm">Guaranteed Availability</h5>
                <p className="text-sm">
                  Never worry about room availability again. As a Gold member, we
                  guarantee a room for you, even during our busiest periods.
                  Simply make a reservation in advance, and your room will be
                  ready upon arrival.
                </p>
              </div>
              <div className="mt-4">
                <h5 className="font-bold text-sm">
                  Exclusive Access to the Executive Lounge
                </h5>
                <p className="text-sm">
                  Unwind in style at our exclusive executive lounge, reserved
                  solely for Gold members. Enjoy complimentary refreshments,
                  snacks, and a tranquil atmosphere perfect for work or
                  relaxation.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r mt-2 from-blue-900 to-blue-400 flex justify-center">
              <button className=" text-white py-2 px-4 rounded-md">$100</button>
            </div>
          </div>

          {/* Platinum */}
          <div className="dark:bg-[#272F3C] dark:text-white rounded-md shadow-md p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4 flex justify-center">
                Platinum
              </h2>
              <div>
                <h5 className="font-bold text-sm">
                  All Silver and Gold Tier Benefits
                </h5>
                <p className="text-sm">
                  As a Platinum member, you'll receive all the benefits and
                  privileges of both the Silver and Gold tiers.
                </p>
              </div>
              <div className="mt-4">
                <h5 className="font-bold text-sm">
                  Personalized Concierge Service
                </h5>
                <p className="text-sm">
                  Our dedicated concierge team is at your service round the clock.
                  From arranging transportation and making reservations to
                  providing insider tips and recommendations, our concierge will
                  ensure every aspect of your stay exceeds your expectations.
                </p>
              </div>
              <div className="mt-4">
                <h5 className="font-bold text-sm">Complimentary Spa Treatment</h5>
                <p className="text-sm">
                  Indulge in a luxurious spa treatment on us. Enjoy a relaxing
                  massage, rejuvenating facial, or other pampering services to
                  unwind and rejuvenate during your stay.
                </p>
              </div>
              <div className="mt-4">
                <h5 className="font-bold text-sm">VIP Airport Transfers</h5>
                <p className="text-sm">
                  Begin and end your journey in ultimate comfort with
                  complimentary VIP airport transfers. Our chauffeur will meet you
                  at the airport, ensuring a seamless transition from your flight
                  to our hotel.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-900 mt-5 to-blue-400 flex justify-center">
              <button className=" text-white py-2 px-4 rounded-md">$150</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <TierComponent points={20} />
      </div>
    </div>
  );
};

export default Page;
