import React, { useEffect, useState } from "react";
import { Search, MapPin, Bell, Check, Globe, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { query_agents } from "./../../store/Reducers/boHomeReducer";
import Pagination from "./../../Pagination";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "../compo/Sidebar";
import RedirectBOToCreate from "../function/RedirectBOToCreate";

const truncateText = (text, limit) =>
  text.length <= limit ? text : text.slice(0, limit) + "...";

const AgentCard = ({
  images,
  name,
  pricePerMonth,
  agencyName,
  shortInfo,
  benefits,
  services,
  techs,
  _id,
}) => (
  <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
    <div className="flex items-start justify-between">
      <div className="flex gap-4">
        <img src={images[0]} className="w-12 h-12 rounded-lg object-cover" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {truncateText(name, 25)}
          </h3>
          <p className="text-gray-600 text-sm">{truncateText(shortInfo, 45)}</p>
          <div className="flex gap-2 mt-3">
            <span
              className={`px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-600`}
            >
              {truncateText(benefits.benefit1, 15)}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-600`}
            >
              {truncateText(benefits.benefit2, 15)}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-600`}
            >
              {truncateText(benefits.benefit3, 15)}
            </span>
          </div>
        </div>
      </div>
      <Link
        to={`/bo/agent/${_id}`}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        See more
      </Link>
    </div>
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">Price</span>: $
          {pricePerMonth}/month
        </span>
      </div>
    </div>
  </div>
);

const FilterCard = ({ title, items }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
    <h3 className="text-gray-900 font-medium mb-4 flex items-center justify-between">
      {title}
    </h3>
    <div className="space-y-1">
      {items.map((item, index) => (
        <label
          key={index}
          className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer"
        >
          <input
            type="checkbox"
            id={item}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm">{item}</span>
        </label>
      ))}
    </div>
  </div>
);

const BOSearchAgents = () => {
  const [department, setDepartment] = useState("");
  const [sortBudget, setSortBudget] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.boAuth);

  const { agents, totalAgent, parPage } = useSelector((state) => state.boHome);

  const [pageNumber, setPageNumber] = useState(1);

  const queryDepartment = (e, value) => {
    if (e.target.checked) {
      setDepartment(value);
    } else {
      setDepartment("");
    }
  };

  const queryBudgetRange = (e, value) => {
    if (e.target.checked) {
      setSortBudget(value);
    } else {
      setSortBudget("");
    }
  };

  const agentis = [
    {
      logo: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      name: "Call Assistant AI Agent",
      company: "Voicela Automations",
      location: "San Francisco, USA",
      tags: ["Full-Time", "Marketing", "Design"],
      capacity: 5,
    },
    // Add more agents as needed
  ];

  const departments = [
    {
      id: 1,
      name: "Sales",
    },
    {
      id: 2,
      name: "Marketing",
    },
    {
      id: 3,
      name: "Finance",
    },
    {
      id: 4,
      name: "Human Resource",
    },
    {
      id: 5,
      name: "Customer Support",
    },
    {
      id: 6,
      name: "Operations",
    },
    {
      id: 7,
      name: "Research",
    },
    {
      id: 8,
      name: "Manufacturing",
    },
  ];

  const budgetRange = [
    {
      id: 1,
      name: "$50 - $200",
      value: "low",
    },
    {
      id: 1,
      name: "$200 - $500",
      value: "medium",
    },
    {
      id: 1,
      name: "$500 - $1,000",
      value: "high",
    },
    {
      id: 1,
      name: "$1,000+",
      value: "vhigh",
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem("boToken")) navigate("/booraa");
  });

  useEffect(() => {
    dispatch(
      query_agents({
        department,
        sortBudget,
        pageNumber,
        searchValue,
      })
    );
  }, [department, sortBudget, pageNumber, searchValue]);

  useEffect(() => {
    if (userInfo) {
      if (!userInfo?.businessInfo) {
        navigate("/bo/create/");
      }
    }
  }, [userInfo, navigate]);

  if (!agents) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const search = (e) => {
    e.preventDefault();
    console.log(searchValue);
  };

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
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      <div className="flex-1 min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-medium text-gray-900">
                Search AI Agents
              </h1>
            </div>
          </div>
        </header>

        {/* Search Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <form onSubmit={search}>
                <input
                  type="text"
                  placeholder="Search AI Agents"
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>
            </div>
            {/* <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Location"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}
            <button
              onClick={search}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>

          <div className="text-sm text-gray-600 mb-8">
            Popular : UI Designer, UX Researcher, Android, Admin
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <div className="lg:w-64 space-y-4">
              <h2 className="text-lg font-medium text-gray-900 px-2">
                Filter By:
              </h2>
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <h3 className="text-gray-900 font-medium mb-4 flex items-center justify-between">
                  Departments
                </h3>
                <div className="space-y-1">
                  {departments.map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id={item}
                        checked={department === item.name ? true : false}
                        onChange={(e) => queryDepartment(e, item.name)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{item.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <h3 className="text-gray-900 font-medium mb-4 flex items-center justify-between">
                  Budget Range
                </h3>
                <div className="space-y-1">
                  {budgetRange.map((item, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id={item}
                        checked={sortBudget === item.value ? true : false}
                        onChange={(e) => queryBudgetRange(e, item.value)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{item.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-gray-900">
                  AI Agents For Hire
                </h2>
                <span className="text-gray-600">
                  Showing {totalAgent} results
                </span>
              </div>
              <div className="space-y-4">
                {agents.map((agent, index) => (
                  <AgentCard key={index} {...agent} />
                ))}
              </div>
            </div>
            <div>
              {totalAgent > parPage && (
                <Pagination
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  totalItem={totalAgent}
                  parPage={parPage}
                  showItem={Math.floor(totalAgent / parPage)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BOSearchAgents;
