import React, { useEffect, useState } from "react";
import Sidebar from "../compo/Sidebar";
import {
  Search,
  MapPin,
  Donut as Button,
  Icon,
  BarChart3,
  Megaphone,
  Banknote,
  Users,
  ClipboardList,
  UserCircle,
  Settings,
  Menu,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import RedirectBOToCreate from "../function/RedirectBOToCreate";
import { useSelector } from "react-redux";

const DepartmentCard = ({ icon: Icon, title, agents }) => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
    <Icon className="w-6 h-6 text-blue-600 mb-3" />
    <h3 className="font-medium text-gray-900">{title}</h3>
    <p className="text-sm text-gray-500 mt-1">{agents} agents available</p>
  </div>
);

const BODashboard = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.boAuth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("boToken")) navigate("/booraa");
  });

  useEffect(() => {
    if (userInfo) {
      if (!userInfo?.businessInfo) {
        navigate("/bo/create/");
      }
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md justify-end"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-50 lg:z-0`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      <div className="flex-1 bg-blue-50/50 min-h-screen">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Business Dashboard</h1>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Hero Section */}
          <div className="bg-white p-8 rounded-lg border border-gray-200 mb-6">
            <h2 className="text-4xl font-bold mb-2">
              Hire the perfect{" "}
              <span className="text-blue-600">AI Employee</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Find and Hire the best AI Agents from the best AI Agencies in the
              world to automate, customize and smoothen your business workflow
            </p>

            {/* Search Section */}
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search AI Agents"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={() => navigate("/bo/dashboard/search-agents")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>

            {/* Popular Tags */}
            <div className="mt-4">
              <span className="text-sm text-gray-500">Popular : </span>
              <div className="inline-flex gap-2 text-sm">
                <span className="text-gray-700">UI Designer,</span>
                <span className="text-gray-700">UX Researcher,</span>
                <span className="text-gray-700">Android,</span>
                <span className="text-gray-700">Admin</span>
              </div>
            </div>
          </div>

          {/* Departments Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Explore by departments</h2>
              <Link
                to="/bo/dashboard/search-agents"
                className="text-blue-600 hover:text-blue-700"
              >
                Explore →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <DepartmentCard icon={BarChart3} title="Sales" agents="15" />
              <DepartmentCard icon={Megaphone} title="Marketing" agents="25" />
              <DepartmentCard icon={Banknote} title="Finance" agents="12" />
              <DepartmentCard icon={Users} title="Human Resource" agents="18" />
              <DepartmentCard
                icon={ClipboardList}
                title="Research"
                agents="10"
              />
              <DepartmentCard
                icon={UserCircle}
                title="Customer Support"
                agents="24"
              />
              <DepartmentCard icon={Settings} title="Operations" agents="17" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BODashboard;
