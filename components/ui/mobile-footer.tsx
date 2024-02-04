"use client";

// MobileFooter.tsx
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import SellIcon from "@mui/icons-material/Sell";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Sidebar from "@/app/(dashboard)/_components/account-sidebar";
import { useRouter } from "next/navigation";

interface MenuItem {
  icon: React.ReactNode;
  text: string;
}

const menuItems: MenuItem[] = [
  { icon: <HomeIcon fontSize="small" />, text: "Home" },
  { icon: <ChatIcon fontSize="small" />, text: "Chats" },
  { icon: <SellIcon fontSize="small" />, text: "Sell" },
  { icon: <ListAltIcon fontSize="small" />, text: "My Ads" },
  { icon: <AccountCircleIcon fontSize="small" />, text: "Account" },
];

const MobileFooter: React.FC = () => {
  const router = useRouter();

  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleItemClick = (index: number) => {
    setActiveItem(index);
    if (index === 4) {
      setIsSidebarOpen(true);
    }
    if (index === 2) {
      router.push("/settings/sell");
    }
    if (index === 0) {
      router.push("/settings");
    }
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className="lg:hidden fixed bottom-0 w-full bg-gray-800 text-white p-4 z-10">
        <ul className="flex justify-between text-xs text-gray-200">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex flex-col items-center cursor-pointer gap-0.5 ${
                activeItem === index ? "text-yellow-500" : ""
              }`}
              onClick={() => handleItemClick(index)}
            >
              {item.icon}
              {item.text}
            </li>
          ))}
        </ul>
      </div>

      {isSidebarOpen && <Sidebar onClose={handleCloseSidebar} />}
    </>
  );
};

export default MobileFooter;
