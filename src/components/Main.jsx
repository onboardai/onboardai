import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

const Main = () => {
  return (
    <div className=" bg=[#cdcae9] w-full min-h-screen">
      <Navbar chop={false} />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
