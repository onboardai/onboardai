import React, { useState, useEffect, useRef } from "react";
import { ArrowLeftIcon, CameraIcon } from "@heroicons/react/24/solid";
import { Link, useFetcher, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Camera,
  ChevronDown,
  X,
  Search,
  UserRoundIcon,
} from "lucide-react";
import {
  get_user_info,
  messageClear,
  update_user,
  update_user_image,
} from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";

const AutoComplete = ({ options, value, onChange, placeholder, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setInputValue(input);
    setIsOpen(true);

    const filtered = options.filter(
      (option) =>
        option.toLowerCase().includes(input.toLowerCase()) &&
        !value.includes(option)
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    onChange([...value, option]);
    setInputValue("");
    setIsOpen(false);
  };

  const handleRemoveOption = (optionToRemove) => {
    onChange(value.filter((option) => option !== optionToRemove));
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="w-full p-2 border rounded-md bg-white min-h-[42px] flex flex-wrap gap-2">
        {value.map((option, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {option}
            <button
              type="button"
              onClick={() => handleRemoveOption(option)}
              className="text-blue-600 hover:text-blue-800 font-bold"
            >
              x
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 outline-none min-w-[100px]"
          onFocus={() => setIsOpen(true)}
        />
      </div>
      {isOpen && inputValue && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
              required
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AAEditProfile = () => {
  const [state, setState] = useState({
    name: "",
    username: "",
    description: "",
    industryExpertise: "",
    mainAISpecializations: [],
    aiTools: [],
    teamSize: "",
    pricingModel: "",
    targetBusinessSize: "",
    previousProjects: "",
    location: "",
    additionalInfo: "",
    agenname: "",
    email: "",
  });

  const aiSpecializations = [
    "Natural Language Processing",
    "Computer Vision",
    "Machine Learning",
    "Deep Learning",
    "Chatbots",
    "Workflow Automation",
    "Sales AI",
    "Predictive Analytics",
    "Recommendation Systems",
    "Speech Recognition",
    "Image Recognition",
    "Text Analytics",
    "Robotic Process Automation",
    "Data Mining",
  ];

  const aiTools = [
    "OpenAI GPT-3",
    "TensorFlow",
    "PyTorch",
    "Hugging Face",
    "Google Cloud AI",
    "AWS SageMaker",
    "Microsoft Azure AI",
    "IBM Watson",
    "Scikit-learn",
    "Keras",
    "NLTK",
    "SpaCy",
    "FastAI",
    "Pandas",
    "NumPy",
  ];

  const { userInfo, loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const userId = userInfo._id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      if (!localStorage.getItem("accessToken")) navigate("/booraa");
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
        update_user_image({
          oldImage: img,
          newImage: files[0],
          userId,
        })
      );
    }
  };

  useEffect(() => {
    setState({
      agenname: userInfo.agencyInfo?.name || "",
      name: userInfo.name || "",
      email: userInfo.email || "",
      username: userInfo.agencyInfo?.username || "",
      description: userInfo.agencyInfo?.description || "",
      industryExpertise: userInfo.agencyInfo?.industryExpertise || "",
      mainAISpecializations: userInfo.agencyInfo?.mainAISpecializations || [],
      aiTools: userInfo.agencyInfo?.aiTools || [],
      teamSize: userInfo.agencyInfo?.teamSize || "",
      pricingModel: userInfo.agencyInfo?.pricingModel || "",
      targetBusinessSize: userInfo.agencyInfo?.targetBusinessSize || "",
      previousProjects: userInfo.agencyInfo?.previousProjects || "",
      location: userInfo.agencyInfo?.location || "",
      additionalInfo: userInfo.agencyInfo?.additionalInfo || "",
    });
    setImageShow(userInfo.agencyInfo?.agencyLogo || []);
  }, [userInfo]);

  const handleMultiSelectChange = (name, values) => {
    setState({
      ...state,
      [name]: values, // Updates the array fields correctly
    });
  };

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const update = (e) => {
    e.preventDefault();

    const obj = {
      agenname: state.agenname,
      name: state.name,
      email: state.email,
      username: state.username,
      description: state.description,
      industryExpertise: state.industryExpertise,
      mainAISpecializations: state.mainAISpecializations,
      aiTools: state.aiTools,
      teamSize: state.teamSize,
      pricingModel: state.pricingModel,
      targetBusinessSize: state.targetBusinessSize,
      previousProjects: state.previousProjects,
      location: state.location,
      additionalInfo: state.additionalInfo,
      userId: userId,
      agencyLogo: imageShow[0],
    };
    dispatch(update_user(obj));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Back Button */}
      <div className="max-w-3xl mx-auto mb-6">
        <Link
          to={"/seller/dashboard/profile"}
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
              {imageShow &&
                imageShow.length > 0 &&
                imageShow.map((img, i) => (
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl">
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
                ))}
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
                  Agency Name
                </label>
                <input
                  type="text"
                  name="agenname"
                  onChange={inputHandle}
                  value={state.agenname}
                  id="agenname"
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
                    Agency Team Size
                  </label>
                  <div className="relative">
                    <select
                      id="teamSize"
                      name="teamSize"
                      onChange={inputHandle}
                      value={state.teamSize}
                      className="w-full px-3 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    >
                      <option value="">Select team size</option>
                      <option value="1-5">1-5 employees</option>
                      <option value="6-20">6-20 employees</option>
                      <option value="21-50">21-50 employees</option>
                      <option value="50+">50+ employees</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">
                    Pricing Model
                  </label>
                  <div className="relative">
                    <select
                      name="pricingModel"
                      id="pricingModel"
                      onChange={inputHandle}
                      value={state.pricingModel}
                      className="w-full px-3 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    >
                      <option value="">Select pricing model</option>
                      <option value="Fixed">Fixed Price</option>
                      <option value="Hourly">Hourly Rate</option>
                      <option value="Subscription">Subscription</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Industry Expertise
                </label>
                <div className="relative">
                  <select
                    name="industryExpertise"
                    id="industryExpertise"
                    onChange={inputHandle}
                    value={state.industryExpertise}
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
                  Main AI Specializations:
                </label>
                <AutoComplete
                  options={aiSpecializations}
                  value={state.mainAISpecializations}
                  onChange={(values) =>
                    handleMultiSelectChange("mainAISpecializations", values)
                  }
                  placeholder="Type to search AI specializations..."
                  name="mainAISpecializations"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  AI Tools/Technology Used:
                </label>
                <AutoComplete
                  options={aiTools}
                  value={state.aiTools}
                  onChange={(values) =>
                    handleMultiSelectChange("aiTools", values)
                  }
                  placeholder="Type to search AI tools..."
                  name="aiTools"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Target Business Size
                </label>
                <div className="relative">
                  <select
                    name="targetBusinessSize"
                    id="targetBusinessSize"
                    onChange={inputHandle}
                    value={state.targetBusinessSize}
                    className="w-full px-3 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    required
                  >
                    <option value="">Select target business size</option>
                    <option value="small">Small Business</option>
                    <option value="medium">Medium Business</option>
                    <option value="large">Large Business</option>
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
                  Previous Projects
                </label>
                <textarea
                  name="previousProjects"
                  id="previousProjects"
                  onChange={inputHandle}
                  value={state.previousProjects}
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
            to={"/seller/dashboard/profile"}
            className="px-6 py-2 text-gray-700 rounded-lg hover:bg-gray-100 font-medium"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AAEditProfile;
