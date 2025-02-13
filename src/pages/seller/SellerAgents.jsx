import React, { useEffect, useState } from "react";
import Sidebar from "./../../components/Sidebar/Sidebar";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Pagination from "./../../Pagination";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_agents } from "../../store/Reducers/agentReducer";
import { Menu } from "lucide-react";
import SidebarSeller from "../compo/SidebarSeller";

const SellerAgents = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { agents, totalAgent } = useSelector((state) => state.agent);
  const { userInfo } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_agents(obj));
  }, [searchValue, currentPage, parPage]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sellerData = [
    {
      id: "1",
      name: "Tshirts",
      paystatus: "Delivered",
      email: "a.sherchankv19@gmail.com",
      address: "Kathmandu, Nepal",
      img: "https://brand.assets.adidas.com/image/upload/v1717008412/Training_SS_24_Strength_global_Launch_What_shoes_should_you_wear_to_the_gym_image_Rapidmove_fc98ca311b.jpg",
    },
    {
      id: "2",
      name: "Tshirts",
      paystatus: "Processing",
      email: "a.sherchankv19@gmail.com",
      address: "Kathmandu, Nepal",
      img: "https://brand.assets.adidas.com/image/upload/v1717008412/Training_SS_24_Strength_global_Launch_What_shoes_should_you_wear_to_the_gym_image_Rapidmove_fc98ca311b.jpg",
    },
    {
      id: "3",
      name: "Tshirts",
      paystatus: "Shipped",
      email: "a.sherchankv19@gmail.com",
      address: "Kathmandu, Nepal",
      img: "https://brand.assets.adidas.com/image/upload/v1717008412/Training_SS_24_Strength_global_Launch_What_shoes_should_you_wear_to_the_gym_image_Rapidmove_fc98ca311b.jpg",
    },
    {
      id: "4",
      name: "Tshirts",
      paystatus: "Pending",
      email: "a.sherchankv19@gmail.com",
      address: "Kathmandu, Nepal",
      img: "https://brand.assets.adidas.com/image/upload/v1717008412/Training_SS_24_Strength_global_Launch_What_shoes_should_you_wear_to_the_gym_image_Rapidmove_fc98ca311b.jpg",
    },
    {
      id: "5",
      name: "Tshirts",
      paystatus: "Delivered",
      email: "a.sherchankv19@gmail.com",
      address: "Kathmandu, Nepal",
      img: "https://brand.assets.adidas.com/image/upload/v1717008412/Training_SS_24_Strength_global_Launch_What_shoes_should_you_wear_to_the_gym_image_Rapidmove_fc98ca311b.jpg",
    },
  ];

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/booraa");
    }
  }, [navigate]);

  useEffect(() => {
    if (userInfo) {
      if (!userInfo?.agencyInfo) {
        navigate("/seller/create/");
      }
    }
  }, [userInfo, navigate]);

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
      <div
        className={`flex-1 ${
          isOpen ? "md:ml-44" : "ml-16"
        } transition-all duration-300 relative z-10 overflow-auto pt-10`}
      >
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
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
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                className="px-4 py-2 focus:border-blue-500 outline-none bg-white border border-slate-700 rounded-md text-black"
                type="text"
                placeholder="search"
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
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Price per hour
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Price per month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide divide-gray-700">
                  {agents.map((a, i) => (
                    <tr key={i}>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                        {i + 1}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                        <img
                          className="w-[45px] h-[45px]"
                          src={a.images[0]}
                          alt=""
                        />
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                        {a?.name?.slice(0, 15)}...
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                        {a.department}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                        ${a.pricePerHour}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                        ${a.pricePerMonth}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-white">
                        <div className="flex justify-start items-center gap-4">
                          <Link
                            to={`/seller/dashboard/edit-agent/${a._id}`}
                            className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                          >
                            <FaEdit />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalAgent <= parPage ? (
              ""
            ) : (
              <div className="w-full flex justify-end mt-4 bottom-4 right-4">
                <Pagination
                  pageNumber={currentPage}
                  setPageNumber={setCurrentPage}
                  totalItem={50}
                  parPage={parPage}
                  showItem={3}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerAgents;
