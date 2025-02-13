import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MdDownload } from "react-icons/md";
import { FaEye, FaSearch } from "react-icons/fa";
import Pagination from "../../Pagination";

const AdminOrders = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const orderData = [
    {
      id: "ORD001",
      customer: "John Doe",
      total: 235.4,
      status: "Delivered",
      date: "2023-07-01",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      total: 412.0,
      status: "Processing",
      date: "2023-07-02",
    },
    {
      id: "ORD003",
      customer: "Bob Johnson",
      total: 162.5,
      status: "Shipped",
      date: "2023-07-03",
    },
    {
      id: "ORD004",
      customer: "Alice Brown",
      total: 750.2,
      status: "Pending",
      date: "2023-07-04",
    },
    {
      id: "ORD005",
      customer: "Charlie Wilson",
      total: 95.8,
      status: "Delivered",
      date: "2023-07-05",
    },
    {
      id: "ORD006",
      customer: "Eva Martinez",
      total: 310.75,
      status: "Processing",
      date: "2023-07-06",
    },
    {
      id: "ORD007",
      customer: "David Lee",
      total: 528.9,
      status: "Shipped",
      date: "2023-07-07",
    },
    {
      id: "ORD008",
      customer: "Grace Taylor",
      total: 189.6,
      status: "Delivered",
      date: "2023-07-08",
    },
    {
      id: "ORD008",
      customer: "Grace Taylor",
      total: 189.6,
      status: "Delivered",
      date: "2023-07-08",
    },
    {
      id: "ORD008",
      customer: "Grace Taylor",
      total: 189.6,
      status: "Delivered",
      date: "2023-07-08",
    },
    {
      id: "ORD008",
      customer: "Grace Taylor",
      total: 189.6,
      status: "Delivered",
      date: "2023-07-08",
    },
    {
      id: "ORD008",
      customer: "Grace Taylor",
      total: 189.6,
      status: "Delivered",
      date: "2023-07-08",
    },
    {
      id: "ORD008",
      customer: "Grace Taylor",
      total: 189.6,
      status: "Delivered",
      date: "2023-07-08",
    },
    {
      id: "ORD008",
      customer: "Grace Taylor",
      total: 189.6,
      status: "Delivered",
      date: "2023-07-08",
    },
    {
      id: "ORD008",
      customer: "Grace Taylor",
      total: 189.6,
      status: "Delivered",
      date: "2023-07-08",
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
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Actions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      <MdDownload />
                    </th>
                  </tr>
                </thead>

                <tbody className="divide divide-gray-700">
                  {orderData.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        <button className="text-black hover:text-indigo-300 mr-2">
                          <FaEye size={18} />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                        <button
                          onClick={(e) => setShow(!show)}
                          className="text-black hover:text-indigo-300 mr-2"
                        >
                          <MdDownload size={18} />
                        </button>
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

export default AdminOrders;
