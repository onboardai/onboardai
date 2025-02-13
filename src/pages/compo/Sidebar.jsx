import React from "react";
import {
  Home,
  MessageSquare,
  Users,
  Search,
  Building2,
  FileEdit,
  User,
  Settings,
  HelpCircle,
  X,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import Cookies from "js-cookie";

const NavItem = ({ icon: Icon, label, badge, isActive, add }) => {
  return (
    <Link
      to={add}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
        isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="flex-grow">{label}</span>
      {/* {badge && (
      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
        {badge}
      </span>
    )} */}
    </Link>
  );
};

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("boToken");
    Cookies.remove("boToken")
    navigate("/booraa");
  };

  return (
    <aside className="w-[280px] bg-white h-screen flex flex-col border-r border-gray-200">
      {/* Logo and Close Button */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            className="w-10 h-10 rounded-full flex items-center justify-center"
          />
          <span className="font-bold text-xl">Onboarded AI</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <NavItem
          add={"/bo/dashboard"}
          icon={Home}
          label="Dashboard"
          isActive={location.pathname === "/bo/dashboard"}
        />
        <NavItem
          add={"/bo/dashboard/chat"}
          icon={MessageSquare}
          label="Chats"
          badge={1}
          isActive={location.pathname === "/bo/dashboard/chat"}
        />
        <NavItem
          add={"/bo/dashboard/search-agents"}
          icon={Search}
          label="Find AI Agents"
          isActive={location.pathname === "/bo/dashboard/search-agents"}
        />
        <NavItem
          add={"/bo/dashboard/profile"}
          icon={User}
          label="My Profile"
          isActive={location.pathname === "/bo/dashboard/profile"}
        />
      </nav>

      {/* Settings Section */}
      <div className="px-2 py-4 border-t border-gray-200">
        <div className="text-xs font-semibold text-gray-500 px-4 mb-2">
          SETTINGS
        </div>
        {/* <NavItem icon={Settings} label="Settings" onClick={onClose} />
        <NavItem icon={HelpCircle} label="Help Center" onClick={onClose} /> */}
        <Link
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-100`}
        >
          <LogOut className="w-5 h-5" />
          <span className="flex-grow">Log Out</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
