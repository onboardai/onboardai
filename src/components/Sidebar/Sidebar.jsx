import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import MenuItem from "./MenuItem";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { AdminMenus } from "../../constants";
import logo from "../../images/logo.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={` fixed left-0 top-0 h-full bg-[#B3DAFF] text-white transition-all z-50 flex flex-col duration-300 ${
        isOpen ? "w-44" : "w-16 items-center"
      }`}
    >
      {/* Sidebar Logo */}
      <div
        className="flex items-center justify-center
      py-4"
      >
        <img
          src={logo}
          alt="Onboard AI"
          className={`text-2xl text-blue-700 transition-all w-12 ${
            isOpen ? "w-12" : "w-8"
          }`}
        />
      </div>

      {/* Menu List */}
      <div className="mt-4 flex-1">
        {AdminMenus.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.src}
            name={item.title}
            isOpen={isOpen}
            isLogout={item.isLogout}
            path={item.path}
          />
        ))}
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="m-2 flex items-center justify-center 
        rounded-md bg-blue-500 p-3 text-2xl font-bold
        hover:bg-blue-800 duration-300"
      >
        {isOpen ? <RiArrowLeftWideFill /> : <RiArrowRightWideFill />}
      </button>
    </div>
  );
};

export default Sidebar;
