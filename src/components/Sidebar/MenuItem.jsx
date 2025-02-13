import React from "react";
import { Link } from "react-router-dom";

const MenuItem = ({ icon: Icon, name, isOpen, isLogout, path }) => {
  return (
    <Link
      to={path}
      className={`m-2 flex cursor-pointer items-center
    space-x-4 rounded-md px-4 py-3 text-gray-600 
    duration-500 hover:bg-blue-400 hover:text-gray-600 font-semibold
    ${isLogout ? "mt-auto hidden" : ""}`}
    >
      <span className="text-xl">{Icon}</span>
      {isOpen && <span className="text-[14px] overflow-hidden">{name}</span>}
    </Link>
  );
};

export default MenuItem;
