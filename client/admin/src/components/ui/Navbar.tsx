import React from "react";
import { ThemeChanger } from "./theme";
import { Button } from "./button";
import { Bell, LogOut, User2 } from "lucide-react";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="h-[10vh] sticky top-0 right-0 flex justify-end items-center mr-4 pr-4">
      <Button variant="outline">
        <Bell size={20} />
      </Button>
      {/* 
      <Link
        className="ml-4 text-xl    hover:bg-[#f3f3f3] hover:rounded-md "
        href="/app/profile"
      >
        <Button variant="outline">
          <User2 size={20} />
        </Button>
      </Link> */}

      <div className="cursor-pointer bg-muted text-lg rounded-md ml-4">
        <ThemeChanger />
      </div>

      <Button variant="ghost" className="ml-4 bg-red-600">
        <LogOut size={20} className="mr-2" />
        Logout
      </Button>
    </div>
  );
};

export default Navbar;
