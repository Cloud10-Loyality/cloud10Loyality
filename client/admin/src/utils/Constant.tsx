// menuData.ts

import {
  Boxes,
  GalleryVerticalEnd,
  KanbanSquare,
  LayoutGrid,
  PiggyBank,
  RefreshCcwDot,
  BadgeDollarSign,
  Settings2,
  LineChart,
  Coins,
  Plug2,
  Layers,
  User2,
  HelpCircle,
  LayoutDashboard,
  Code,
  ChevronRightSquare,
} from "lucide-react";

export const menuData = [
  {
    id: 1,
    icon: <LayoutDashboard size={20} />,
    label: "Dashboard",
    subMenu: [
      {
        id: 1,
        icon: <LayoutGrid size={15} />,
        label: "Home",
        link: "/app",
      },
      {
        id: 2,
        icon: <BadgeDollarSign size={15} />,
        label: "Marketplace",
        link: "/app/marketplace",
        disabled: true,
      },
      {
        id: 3,
        icon: <Settings2 size={15} />,
        label: "Set up",
        link: "/app/stay-history",
      },
      {
        id: 4,
        icon: <LineChart size={15} />,
        label: "Analytics",
        link: "/app/tier-benefits",
        disabled: true,
      },
      {
        id: 5,
        icon: <Coins size={15} />,
        label: "NFT",
        link: "/app/nft",
        disabled: true,
      },
    ],
  },
  {
    id: 2,
    icon: <Code size={20} />,
    label: "Developer",
    subMenu: [
      {
        id: 1,
        icon: <Plug2 size={15} />,
        label: "Integration",
        link: "/app/integration",
      },
      {
        id: 2,
        icon: <Layers size={15} />,
        label: "Extensions",
        link: "/app/extensions",
      },
    ],
  },
  {
    id: 3,
    icon: <ChevronRightSquare size={20} />,
    label: "More",
    subMenu: [
      {
        id: 1,
        icon: <User2 size={15} />,
        label: "Admin",
        link: "/app/admin",
      },
      {
        id: 2,
        icon: <HelpCircle size={15} />,
        label: "Help Center",
        link: "/app/help-center",
      },
    ],
  },
];

export const loginFields: Array<{
  labelText: string;
  labelFor: string;
  id: any;
  name: string;
  type: string;
  autoComplete: string;
  isRequired: boolean;
  placeholder: string;
  value: string;
}> = [
  {
    labelText: "Email address",
    labelFor: "email-address",
    id: "email-address",
    name: "email",
    type: "email",
    autoComplete: "email",
    isRequired: true,
    placeholder: "Email address",
    value: "",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Password",
    value: "",
  },
];
