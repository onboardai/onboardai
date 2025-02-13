import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  messageClear,
  update_bo,
  update_bo_image,
} from "../../store/Reducers/boAuthReducer";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  ChevronDown,
  X,
  Search,
  UserRoundIcon,
} from "lucide-react";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import RedirectBOToCreate from "../function/RedirectBOToCreate";

const BOEditProfile = () => {
  const [state, setState] = useState({
    name: "",
    bName: "",
    email: "",
    username: "",
    description: "",
    industry: "",
    aiNeeds: [],
    aiExpectations: [],
    businessSize: "",
    budgetRange: "",
    aiIntegrationLevel: "",
    previousImplementations: "",
    location: "",
    additionalInfo: "",
  });

  const aiNeedsOptions = [
    "Process Automation",
    "Data Analytics",
    "Customer Service",
    "Product Development",
    "Machine Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Predictive Analytics",
    "Decision Support",
    "Quality Control",
  ];

  const aiExpectationsOptions = [
    "Improved Efficiency",
    "Cost Reduction",
    "Quality Enhancement",
    "Innovation",
    "Competitive Advantage",
    "Customer Satisfaction",
    "Revenue Growth",
    "Risk Reduction",
    "Process Optimization",
    "Employee Productivity",
  ];

  const { userInfo, loader, successMessage, errorMessage } = useSelector(
    (state) => state.boAuth
  );

  const userId = userInfo._id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("boToken")) navigate("/booraa");
  });

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  const [imageShow, setImageShow] = useState([]);

  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        update_bo_image({
          oldImage: img,
          newImage: files[0],
          userId,
        })
      );
    }
  };

  useEffect(() => {
    setState({
      name: userInfo.name || "",
      bName: userInfo.businessInfo?.name || "",
      email: userInfo.email || "",
      username: userInfo.businessInfo?.username || "",
      description: userInfo.businessInfo?.description || "",
      industry: userInfo.businessInfo?.industry || "",
      aiNeeds: userInfo.businessInfo?.aiNeeds || [],
      aiExpectations: userInfo.businessInfo?.aiExpectations || [],
      businessSize: userInfo.businessInfo?.businessSize || "",
      budgetRange: userInfo.businessInfo?.budgetRange || "",
      aiIntegrationLevel: userInfo.businessInfo?.aiIntegrationLevel || "",
      previousImplementations:
        userInfo.businessInfo?.previousImplementations || "",
      location: userInfo.businessInfo?.location || "",
      additionalInfo: userInfo.businessInfo?.additionalInfo || "",
    });
    setImageShow(userInfo.businessInfo?.businessLogo || []);
  }, [userInfo]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleMultiSelect = (field, value) => {
    if (!state[field].includes(value)) {
      setState({
        ...state,
        [field]: [...state[field], value],
      });
    }
  };

  const removeItem = (field, value) => {
    setState({
      ...state,
      [field]: state[field].filter((item) => item !== value),
    });
  };

  const update = (e) => {
    e.preventDefault();

    const obj = {
      name: state.name,
      bName: state.bName,
      email: state.email,
      username: state.username,
      description: state.description,
      industry: state.industry,
      aiNeeds: state.aiNeeds,
      aiExpectations: state.aiExpectations,
      businessSize: state.businessSize,
      budgetRange: state.budgetRange,
      aiIntegrationLevel: state.aiIntegrationLevel,
      previousImplementations: state.previousImplementations,
      location: state.location,
      additionalInfo: state.additionalInfo,
      businessLogo: imageShow[0],
      userId: userId,
    };
    dispatch(update_bo(obj));
  };

  useEffect(() => {
    if (userInfo) {
      if (!userInfo?.businessInfo) {
        navigate("/bo/create/");
      }
    }
  }, [userInfo, navigate]);
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Back Button */}
      <div className="max-w-3xl mx-auto mb-6">
        <Link
          to={"/bo/dashboard/profile"}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Link>
      </div>

      {/* Main Form */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-8">
        <h1 className="text-2xl font-semibold mb-8">Edit Profile</h1>

        {/* Profile Picture */}
        <div className="mb-8">
          <p className="text-sm font-medium mb-4">Profile Picture</p>
          <div className="flex items-center">
            <div className="relative">
              {loader ? (
                <div className="w-16 h-16 rounded-lg flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
                </div>
              ) : (
                imageShow &&
                imageShow.length > 0 &&
                imageShow.map((img, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl"
                  >
                    <label htmlFor={i}>
                      <img
                        src={img}
                        alt=""
                        className="w-16 h-16 rounded cursor-pointer border border-gray-100"
                      />
                    </label>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => changeImage(img, e.target.files)}
                      id={i}
                    />
                  </div>
                ))
              )}
            </div>
            <p className=" ml-4 text-sm text-gray-600 hover:text-gray-700">
              Click photo to change
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <form onSubmit={update}>
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  name="bName"
                  onChange={inputHandle}
                  value={state.bName}
                  id="bName"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Owner Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={inputHandle}
                  value={state.name}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={inputHandle}
                  value={state.email}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Agency Details */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Agency Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  onChange={inputHandle}
                  value={state.description}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Business Team Size
                  </label>
                  <div className="relative">
                    <select
                      id="businessSize"
                      name="businessSize"
                      onChange={inputHandle}
                      value={state.businessSize}
                      className="w-full px-3 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    >
                      <option value="">Select Business Size</option>
                      <option value="startup">Startup (1-10)</option>
                      <option value="small">Small (11-50)</option>
                      <option value="medium">Medium (51-200)</option>
                      <option value="large">Large (201+)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Budget Range
                  </label>
                  <div className="relative">
                    <select
                      name="budgetRange"
                      id="budgetRange"
                      onChange={inputHandle}
                      value={state.budgetRange}
                      className="w-full px-3 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    >
                      <option value="">Select Budget Range</option>
                      <option value="low">$50 - $200</option>
                      <option value="medium">$200 - $500</option>
                      <option value="high">$500 - $1,000</option>
                      <option value="vhigh">$1,000+</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Industry
                </label>
                <div className="relative">
                  <select
                    name="industry"
                    id="industry"
                    onChange={inputHandle}
                    value={state.industry}
                    className="w-full px-3 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  >
                    <option value="">Select industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Telecommunications">
                      Telecommunications
                    </option>
                    <option value="Marketing">Marketing</option>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Education">Education</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main AI Needs:
                </label>
                <div className="mt-1">
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    onChange={(e) =>
                      handleMultiSelect("aiNeeds", e.target.value)
                    }
                    value=""
                  >
                    <option value="">Add AI Need</option>
                    {aiNeedsOptions
                      .filter((option) => !state.aiNeeds.includes(option))
                      .map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {state.aiNeeds.map((need) => (
                      <span
                        key={need}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {need}
                        <button
                          type="button"
                          onClick={() => removeItem("aiNeeds", need)}
                          className="ml-2 inline-flex items-center p-0.5 hover:bg-blue-200 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main AI Expectations:
                </label>
                <div className="mt-1">
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                    onChange={(e) =>
                      handleMultiSelect("aiExpectations", e.target.value)
                    }
                    value=""
                  >
                    <option value="">Add AI Expectation</option>
                    {aiExpectationsOptions
                      .filter(
                        (option) => !state.aiExpectations.includes(option)
                      )
                      .map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {state.aiExpectations.map((expectation) => (
                      <span
                        key={expectation}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {expectation}
                        <button
                          type="button"
                          onClick={() =>
                            removeItem("aiExpectations", expectation)
                          }
                          className="ml-2 inline-flex items-center p-0.5 hover:bg-green-200 rounded-full"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  AI Integration Level
                </label>
                <div className="relative">
                  <select
                    name="aiIntegrationLevel"
                    id="aiIntegrationLevel"
                    onChange={inputHandle}
                    value={state.aiIntegrationLevel}
                    className="w-full px-3 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  >
                    <option value="">Select Integration Level</option>
                    <option value="beginner">Just Starting</option>
                    <option value="intermediate">Some Implementation</option>
                    <option value="advanced">Enhancing Existing AI</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Location
                </label>
                <input
                  name="location"
                  id="location"
                  onChange={inputHandle}
                  type="text"
                  value={state.location}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Previous AI Implementations:
                </label>
                <textarea
                  name="previousImplementations"
                  id="previousImplementations"
                  onChange={inputHandle}
                  value={state.previousImplementations}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  id="additionalInfo"
                  onChange={inputHandle}
                  value={state.additionalInfo}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-h-[100px]"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={update}
            disabled={loader ? true : false}
            className="px-6 py-2 w-[180px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            {loader ? (
              <PropagateLoader color="#ffffff" cssOverride={overrideStyle} />
            ) : (
              "Save Changes"
            )}
          </button>
          <Link
            to={"/bo/dashboard/profile"}
            className="px-6 py-2 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BOEditProfile;
