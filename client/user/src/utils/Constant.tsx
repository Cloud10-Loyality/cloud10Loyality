// menuData.ts
import { CgProfile } from "react-icons/cg";
import { BiCoinStack } from "react-icons/bi";
import { AiOutlineHistory, AiOutlineHome } from "react-icons/ai";
import { RiShieldStarLine, RiHandCoinFill } from "react-icons/ri";
import { TbHeartHandshake } from "react-icons/tb";

export const menuData = [
  {
    id: 1,
    icon: <AiOutlineHome />,
    label: "Home",
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
    link: "/stay-history",
  },
  {
    id: 4,
    icon: <RiShieldStarLine />,
    label: "Tier Benifits",
    link: "/tier-benifits",
  },
  {
    id: 5,
    icon: <RiHandCoinFill />,
    label: "Points Redemption",
    link: "/points-redemption",
  },
  {
    id: 6,
    icon: <TbHeartHandshake />,
    label: "Referal Programs",
    link: "/referal-programs",
  },
];
