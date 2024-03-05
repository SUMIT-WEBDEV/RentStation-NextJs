"use client";

// MobileFooter.tsx
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import SellIcon from "@mui/icons-material/Sell";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import Sidebar from "@/app/(dashboard)/_components/account-sidebar";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/_components/account-sidebar";
import useSidebarStore from "@/store/toggle-sidebar";
import Link from "next/link";

interface MenuItem {
  icon: React.ReactNode;
  text: string;
  route: string;
}

const menuItems: MenuItem[] = [
  { icon: <HomeIcon fontSize="small" />, text: "Home", route: "/" },
  { icon: <ChatIcon fontSize="small" />, text: "Chats", route: "/chat" },
  { icon: <SellIcon fontSize="small" />, text: "Sell", route: "/sell" },
  { icon: <ListAltIcon fontSize="small" />, text: "My Ads", route: "/myads" },
];
// { icon: <AccountCircleIcon fontSize="small" />, text: "Account" },

const MobileFooter: React.FC = () => {
  const router = useRouter();

  const [activeItem, setActiveItem] = useState<number | null>(null);

  const { toggleSidebar } = useSidebarStore();


  const handleItemClick = (index: number) => {
    setActiveItem(index);
    // if (index === 4) {
    //   toggleSidebar();
    // }
    // if (index === 2) {
    //   router.push("/sell");
    // }
    // if (index === 0) {
    //   router.push("/");
    // }
    // if (index === 0) {
    //   router.push("/chat");
    // }
  };


  return (
    <>
      <div className="lg:hidden fixed bottom-0 w-full bg-gray-800 text-white p-4 z-10">
        <ul className="flex justify-between text-xs text-gray-200">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              className={`flex flex-col items-center cursor-pointer gap-0.5 ${activeItem === index ? "text-yellow-500" : ""
                }`}
              href={`${item.route}`}
              onClick={() => handleItemClick(index)}
            >
              {item.icon}
              {item.text}
            </Link>
          ))}

          <li
            className={`flex flex-col items-center cursor-pointer gap-0.5 ${activeItem === 4 ? "text-yellow-500" : ""
              }`}
            onClick={toggleSidebar}
          >
            <AccountCircleIcon fontSize="small" />
            <p>
              Account
            </p>
          </li>


        </ul>


      </div>

    </>
  );
};

export default MobileFooter;
