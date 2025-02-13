import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MdDownload } from "react-icons/md";
import { FaEdit, FaImage, FaTrash } from "react-icons/fa";
import Pagination from "../../Pagination";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { overrideStyle } from "./../../utils/utils";
import { PropagateLoader } from "react-spinners";
import { categoryAdd } from "../../store/Reducers/categoryReducer";
import { useDispatch, useSelector } from "react-redux";

const Category = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector((state) => state.category);

  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  const [imageShow, setImage] = useState("");

  const [state, setState] = useState({
    name: "",
  });

  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const catData = [
    {
      id: "1",
      name: "Tshirts",
      status: "Delivered",
      img: "https://brand.assets.adidas.com/image/upload/v1717008412/Training_SS_24_Strength_global_Launch_What_shoes_should_you_wear_to_the_gym_image_Rapidmove_fc98ca311b.jpg",
    },
    {
      id: "2",
      name: "Tshirts",
      status: "Processing",
      img: "https://brand.assets.adidas.com/image/upload/v1717008412/Training_SS_24_Strength_global_Launch_What_shoes_should_you_wear_to_the_gym_image_Rapidmove_fc98ca311b.jpg",
    },
    {
      id: "3",
      name: "Tshirts",
      status: "Shipped",
      img: "https://brand.assets.adidas.com/image/upload/v1717008412/Training_SS_24_Strength_global_Launch_What_shoes_should_you_wear_to_the_gym_image_Rapidmove_fc98ca311b.jpg",
    },
    {
      id: "4",
      name: "Tshirts",
      status: "Pending",
      img: "https://brand.assets.adidas.com/image/upload/v1717008412/Training_SS_24_Strength_global_Launch_What_shoes_should_you_wear_to_the_gym_image_Rapidmove_fc98ca311b.jpg",
    },
    {
      id: "5",
      name: "Tshirts",
      status: "Delivered",
      img: "https://brand.assets.adidas.com/image/upload/v1717008412/Training_SS_24_Strength_global_Launch_What_shoes_should_you_wear_to_the_gym_image_Rapidmove_fc98ca311b.jpg",
    },
  ];

  const add_category = (e) => {
    e.preventDefault();
    dispatch(categoryAdd(state));
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 ${
          isOpen ? "md:ml-44" : "ml-16"
        } transition-all duration-300 relative z-10 overflow-auto pt-10`}
      >
        <div className="px-2 lg:px-7 pt-5">
          <div className="flex lg:hidden justify-between items-center mb-5 p-4 bg-[#B3DAFF] rounded-md">
            <h1 className="text-white font-semibold text-lg">Category</h1>
            <button
              onClick={() => setShow(true)}
              className="bg-red-500 shadow-lg hover:shadow-red-500/40 px-4  py-2 cursor-pointer text-white rounded-sm text-sm"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap w-full">
            <div className="w-full lg:w-7/12">
              <div className="bg-[#B3DAFF] bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <select
                    onChange={(e) => setParPage(parseInt(e.target.value))}
                    className="px-4 py-2 hover:border-blue-500 outline-none bg-[#B3DAFF] border border-slate-700 rounded-md text-black"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>
                  <input
                    type="text"
                    className="px-4 py-2 focus:border-blue-500 outline-none  bg-white border border-slate-700 rounded-md text-black"
                    placeholder="Search"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                          No
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                          Image
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide divide-gray-700">
                      {catData.map((cat) => (
                        <tr key={cat.id}>
                          <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                            {cat.id}
                          </td>
                          <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                            <img
                              className="w-[45px] h-[45px]"
                              src={cat.img}
                              alt=""
                            />
                          </td>
                          <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                            {cat.name}
                          </td>
                          <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-white">
                            <div className="flex justify-start items-center gap-4">
                              <Link className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50">
                                <FaEdit />
                              </Link>
                              <Link className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                                <FaTrash />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                  <Pagination
                    pageNumber={currentPage}
                    setPageNumber={setCurrentPage}
                    totalItem={50}
                    parPage={parPage}
                    showItem={3}
                  />
                </div>
              </div>
            </div>

            <div
              className={` w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
                show ? "right-0" : "-right-[340px]"
              } z-[9999] top-0 transition-all duration-500`}
            >
              <div className="w-full pl-5">
                <div className="bg-[#B3DAFF] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-black border border-gray-700">
                  <div
                    className="flex
                   justify-between items-center mb-4"
                  >
                    <h1 className="text-black font-semibold textxl mb-4 w-full text-center">
                      Add Category
                    </h1>

                    <div
                      onClick={() => setShow(false)}
                      className="block lg:hidden"
                    >
                      <IoMdCloseCircle />
                    </div>
                  </div>

                  <form onSubmit={add_category}>
                    <div className="flex flex-col w-full gap-1 mb-3 ">
                      <label>Category Name</label>
                      <input
                        value={state.name}
                        onChange={(e) =>
                          setState({ ...state, name: e.target.value })
                        }
                        className="px-4 py-2 focus:border-blue-500 outline-none  bg-white border border-slate-700 rounded-md text-black"
                        type="text"
                        id="name"
                        name="category_name"
                        placeholder="Category Name"
                      />
                    </div>

                    <div>
                      <label
                        className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-red-500 w-full border-white"
                        htmlFor="image"
                      >
                        <span>
                          <FaImage />
                        </span>
                      </label>
                      <input
                        className="hidden"
                        type="file"
                        name="image"
                        id="image"
                      />
                      <div className="mt-4">
                        <button
                          disabled={loader ? true : false}
                          type="submit"
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {loader ? (
                            <PropagateLoader
                              color="#ffffff"
                              cssOverride={overrideStyle}
                            />
                          ) : (
                            "Add Category"
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
