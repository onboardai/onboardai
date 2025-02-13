import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../../store/Reducers/categoryReducer";
import { IoMdCloseCircle, IoMdImages } from "react-icons/io";
import { add_agent, messageClear } from "../../store/Reducers/agentReducer";
import { overrideStyle } from "./../../utils/utils";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { ArrowLeft, Menu } from "lucide-react";
import SidebarSeller from "../compo/SidebarSeller";

const AddAgent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.agent
  );

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        parPage: "",
        page: "",
      })
    );
  }, []);

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

  const [state, setState] = useState({
    name: "",
    shortInfo: "",
    description: "",
    pricePerMonth: "",
    pricePerHour: "",
    departments: "",
    service1: "",
    service2: "",
    service3: "",
    benefit1: "",
    benefit2: "",
    benefit3: "",
    tech1: "",
    tech2: "",
    tech3: "",
  });

  const [deptShow, setDeptShow] = useState(false);
  const [department, setDepartment] = useState("");
  const [allDepartments, setAllDepartments] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const departmentSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = allDepartments.filter(
        (d) => d.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllDepartments(srcValue);
    } else {
      setAllDepartments(departments);
    }
  };

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];
      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  // console.log(images);
  // console.log(imageShow);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        shortInfo: "",
        description: "",
        pricePerMonth: "",
        pricePerHour: "",
        service1: "",
        service2: "",
        service3: "",
        benefit1: "",
        benefit2: "",
        benefit3: "",
        tech1: "",
        tech2: "",
        tech3: "",
      });
      setImageShow([]);
      setImages([]);
      setDepartment("");
    }
  }, [errorMessage, successMessage]);

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

  const removeImage = (i) => {
    const filterImage = images.filter((img, index) => index !== i);
    const fileterImageUrl = imageShow.filter((img, index) => index !== i);

    setImages(filterImage);
    setImageShow(fileterImageUrl);
  };

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("shortInfo", state.shortInfo);
    formData.append("description", state.description);
    formData.append("pricePerMonth", state.pricePerMonth);
    formData.append("pricePerHour", state.pricePerHour);
    formData.append("service1", state.service1);
    formData.append("service2", state.service2);
    formData.append("service3", state.service3);
    formData.append("benefit1", state.benefit1);
    formData.append("benefit2", state.benefit2);
    formData.append("benefit3", state.benefit3);
    formData.append("tech1", state.tech1);
    formData.append("tech2", state.tech2);
    formData.append("tech3", state.tech3);
    formData.append("agencyName", userInfo.agencyInfo?.name);
    formData.append("department", department);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    dispatch(add_agent(formData));
  };

  useEffect(() => {
    setAllDepartments(categories);
  }, [categories]);

  if (!localStorage.getItem("accessToken")) {
    navigate("/booraa");
  }

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
      <div className="flex-1">
        <div className="px-2 lg:px-7 pt-5 pb-8">
          <div className="w-full p-4 bg-white rounded-md">
            <div className="flex justify-between items-center pb-4">
              <h1 className="text-black text-xl font-semibold">Add Agent</h1>
              <Link className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2">
                All Product
              </Link>
            </div>
            <div>
              <form onSubmit={add}>
                <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-black pb-4">
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="name">Agent Name</label>
                    <input
                      onChange={inputHandle}
                      value={state.name}
                      type="text"
                      name="name"
                      id="name"
                      className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                      placeholder="Agent Name"
                      required
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="shortInfo">Short Info</label>
                    <input
                      onChange={inputHandle}
                      value={state.shortInfo}
                      type="text"
                      name="shortInfo"
                      id="shortInfo"
                      className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                      placeholder="Eg. Call Assistant AI Agent"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-black pb-4">
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="pricePerHour">Price Per Hour</label>
                    <input
                      onChange={inputHandle}
                      value={state.pricePerHour}
                      type="number"
                      name="pricePerHour"
                      id="pricePerHour"
                      className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                      placeholder="Eg. $50"
                      required
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="pricePerMonth">Price Per Month</label>
                    <input
                      onChange={inputHandle}
                      value={state.pricePerMonth}
                      type="number"
                      name="pricePerMonth"
                      id="pricePerMonth"
                      className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                      placeholder="Eg. $500"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-black pb-4">
                  <div className="flex flex-col w-[50%] gap-1 relative">
                    <label htmlFor="departments">Department</label>
                    <input
                      readOnly
                      onClick={() => setDeptShow(!deptShow)}
                      onChange={inputHandle}
                      value={department}
                      type="text"
                      name="departments"
                      id="departments"
                      className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                      placeholder={`--Select Department--`}
                      required
                    />

                    <div
                      className={`absolute top-[101%] bg-gray-500 w-full transition-all ${
                        deptShow ? "scale-100" : "scale-0"
                      }`}
                    >
                      <div className="w-full px-4 py-2 fixed">
                        <input
                          value={searchValue}
                          onChange={departmentSearch}
                          placeholder="Search"
                          type="text"
                          className="px-3 py-1 w-full focus:border-gray-400 outline-none bg-transparent border border-slate-700 rounded-md text-white overflow-hidden"
                        />
                      </div>
                      <div className="pt-14"></div>
                      <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                        {allDepartments.map((d, i) => (
                          <span
                            className={`px-4 py-2 hover:bg-blue-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                              department === d.name && "bg-blue-500"
                            }`}
                            onClick={() => {
                              setDeptShow(false);
                              setDepartment(d.name);
                              setSearchValue("");
                              setAllDepartments(departments);
                            }}
                          >
                            {d.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full gap-1 pb-4">
                  <label htmlFor="description">Description</label>
                  <textarea
                    cols="10"
                    rows="5"
                    name="description"
                    id="description"
                    placeholder="Description"
                    onChange={inputHandle}
                    value={state.description}
                    required
                    className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                  ></textarea>
                </div>

                <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-black pb-4">
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="service1">
                      Services & Features - 1(Max 3)
                    </label>
                    <input
                      onChange={inputHandle}
                      value={state.service1}
                      type="text"
                      name="service1"
                      id="service1"
                      className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                      placeholder="Eg. Automated Call Handling"
                      required
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="service2">Services & Features - 2</label>
                    <input
                      onChange={inputHandle}
                      value={state.service2}
                      type="text"
                      name="service2"
                      id="service2"
                      className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                      placeholder="Eg. Intelligent Scheduling"
                      required
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="service3">Services & Features - 3</label>
                    <input
                      onChange={inputHandle}
                      value={state.service3}
                      type="text"
                      name="service3"
                      id="service3"
                      className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                      placeholder="Eg. 24/7 Customer Assistance"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-black pb-4">
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="benefit1">
                      Benefits & Outcomes - 1(Max 3)
                    </label>
                    <input
                      onChange={inputHandle}
                      value={state.benefit1}
                      type="text"
                      name="benefit1"
                      id="benefit1"
                      className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                      placeholder="Eg. Increased Efficiency"
                      required
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="benefit2">Benefits & Outcomes - 2</label>
                    <input
                      onChange={inputHandle}
                      value={state.benefit2}
                      type="text"
                      name="benefit2"
                      id="benefit2"
                      className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                      placeholder="Eg. Reduced Response Time"
                      required
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="benefit3">Benefits & Outcomes - 3</label>
                    <input
                      onChange={inputHandle}
                      value={state.benefit3}
                      type="text"
                      name="benefit3"
                      id="benefit3"
                      className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                      placeholder="Eg. Enhanced Customer Satisfaction"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-black pb-4">
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="tech1">Technologies Used - 1(Max 3)</label>
                    <input
                      onChange={inputHandle}
                      value={state.tech1}
                      type="text"
                      name="tech1"
                      id="tech1"
                      className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                      placeholder="Eg. Natural Language Processing"
                      required
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="tech2">Technologies Used - 2</label>
                    <input
                      onChange={inputHandle}
                      value={state.tech2}
                      type="text"
                      name="tech2"
                      id="tech2"
                      className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                      placeholder="Eg. AI-Powered Voice Recognition"
                      required
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="tech3">Technologies Used - 3</label>
                    <input
                      onChange={inputHandle}
                      value={state.tech3}
                      type="text"
                      name="tech3"
                      id="tech3"
                      className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                      placeholder="Eg. Advanced Scheduling Algorithms"
                      required
                    />
                  </div>
                </div>

                <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-black mb-4">
                  {imageShow.map((img, i) => (
                    <div className="h-[180px] relative">
                      <label htmlFor={i}>
                        <img
                          className="w-full h-full rounded-sm"
                          src={img.url}
                          alt=""
                        />
                      </label>
                      <input
                        onChange={(e) => changeImage(e.target.files[0], i)}
                        type="file"
                        id={i}
                        className="hidden"
                      />
                      <span
                        onClick={() => removeImage(i)}
                        className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                      >
                        <IoMdCloseCircle />
                      </span>
                    </div>
                  ))}
                  <label
                    htmlFor="image"
                    className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-blue-500 w-full text-black"
                  >
                    <span>
                      <IoMdImages />
                    </span>
                    <span>Select Image</span>
                  </label>
                  <input
                    onChange={imageHandle}
                    className="hidden"
                    type="file"
                    multiple
                    id="image"
                  />
                </div>

                <div className="flex">
                  <button
                    disabled={loader ? true : false}
                    type="submit"
                    className="group relative w-[280px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {loader ? (
                      <PropagateLoader
                        color="#ffffff"
                        cssOverride={overrideStyle}
                      />
                    ) : (
                      "Add Agent"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAgent;
