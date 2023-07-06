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
    icon: <LayoutGrid size={20} />,
    label: "Home",
    link: "/app",
  },
  {
    id: 2,
    icon: <KanbanSquare size={20} />,
    label: "Point Summary",
    link: "/app/point-summary",
    disabled: true,
  },
  {
    id: 3,
    icon: <GalleryVerticalEnd size={20} />,
    label: "Stay History",
    link: "/app/stay-history",
  },
  {
    id: 4,
    icon: <Boxes size={20} />,
    label: "Tier Beneifits",
    link: "/app/tier-beneifits",
    disabled: true,
  },
  {
    id: 5,
    icon: <PiggyBank size={20} />,
    label: "Points Redemption",
    link: "/app/points-redemption",
    disabled: true,
  },
  {
    id: 6,
    icon: <RefreshCcwDot size={20} />,
    label: "Referal Programs",
    link: "/app/referal-programs",
    disabled: true,
  },
];
