import React from "react";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <div
      className="flex items-center justify-between
    bg-white px-7 py-3 "
    >
      <h1 className="font-bold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <FaUser className="rounded-md bg-slate-200 p-2 text-4xl" />
          <h2 className="font-medium">John Doe</h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
