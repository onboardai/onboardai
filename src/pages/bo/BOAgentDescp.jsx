import React, { useEffect } from "react";
import { ArrowLeft, Check, Globe } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_agent_profile } from "../../store/Reducers/agentReducer";
import { get_seller_profile_from_id } from "../../store/Reducers/sellerDetailsReducer";
import RedirectBOToCreate from "../function/RedirectBOToCreate";

const BOAgentDescp = () => {
  const { agentId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loader, agent } = useSelector((state) => state.agent);

  const { sellerInfo } = useSelector((state) => state.sellerDetail);

  const { userInfo } = useSelector((state) => state.boAuth);

  useEffect(() => {
    dispatch(get_agent_profile(agentId));
  }, [agentId]);

  useEffect(() => {
    if (agent) {
      dispatch(get_seller_profile_from_id(agent.sellerId));
    }
  }, [agent]);

  useEffect(() => {
    if (userInfo) {
      if (!userInfo?.businessInfo) {
        navigate("/bo/create/");
      }
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    if (!localStorage.getItem("boToken")) navigate("/booraa");
  });

  const truncateText = (text, limit) =>
    text.length <= limit ? text : text.slice(0, limit) + "...";

  if (loader || !agent) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link
              to={"/bo/dashboard/search-agents"}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </Link>
            <h1 className="ml-4 text-xl font-semibold text-black">
              AI Agent Profile
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <img
                src={agent.images[0]}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {truncateText(agent.name, 20)}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Link
                    to={`/seller/profile/${sellerInfo?.agencyInfo?.username}`}
                    className="text-gray-600 underline"
                  >
                    {truncateText(agent.agencyName, 20)}
                  </Link>
                  <span className="text-slate-800 font-semibold">
                    ${agent.pricePerMonth}p/m
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <Link
                to={`/bo/dashboard/chat/${agent.sellerId}`}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Hire AI Agent
              </Link>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                AI Agent Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {agent.description}
              </p>
            </div>

            {/* Services & Features */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Services & Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">
                    {agent.services?.service1}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">
                    {agent.services?.service2}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">
                    {agent.services?.service3}
                  </span>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Technologies Used
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700 ">{agent.techs?.tech1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">{agent.techs?.tech2}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  <span className="text-gray-700">{agent.techs?.tech2}</span>
                </div>
              </div>
            </div>
            {/* Benefits & Outcomes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Benefits & Outcomes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">
                    {agent.benefits?.benefit1}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">
                    {agent.benefits?.benefit2}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">
                    {agent.benefits?.benefit2}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Pricing
              </h3>
              <div className="space-y-4">
                {[
                  { period: "Annually", price: `$${agent.pricePerMonth * 12}` },
                  { period: "Monthly", price: `$${agent.pricePerMonth}` },
                  { period: "Hourly", price: `$${agent.pricePerHour}` },
                ].map((plan, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                  >
                    <span className="font-medium text-gray-700">
                      {plan.period}
                    </span>
                    <span className="text-slate-900 font-semibold">
                      {plan.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Departments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Main Department
              </h3>
              <div className="flex gap-3">
                <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-medium">
                  {agent.department}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BOAgentDescp;
