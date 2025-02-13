import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../../store/Reducers/categoryReducer";
import toast from "react-hot-toast";
import {
  delete_agent,
  get_agent,
  messageClear,
  update_agent,
  update_image_agent,
} from "../../store/Reducers/agentReducer";
import { IoMdCloseCircle, IoMdImages } from "react-icons/io";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditAgent = () => {
  const { agentId } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { agent, loader, successMessage, errorMessage } = useSelector(
    (state) => state.agent
  );
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!agent || !userInfo) return; // Prevent accessing undefined properties
    if (agent.sellerId !== userInfo._id) {
      navigate("/seller/dashboard");
    }
  }, [agent, userInfo, navigate]);

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

  useEffect(() => {
    dispatch(
      get_category({
        searchValue: "",
        parPage: "",
        page: "",
      })
    );
  }, []);

  useEffect(() => {
    dispatch(get_agent(agentId));
  }, [agentId]);

  useEffect(() => {
    setState({
      name: agent.name,
      shortInfo: agent.shortInfo,
      description: agent.description,
      pricePerMonth: agent.pricePerMonth,
      pricePerHour: agent.pricePerHour,
      service1: agent.services?.service1,
      service2: agent.services?.service2,
      service3: agent.services?.service3,
      benefit1: agent.benefits?.benefit1,
      benefit2: agent.benefits?.benefit2,
      benefit3: agent.benefits?.benefit3,
      tech1: agent.techs?.tech1,
      tech2: agent.techs?.tech2,
      tech3: agent.techs?.tech3,
    });
    setDepartment(agent.department);
    setImageShow(agent.images);
  }, [agent]);

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
      setAllDepartments(categories);
    }
  };

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

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

  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        update_image_agent({
          oldImage: img,
          newImage: files[0],
          agentId,
        })
      );
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

  useEffect(() => {
    if (categories.length > 0) {
      setAllDepartments(categories);
    }
  }, [categories]);

  const update = (e) => {
    e.preventDefault();

    const obj = {
      name: state.name,
      shortInfo: state.shortInfo,
      description: state.description,
      pricePerMonth: state.pricePerMonth,
      pricePerHour: state.pricePerHour,
      service1: state.service1,
      service2: state.service2,
      service3: state.service3,
      benefit1: state.benefit1,
      benefit2: state.benefit2,
      benefit3: state.benefit3,
      tech1: state.tech1,
      tech2: state.tech2,
      tech3: state.tech3,
      agentId: agentId,
      department: department,
    };
    dispatch(update_agent(obj));
  };

  const deleteAgen = (e) => {
    e.preventDefault();
    const oj = {
      agentId: agentId,
      userId: userInfo._id,
    };
    dispatch(delete_agent(oj));
    navigate("/seller/dashboard/agents");
  };

  if (!localStorage.getItem("accessToken")) {
    navigate("/booraa");
  }
  useEffect(() => {
    if (userInfo) {
      if (!userInfo?.agencyInfo) {
        navigate("/seller/create/");
      }
    }
  }, [userInfo, navigate]);

  return (
    <div className="px-2 lg:px-7 pt-5 pb-8">
      <div className="w-full p-4 bg-white rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-black text-xl font-semibold">Edit Agent</h1>
          <Link className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2">
            All Product
          </Link>
        </div>
        <div>
          <form onSubmit={update}>
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
                    {allDepartments.length > 0 &&
                      allDepartments.map((d, i) => (
                        <span
                          className={`px-4 py-2 hover:bg-blue-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                            department === d.name && "bg-blue-500"
                          }`}
                          onClick={() => {
                            setDeptShow(false);
                            setDepartment(d.name);
                            setSearchValue("");
                            setAllDepartments(categories);
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
                className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
              ></textarea>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-black pb-4">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="service1">Services & Features - 1(Max 3)</label>
                <input
                  onChange={inputHandle}
                  value={state.service1}
                  type="text"
                  name="service1"
                  id="service1"
                  className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                  placeholder="Eg. Automated Call Handling"
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
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-black pb-4">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="benefit1">Benefits & Outcomes - 1(Max 3)</label>
                <input
                  onChange={inputHandle}
                  value={state.benefit1}
                  type="text"
                  name="benefit1"
                  id="benefit1"
                  className="px-4 py-2 focus:border-gray-500 outline-none border border-slate-400 rounded-md text-black"
                  placeholder="Eg. Increased Efficiency"
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
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-black mb-4">
              {imageShow &&
                imageShow.length > 0 &&
                imageShow.map((img, i) => (
                  <div className="h-[180px] relative">
                    <label htmlFor={i}>
                      <img
                        className="w-full h-full rounded-sm"
                        src={img}
                        alt=""
                      />
                    </label>
                    <input
                      onChange={(e) => changeImage(img, e.target.files)}
                      type="file"
                      id={i}
                      className="hidden"
                    />
                    {/* <span
                    onClick={() => removeImage(i)}
                    className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                  >
                    <IoMdCloseCircle />
                  </span> */}
                  </div>
                ))}
            </div>

            <div className="flex gap-3">
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
                  "Save Changes"
                )}
              </button>
              <button
                onClick={deleteAgen}
                className=" group relative w-[280px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Agent
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAgent;
