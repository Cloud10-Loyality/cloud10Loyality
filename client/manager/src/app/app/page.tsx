import Image, { StaticImageData } from "next/image";

import Link from "next/link";
import React from "react";
import benifits from "./../../../public/illustrations/benifit.png";
import earn from "./../../../public/illustrations/earn.png";
import game from "./../../../public/illustrations/game.png";
import tier from "./../../../public/illustrations/tier.png";

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <div>
      <div className="dark:bg-gray-800 flex justify-between bg-gray-200 py-6 border-white border border-opacity-25 px-4 rounded-lg">
        <h1 className="font-black text-2xl">
          Welcome to Cloud10 Loyalty Management System
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-10">
        {[
          {
            src: earn,
            title: "Earn & Burn",
            subTitle: ` Encourage repeat purchase and improve customer loyalty by
              introducing points-based loyalty program that rewards customers
              for specific behaviors.`,
          },
          {
            src: tier,
            title: "Tiered Loyality",
            subTitle: `Encourage customers to spend more by enticing them with`,
          },
          {
            src: game,
            title: "Gamified Loyality",
            subTitle: `Encourage customers to interact with your brand reguraly by`,
          },
          {
            src: benifits,
            title: "Loyality Benifits",
            subTitle: `Generate an emotional attachment a sense of belonginess to the brand`,
          },
        ]?.map(({ src, title, subTitle }) => (
          <HeroCard
            key={title}
            src={src}
            title={title}
            subTitle={subTitle}
            cta={"Learn More"}
          />
        ))}
      </div>
    </div>
  );
}

const HeroCard = ({
  src,
  title,
  subTitle,
  cta,
}: {
  src: StaticImageData;
  title: string;
  subTitle: string;
  cta: string;
}) => {
  return (
    <div className="dark:bg-gray-900 bg-slate-100 p-4 rounded-lg flex items-center gap-4 justify-between">
      <div className="aspect-square overflow-hidden rounded-full">
        <Image src={src} height={200} width={200} alt="This is the loyality" />
      </div>
      <div className="flex flex-col justify-between">
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <p className="text-sm mb-2">{subTitle}</p>
        <Link className="text-sm" href="#">
          {cta}
        </Link>
      </div>
    </div>
  );
};
