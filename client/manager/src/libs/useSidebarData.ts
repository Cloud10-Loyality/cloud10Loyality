import {
  Analytics,
  App,
  Bookings,
  Campaign,
  Home,
  Settings,
  Users,
} from "@/components/ui/icons";

export type SidebarItem = {
  name: string;
  icon: JSX.Element;
  href: string;
};

export const useSidebarData = (): SidebarItem[] => {
  return [
    {
      name: "Dashboard",
      icon: Home(),
      href: "/app",
    },
    {
      name: "Campaign",
      icon: Campaign(),
      href: "/app/campaign",
    },
    {
      name: "Analytics",
      icon: Analytics(),
      href: "/app/analytics",
    },
    {
      name: "Users",
      icon: Users(),
      href: "/app/users",
    },
    {
      name: "Bookings",
      icon: Bookings(),
      href: "/app/bookings",
    },
    {
      name: "Settings",
      icon: Settings(),
      href: "/app/settings",
    },
  ];
};
