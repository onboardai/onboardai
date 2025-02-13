import React, { useState } from 'react';
import { HiMiniHome } from "react-icons/hi2";
import { PiChatsFill } from "react-icons/pi";
import { IoIosListBox } from "react-icons/io";
import { IoSearch, IoDocumentTextOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { CiLogout } from "react-icons/ci";

import OnAI2 from "../../images/logo.png"

const AASidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-full mb-5">
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded focus:outline-none"
      >
        {menuOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>


      {/* Sidebar */}
      <div className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} 
      fixed top-0 left-0 h-full w-64 text-white transition-transform duration-300 z-40 md:translate-x-0 md:static md:flex`}>
        <div className="flex flex-col h-full w-full bg-blue-950">
           
          {/* Logo */}
          <div className="h-16 mt-4 flex items-center px-3">
            <img src={OnAI2} className=" w-12 h-12" alt="OnboardAI" />
          </div>

          {/* Sidebar Menu */}
          <div className="flex-1 overflow-y-auto px-4 ">
            <nav className="flex flex-col gap-5 mt-2">
              
              <a href="#" className="flex items-center p-2 font-raleway text-gray-200 hover:bg-gray-800 hover:text-blue-500 rounded">
                <HiMiniHome className="h-8 w-6 mr-2" />
                <span className="font-normal">Dashboard</span>
              </a>

              <a href="#" className="flex items-center p-2 font-raleway text-gray-100 hover:bg-gray-700 rounded">
                <PiChatsFill className="h-6 w-6 mr-2" />
                <span className="font-normal">Chats</span>
              </a>

              <a href="#" className="flex items-center p-2 font-raleway text-gray-100 hover:bg-gray-700 rounded">
                <IoSearch className="h-6 w-6 mr-2" />
                <span className="font-normal">Find Business Clients</span>
              </a>

              <a href="#" className="flex items-center p-2 font-raleway text-gray-100 hover:bg-gray-700 rounded">
                <IoIosListBox className="h-6 w-6 mr-2" />
                <span className="font-normal">My Clients</span>
              </a>

              <a href="#" className="flex items-center p-2 font-raleway text-gray-100 hover:bg-gray-700 rounded">
                <FiEdit className="h-6 w-6 mr-2" />
                <span className="font-normal">Post AI Agent</span>
              </a>

              <a href="#" className="flex items-center p-2 font-raleway text-gray-100 hover:bg-gray-700 pb-5 border-b-2 border-gray-600">
                <FaRegUser className="h-6 w-6 mr-2" />
                <span className="font-normal">My Profile</span>
              </a>

              {/* Settings & Help */}
              <span className="p-1 font-montserrat text-slate-300 text-sm">Settings & Help</span>

              <a href="#" className="flex items-center p-2 font-raleway text-gray-100 hover:bg-gray-700">
                <MdOutlineSettings className="h-6 w-6 mr-2" />
                <span className="font-normal">Settings</span>
              </a>

              <a href="#" className="flex items-center p-2 font-raleway text-gray-100 hover:bg-gray-700">
                <IoDocumentTextOutline className="h-6 w-6 mr-2" />
                <span className="font-normal">Documentation</span>
              </a>

              <a href="#" className="flex items-center p-2 font-raleway text-gray-100 hover:bg-gray-700 pb-5 border-b-2 border-gray-600">
                <RxQuestionMarkCircled className="h-6 w-6 mr-2" />
                <span className="font-normal">Help Center</span>
              </a>

            </nav>
          </div>

          {/* Sign Out Section (Now Fixed at Bottom) */}
          <a href="#" className="mt-auto mb-4 flex items-center p-2 font-raleway text-gray-100 hover:bg-gray-700 border-t-2 border-gray-600">
            <CiLogout className="h-6 w-6 mr-2" />
            <span className="font-normal">Sign out</span>
          </a>

        </div>
      </div>
    </div>
  );
};

export default AASidebar;
