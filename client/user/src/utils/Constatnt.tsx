// menuData.ts
import { CgProfile } from "react-icons/cg";
import { BiCoinStack } from "react-icons/bi";
import { AiOutlineHistory } from "react-icons/ai";
import { RiShieldStarLine, RiHandCoinFill } from "react-icons/ri";
import { TbHeartHandshake } from "react-icons/tb";

export const menuData = [
  {
    id: 1,
    icon: <CgProfile />,
    label: "User Profile",
    link: "/",
  },
  {
    id: 2,
    icon: <BiCoinStack />,
    label: "Point Summary",
    link: "/point-summary",
  },
  {
    id: 3,
    icon: <AiOutlineHistory />,
    label: "Stay History",
    link: "/services",
  },
  {
    id: 4,
    icon: <RiShieldStarLine />,
    label: "Tier Benifits",
    link: "/services",
  },
  {
    id: 5,
    icon: <RiHandCoinFill />,
    label: "Points Redemption",
    link: "/services",
  },
  {
    id: 6,
    icon: <TbHeartHandshake />,
    label: "Referal Programs",
    link: "/services",
  },
];
