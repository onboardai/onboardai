import React, { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { IoMdCloseCircle, IoMdImage } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  bo_profile_add,
  messageClear,
} from "../../store/Reducers/boAuthReducer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";

const BOCreateProf = () => {
  const [formData, setFormData] = useState({
    name: "",
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
  const [imageShow, setImageShow] = useState([]);
  const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, errorMessage, successMessage, loader } = useSelector(
    (state) => state.boAuth
  );

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

  useEffect(() => {
    if (!localStorage.getItem("boToken")) navigate("/booraa");
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMultiSelect = (field, value) => {
    if (!formData[field].includes(value)) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value],
      });
    }
  };

  const removeItem = (field, value) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((item) => item !== value),
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (formData.aiNeeds.length === 0) {
      validationErrors.aiNeeds = "Please select at least one AI need.";
    }

    if (formData.aiExpectations.length === 0) {
      validationErrors.aiExpectations =
        "Please select at least one AI Expectation";
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
    dat.append("industry", formData.industry);
    for (let i = 0; i < formData.aiNeeds.length; i++) {
      dat.append("aiNeeds", formData.aiNeeds[i]);
    }
    for (let i = 0; i < formData.aiExpectations.length; i++) {
      dat.append("aiExpectations", formData.aiExpectations[i]);
    }
    dat.append("businessSize", formData.businessSize);
    dat.append("budgetRange", formData.budgetRange);
    dat.append("aiIntegrationLevel", formData.aiIntegrationLevel);
    dat.append("previousImplementations", formData.previousImplementations);
    dat.append("location", formData.location);
    dat.append("additionalInfo", formData.additionalInfo);
    dat.append("images", images[0]);
    dat.append("userId", userInfo._id);
    dispatch(bo_profile_add(dat));
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
      setImageShow([]);
      setImages([]);
      navigate("/bo/dashboard");
    }
  });

  if (userInfo.businessInfo) {
    navigate("/home");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Say goodbye to the traditional recruitment process.
          </h1>
          <h2 className="text-3xl font-bold text-blue-500">
            Hire your AI Agents with OnboardedAI
          </h2>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-8">
            Set up your Business Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Business Name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Business Username"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Logo:
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
                <label className="block text-sm font-medium text-gray-700">
                  Business Description:
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Brief on what the business does, its industry, why it's seeking AI solutions, what improvements to address with AI.."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Industry:
                </label>
                <select
                  name="industry"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  onChange={handleChange}
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
                <label className="block text-sm font-medium text-gray-700">
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
                      .filter((option) => !formData.aiNeeds.includes(option))
                      .map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.aiNeeds.map((need) => (
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
                {errors.aiNeeds && (
                  <p className="text-red-500 text-sm">{errors.aiNeeds}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
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
                        (option) => !formData.aiExpectations.includes(option)
                      )
                      .map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.aiExpectations.map((expectation) => (
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
                {errors.aiExpectations && (
                  <p className="text-red-500 text-sm">
                    {errors.aiExpectations}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Size of Business:
                </label>
                <select
                  name="businessSize"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  onChange={handleChange}
                >
                  <option value="">Select Business Size</option>
                  <option value="startup">Startup (1-10)</option>
                  <option value="small">Small (11-50)</option>
                  <option value="medium">Medium (51-200)</option>
                  <option value="large">Large (201+)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Budget Range:
                </label>
                <select
                  name="budgetRange"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  onChange={handleChange}
                >
                  <option value="">Select Budget Range</option>
                  <option value="low">$50 - $200</option>
                  <option value="medium">$200 - $500</option>
                  <option value="high">$500 - $1,000</option>
                  <option value="vhigh">$1,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  AI Integration Level:
                </label>
                <select
                  name="aiIntegrationLevel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  onChange={handleChange}
                >
                  <option value="">Select Integration Level</option>
                  <option value="beginner">Just Starting</option>
                  <option value="intermediate">Some Implementation</option>
                  <option value="advanced">Enhancing Existing AI</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Previous AI Implementations:
                </label>
                <textarea
                  name="previousImplementations"
                  rows={3}
                  placeholder="Mention any relevant AI solutions the business has previously implemented"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location:
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Business Location"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Additional Information:
                </label>
                <textarea
                  name="additionalInfo"
                  rows={3}
                  placeholder="Add any other relevant information you would like to provide to the AI Agencies"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onSubmit={handleSubmit}
                disabled={loader ? true : false}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loader ? (
                  <PropagateLoader
                    color="#ffffff"
                    cssOverride={overrideStyle}
                  />
                ) : (
                  "Create Profile"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Log In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BOCreateProf;
