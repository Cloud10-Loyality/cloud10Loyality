// menuData.ts

import {
  Boxes,
  GalleryVerticalEnd,
  KanbanSquare,
  LayoutGrid,
  PiggyBank,
  RefreshCcwDot,
} from "lucide-react";
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
    icon: <LayoutGrid size={23} />,
    label: "Home",
    link: "/app",
  },
  {
    id: 2,
    icon: <KanbanSquare size={23} />,
    label: "Points",
    link: "/app/points",
  },
  {
    id: 3,
    icon: <GalleryVerticalEnd size={23} />,
    label: "Stay History",
    link: "/app/stay-history",
  },
  {
    id: 4,
    icon: <Boxes size={23} />,
    label: "Tier Beneifits",
    link: "/app/tier-beneifits",
    disabled: true,
  },
  {
    id: 5,
    icon: <PiggyBank size={23} />,
    label: "Points Redemption",
    link: "/app/points-redemption",
    disabled: true,
  },
  {
    id: 6,
    icon: <RefreshCcwDot size={23} />,
    label: "Referal Programs",
    link: "/app/referal-programs",
    disabled: true,
  },
];
