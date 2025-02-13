import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeftIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  PencilIcon,
  KeyIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "../compo/Sidebar";
import RedirectBOToCreate from "../function/RedirectBOToCreate";

const BOProfilePg = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.boAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  const truncateText = (text, limit) =>
    text.length <= limit ? text : text.slice(0, limit) + "...";

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
      <div className="flex-1">
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
          {/* Profile Card */}
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-6 border border-gray-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="rounded-xl p-3 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-sm">
                  <img
                    src={userInfo.businessInfo?.businessLogo[0]}
                    alt="Agency Logo"
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate max-w-xs sm:max-w-md">
                    {truncateText(userInfo.businessInfo?.name, 25)}
                  </h1>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base truncate max-w-xs sm:max-w-md">
                    Username:{" "}
                    {truncateText(userInfo.businessInfo?.username, 20)}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-3 sm:ml-auto">
                <Link
                  to={`/bo/dashboard/edit-profile`}
                  className="btn-outline flex items-center px-4 py-2.5 text-sm font-medium border rounded-lg w-full sm:w-auto"
                >
                  <PencilIcon className="h-4 w-4 mr-2" /> Edit Profile
                </Link>
                <Link
                  to={`/bo/dashboard/change-password`}
                  className="btn-outline flex items-center px-4 py-2.5 text-sm font-medium border rounded-lg w-full sm:w-auto"
                >
                  <KeyIcon className="h-4 w-4 mr-2" /> Change Password
                </Link>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {userInfo.businessInfo?.description}
            </p>
          </div>

          {/* Grid Layout */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Specializations */}
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Main AI Needs
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {userInfo.businessInfo?.aiNeeds.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-blue-50 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology */}
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Main AI Expectations
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {userInfo.businessInfo?.aiExpectations.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white rounded-xl border border-gray-200 text-gray-700 hover:border-primary hover:shadow-sm transition-all"
                    >
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Previous Implementations
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {userInfo.businessInfo?.previousImplementations}
                </p>
              </div>

              {/* Additional Info */}
              <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Additional Information
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {userInfo.businessInfo?.additionalInfo}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {[
                {
                  icon: UserGroupIcon,
                  label: "Agency Size",
                  value: `${
                    userInfo.businessInfo?.businessSize === "startup"
                      ? "Startup (1-10) employees"
                      : userInfo.businessInfo?.businessSize === "small"
                      ? "Small (11-50) employees"
                      : userInfo.businessInfo?.businessSize === "medium"
                      ? "Medium (51-200) employees"
                      : userInfo.businessInfo?.businessSize === "large"
                      ? "Large (201+) employees"
                      : "Undefined"
                  }`,
                },
                {
                  icon: CurrencyDollarIcon,
                  label: "Budget Range",
                  value: `${
                    userInfo.businessInfo?.budgetRange === "low"
                      ? "$50 - $200"
                      : userInfo.businessInfo?.budgetRange === "medium"
                      ? "$200 - $500"
                      : userInfo.businessInfo?.budgetRange === "high"
                      ? "$500 - $1,000"
                      : userInfo.businessInfo?.budgetRange === "vhigh"
                      ? "$1,000+"
                      : "Undefined"
                  }`,
                },
                {
                  icon: BuildingOfficeIcon,
                  label: "Industry",
                  value: userInfo.businessInfo?.industry,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 flex items-start space-x-4"
                >
                  <item.icon className="h-6 w-6 text-primary" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {item.label}
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BOProfilePg;
