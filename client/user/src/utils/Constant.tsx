// menuData.ts

import {
  History,
  Home,
  Points,
  Redemption,
  Referal,
  TierBenifits,
} from "@/components/ui/icons";

export const menuData = [
  {
    id: 1,
    icon: <Home />,
    label: "Home",
    link: "/",
  },
  {
    id: 2,
    icon: <Points />,
    label: "Point Summary",
    link: "/point-summary",
  },
  {
    id: 3,
    icon: <History />,
    label: "Stay History",
    link: "/stay-history",
  },
  {
    id: 4,
    icon: <TierBenifits />,
    label: "Tier Benifits",
    link: "/tier-benifits",
  },
  {
    id: 5,
    icon: <Redemption />,
    label: "Points Redemption",
    link: "/points-redemption",
  },
  {
    id: 6,
    icon: <Referal />,
    label: "Referal Programs",
    link: "/referal-programs",
  },
];
