import React, { useState, useRef, useEffect } from "react";
import ProfilePicCreate from "../ProfilePicCreate.jsx";
import { IoMdCloseCircle, IoMdImage, IoMdImages } from "react-icons/io";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils.js";
import { useDispatch, useSelector } from "react-redux";
import {
  messageClear,
  profile_info_add,
} from "../../store/Reducers/authReducer.js";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

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
              ×
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

const AACreateProf = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, userInfo } = useSelector(
    (state) => state.auth
  );
  const { userInfo: boUserInfo } = useSelector((state) => state.boAuth);
  const [errors, setErrors] = useState({});
  const [imageShow, setImageShow] = useState([]);
  const [images, setImages] = useState([]);
  const [isChecking, setIsChecking] = useState(true);
  const [formData, setFormData] = useState({
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

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShow([...tempUrl]);
      setImages([...tempImages]);
    }
  };

  const imageHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages([file]);
      setImageShow([{ url: URL.createObjectURL(file) }]);
    }
  };

  const removeImage = (i) => {
    setImages([]);
    setImageShow([]);
    document.getElementById("image").value = "";
  };

  const inputHande = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMultiSelectChange = (name, values) => {
    setFormData({
      ...formData,
      [name]: values, // Updates the array fields correctly
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (formData.mainAISpecializations.length === 0) {
      validationErrors.mainAISpecializations =
        "Please select at least one AI specialization.";
    }

    if (formData.aiTools.length === 0) {
      validationErrors.aiTools = "Please select at least one AI tool.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const dat = new FormData();
    dat.append("name", formData.name);
    dat.append("username", formData.username);
    dat.append("description", formData.description);
    dat.append("industryExpertise", formData.industryExpertise);
    for (let i = 0; i < formData.mainAISpecializations.length; i++) {
      dat.append("mainAISpecializations", formData.mainAISpecializations[i]);
    }
    for (let i = 0; i < formData.aiTools.length; i++) {
      dat.append("aiTools", formData.aiTools[i]);
    }
    dat.append("teamSize", formData.teamSize);
    dat.append("pricingModel", formData.pricingModel);
    dat.append("targetBusinessSize", formData.targetBusinessSize);
    dat.append("previousProjects", formData.previousProjects);
    dat.append("location", formData.location);
    dat.append("additionalInfo", formData.additionalInfo);
    dat.append("images", images[0]);
    dispatch(profile_info_add(dat));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setFormData({
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
      });
      setImageShow([]);
      setImages([]);
      navigate("/seller/dashboard");
    }
  }, [errorMessage, successMessage]);

  const agencyInfo = userInfo?.agencyInfo;

  if (agencyInfo) {
    navigate("/seller/dashboard");
  }

  console.log({
    userInfo: userInfo,
    boUserInfo: boUserInfo,
  });


  return (
    <div className="min-h-screen bg-[#f0f5ff] p-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          Say goodbye to the traditional cold approaches.
        </h1>
        <h2 className="text-3xl text-blue-500 font-semibold mb-8">
          Deliver your AI Agents to top businesses with Onboard AI
        </h2>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-lg font-semibold mb-6">
            Set up your AI Agency Profile
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name:
              </label>
              <input
                type="text"
                placeholder="Agency Name"
                className="w-full p-2 border rounded-md"
                value={formData.name}
                onChange={inputHande}
                name="name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username:
              </label>
              <input
                type="text"
                placeholder="Agency Username"
                className="w-full p-2 border rounded-md"
                value={formData.username}
                onChange={inputHande}
                name="username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                AI Agency Logo:
              </label>
              {imageShow.length > 0 ? (
                <div className="h-[180px] relative">
                  <img
                    className="w-full h-full rounded-sm"
                    src={imageShow[0].url}
                    alt="Agency Logo"
                  />
                  <span
                    onClick={removeImage}
                    className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                  >
                    <IoMdCloseCircle />
                  </span>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-blue-500 w-full text-black"
                >
                  <span>
                    <IoMdImage />
                  </span>
                  <span>Select Image</span>
                </label>
              )}

              <input
                onChange={imageHandle}
                className="hidden"
                type="file"
                id="image"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agency Description:
              </label>
              <textarea
                placeholder="brief overview of the agency, its mission, and areas of expertise in AI solutions"
                className="w-full p-2 border rounded-md h-24"
                value={formData.description}
                onChange={inputHande}
                name="description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry Expertise:
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.industryExpertise}
                onChange={inputHande}
                name="industryExpertise"
                required
              >
                <option value="">Select industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Telecommunications">Telecommunications</option>
                <option value="Marketing">Marketing</option>
                <option value="Pharmaceuticals">Pharmaceuticals</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main AI Specializations:
              </label>
              <AutoComplete
                options={aiSpecializations}
                value={formData.mainAISpecializations}
                onChange={(values) =>
                  handleMultiSelectChange("mainAISpecializations", values)
                }
                placeholder="Type to search AI specializations..."
                name="mainAISpecializations"
              />
              {errors.mainAISpecializations && (
                <p className="text-red-500 text-sm">
                  {errors.mainAISpecializations}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                AI Tools/Technology Used:
              </label>
              <AutoComplete
                options={aiTools}
                value={formData.aiTools}
                onChange={(values) =>
                  handleMultiSelectChange("aiTools", values)
                }
                placeholder="Type to search AI tools..."
                name="aiTools"
              />
              {errors.aiTools && (
                <p className="text-red-500 text-sm">{errors.aiTools}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Agency Team Size:
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.teamSize}
                onChange={inputHande}
                name="teamSize"
                required
              >
                <option value="">Select team size</option>
                <option value="1-5">1-5 employees</option>
                <option value="6-20">6-20 employees</option>
                <option value="21-50">21-50 employees</option>
                <option value="50+">50+ employees</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pricing Model
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.pricingModel}
                onChange={inputHande}
                name="pricingModel"
                required
              >
                <option value="">Select pricing model</option>
                <option value="Fixed">Fixed Price</option>
                <option value="Hourly">Hourly Rate</option>
                <option value="Subscription">Subscription</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Business Size:
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={formData.targetBusinessSize}
                onChange={inputHande}
                name="targetBusinessSize"
                required
              >
                <option value="">Select target business size</option>
                <option value="small">Small Business</option>
                <option value="medium">Medium Business</option>
                <option value="large">Large Business</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Previous AI Projects:
              </label>
              <textarea
                placeholder="mention any relevant AI solutions the business has previously delivered"
                className="w-full p-2 border rounded-md h-24"
                value={formData.previousProjects}
                onChange={inputHande}
                name="previousProjects"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location:
              </label>
              <input
                type="text"
                placeholder="Agency Location"
                className="w-full p-2 border rounded-md"
                value={formData.location}
                name="location"
                onChange={inputHande}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Information:
              </label>
              <textarea
                placeholder="add any other relevant information you would like to provide to the Business Owners"
                className="w-full p-2 border rounded-md h-24"
                value={formData.additionalInfo}
                onChange={inputHande}
                name="additionalInfo"
                required
              />
            </div>

            <button
              type="submit"
              onSubmit={handleSubmit}
              disabled={loader ? true : false}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {loader ? (
                <PropagateLoader color="#ffffff" cssOverride={overrideStyle} />
              ) : (
                "Create Profile"
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="#" className="text-blue-600">
                Log In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AACreateProf;
