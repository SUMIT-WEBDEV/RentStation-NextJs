"use client"

import Image from "next/image";
import React from "react";
// import profile from "../../assets/profileEmail.jpg";
import profile from "../assets/profileEmail.jpg"
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import PaymentIcon from "@mui/icons-material/Payment";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";
import HelpIcon from "@mui/icons-material/Help";
import PublicIcon from "@mui/icons-material/Public";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";
import useSidebarStore from "@/store/toggle-sidebar";

interface SidebarProps {
  onClose: () => void;
}

const menuItems = [
  { icon: <FavoriteIcon fontSize="medium" />, text: "Favorites" },
  { icon: <ShoppingCartIcon fontSize="medium" />, text: "Saved" },
  { icon: <EditIcon fontSize="medium" />, text: "Edit Profile" },
  { icon: <PaymentIcon fontSize="medium" />, text: "My Transactions" },
  { icon: <LanguageIcon fontSize="medium" />, text: "Change Language" },
  { icon: <HelpIcon fontSize="medium" />, text: "Notifications" },
  { icon: <MoreHorizIcon fontSize="medium" />, text: "Others" },
  { icon: <PrivacyTipIcon fontSize="medium" />, text: "Privacy Policy" },
  // { icon: <ExitToAppIcon fontSize="medium" />, text: "Sign Out" },
];


const Sidebar = () => {

  const user = useCurrentUser()
  const userImage = user?.image
  // console.log("user is", user)
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();



  const handleLogOut = () => {
    logout()
  }


  return (
    <>
      <div className={`fixed top-0 right-0 h-full bg-black text-white p-4 lg:w-3/12 w-full shadow-2xl transform translate-x-0 transition-transform duration-500 ease-in-out z-50 ${isSidebarOpen ? "-translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-start">
          <button onClick={toggleSidebar} className="text-white cursor-pointer">
            <CloseIcon className="text-3xl" />
          </button>
        </div>
        <br />

        <div className="flex justify-between mb-10">
          <div>
            <p className="font-bold text-xl">Sumit Sahu</p>
            <p className="text-sm text-gray-50">Manage profile and setting</p>
          </div>
          {
            userImage ?
              <Image src={userImage} alt="" height={50} width={50} className="rounded-full" />
              :
              <div className="w-12 h-12" />
          }
        </div>

        <ul className="mt-4 flex flex-col lg:gap-6 gap-4 text-gray-200">
          {menuItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2 cursor-pointer">
              {item.icon}
              <span className="text-sm">{item.text}</span>
            </li>
          ))}
          <li className="flex items-center gap-2 cursor-pointer" onClick={handleLogOut}>
            <ExitToAppIcon fontSize="medium" />
            <span className="text-sm">Sign Out</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
