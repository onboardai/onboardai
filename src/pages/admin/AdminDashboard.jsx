import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Cards from "../../components/Cards/Cards";
import CustomBarChart from "./../../components/Charts/CustomBarChart";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import Table from "../../components/Table/Table";
import Activity from "../../components/Activity/Activity";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 bg-slate-200 ${
          isOpen ? "md:ml-44" : "ml-16"
        } transition-all duration-300`}
      >
        <Header />

        <Cards />

        <div className="translate-all flex flex-col gap-4 p-4 duration-300 sm:px-7 sm:py-1 xl:flex-row">
          <CustomBarChart />
          <CustomPieChart />
        </div>
        <div className="translate-all flex flex-col gap-4 p-4 duration-300 sm:px-7 sm:py-1 xl:flex-row">
          <Table />
          <Activity />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
