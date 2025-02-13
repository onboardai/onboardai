import React, { useEffect, useState } from "react";
import SellerSidebar from "../../components/Seller/Sidebar/SellerSidebar";
import SellerHeader from "../../components/Seller/Header/SellerHeader";
import { motion } from "framer-motion";
import StatCard from "../../components/Seller/Cards/StatCard";
import {
  Search,
  BarChart3,
  Award,
  Briefcase,
  Users,
  Shield,
  Bot,
  ArrowRight,
  Plus,
  Menu,
  User,
} from "lucide-react";
import reportWebVitals from "./../../reportWebVitals";
import SalesChart from "../../components/Seller/Charts/SalesChart";
import CategoryChart from "./../../components/Seller/Charts/CategoryChart";
import SalesChannelChart from "./../../components/Seller/Charts/SalesChannelChart";
import SidebarSeller from "../compo/SidebarSeller";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_agents } from "../../store/Reducers/agentReducer";

const StatsCard = ({ icon, title, value, change }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
        <div className="text-blue-600">{icon}</div>
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <div className="flex items-center gap-2">
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  </div>
);

const SellerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  const { userInfo } = useSelector((state) => state.auth);
  const { agents, totalAgent } = useSelector((state) => state.agent);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) navigate("/booraa");
  }, [navigate]);

  const userId = userInfo._id;

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_agents(obj));
  }, []);

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
        className={`lg:sticky lg:top-0 lg:h-screen fixed lg:static inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-200 ease-in-out z-50 lg:z-0`}
      >
        <SidebarSeller onClose={() => setIsSidebarOpen(false)} />
      </div>
      <div className="flex-1 overflow-auto relative z-10">
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  Agent Seller Dashboard
                </h1>
                <button
                  onClick={() => navigate("/seller/dashboard/add-agent")}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  <span>List New Agent</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard icon={<Bot />} title="Listed Agents" value={totalAgent} />
            </div>

            {/* Main Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Listed Agents */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Your Listed Agents
                  </h2>
                  <button onClick={() => navigate("/seller/dashboard/agents")} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View All <ArrowRight size={16} />
                  </button>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-auto">
                  {agents.map((agent, index) => (
                    <Link
                      to={`/seller/agent/${agent._id}`}
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <img src={agent.images[0]} className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {agent.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {agent.department}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ${agent.pricePerMonth}
                          </p>
                          <p className="text-sm text-gray-500">p/m</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Quick Actions
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Plus />,
                      title: "Create New Agent",
                      desc: "List a new AI agent for sale",
                      address: "/seller/dashboard/add-agent",
                    },
                    {
                      icon: <User />,
                      title: "View Profile",
                      desc: "View your profile",
                      address: "/seller/dashboard/profile"
                    },
                  ].map((action, index) => (
                    <button
                      key={index}
                      onClick={() => navigate(action.address)}
                      className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <div className="text-blue-600">{action.icon}</div>
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-500">{action.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
