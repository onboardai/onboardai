import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FaEdit, FaEye, FaImage, FaTrash } from "react-icons/fa";
import Pagination from "../../Pagination";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";

const Sellers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

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

  return (
    <>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
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
                      Payment Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide divide-gray-700">
                  {sellerData.map((seller) => (
                    <tr key={seller.id}>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                        {seller.id}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                        <img
                          className="w-[45px] h-[45px]"
                          src={seller.img}
                          alt=""
                        />
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                        {seller.name}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-white">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            seller.paystatus === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : seller.paystatus === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : seller.paystatus === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {seller.paystatus}
                        </span>
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                        {seller.email}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                        {seller.address}
                      </td>
                      <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-black">
                        <div className="flex justify-start items-center gap-4">
                          <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 text-white">
                            <FaEye />
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
        </main>
      </div>
    </>
  );
};

export default Sellers;
