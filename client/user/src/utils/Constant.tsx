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
    link: "/app",
  },
  {
    id: 2,
    icon: <Points />,
    label: "Point Summary",
    link: "/app/point-summary",
  },
  {
    id: 3,
    icon: <History />,
    label: "Stay History",
    link: "/app/stay-history",
  },
  {
    id: 4,
    icon: <TierBenifits />,
    label: "Tier Beneifits",
    link: "/app/tier-beneifits",
  },
  {
    id: 5,
    icon: <Redemption />,
    label: "Points Redemption",
    link: "/app/points-redemption",
  },
  {
    id: 6,
    icon: <Referal />,
    label: "Referal Programs",
    link: "/app/referal-programs",
  },
];
