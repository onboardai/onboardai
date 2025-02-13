import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import user01 from "../../images/user01.png";

const OrderDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show, setShow] = useState(false);
  const sellerId = 65;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
          <div className="w-full p-4 bg-blue-500 rounded-md">
            <div className="flex justify-between items-center p-4">
              <h2 className="text-xl text-white">Order Details</h2>
              <select
                name=""
                id=""
                className="px-4 py-2 focus:border-blue-700 outline-none bg-[#475569] border
            border-slate-700 rounded-md text-white"
              >
                <option value="">pending</option>
                <option value="">processing</option>
                <option value="">warehouse</option>
                <option value="">placed</option>
                <option value="">cancelled</option>
              </select>
            </div>
            <div className="p-4">
              <div className="flex gap-2 text-lg text-white">
                <h2>#34344</h2>
                <span>3 Jan 2024</span>
              </div>

              <div className="flex flex-wrap">
                <div className="w-[30%]">
                  <div className="pr-3 text-white text-lg">
                    <div className="flex flex-col gap-1">
                      <h2 className="pb-2 font-semibold">
                        Deliver To : Pratyush Joshi
                      </h2>
                      <p>
                        <span className="text-sm">
                          Cecilia ChapmanNulla St. Mankato Mississippi
                        </span>
                      </p>
                    </div>
                    <div className="flex justify-start items-center gap-3">
                      <h2>Payment Status: </h2>
                      <span className="text-base">Paid</span>
                    </div>
                    <span>Price : $232</span>

                    <div className="mt-4 flex flex-col gap-4 bg-[#B3DAFF] rounded-md">
                      <div className="text-white">
                        <div className="flex gap-3 text-md">
                          <img
                            className="w-[45px] h-[45px]"
                            src={user01}
                            alt=""
                          />

                          <div>
                            <h2>Product Name here</h2>
                            <p>
                              <span>Brand : </span>
                              <span>Easy</span>
                              <span className="text-lg">Quantity : 3</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-4 bg-[#B3DAFF] rounded-md">
                      <div className="text-white">
                        <div className="flex gap-3 text-md">
                          <img
                            className="w-[45px] h-[45px]"
                            src={user01}
                            alt=""
                          />

                          <div>
                            <h2>Product Name here</h2>
                            <p>
                              <span>Brand : </span>
                              <span>Easy</span>
                              <span className="text-lg">Quantity : 3</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-4 bg-[#B3DAFF] rounded-md">
                      <div className="text-white">
                        <div className="flex gap-3 text-md">
                          <img
                            className="w-[45px] h-[45px]"
                            src={user01}
                            alt=""
                          />

                          <div>
                            <h2>Product Name here</h2>
                            <p>
                              <span>Brand : </span>
                              <span>Easy</span>
                              <span className="text-lg">Quantity : 3</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-[70%]">
                  <div className="pl-3">
                    <div className="mt-4 flex flex-col bg-blue-200 rounded-md p-4">
                      <div className="text-white mt-2">
                        <div className="flex justify-start items-center gap-3">
                          <h2>Seller 1 Order : </h2>
                          <span>pending</span>
                        </div>
                        <div className="mt-4 flex flex-col gap-4 bg-[#B3DAFF] rounded-md">
                          <div className="text-white">
                            <div className="flex gap-3 text-md mt-2">
                              <img
                                className="w-[45px] h-[45px]"
                                src={user01}
                                alt=""
                              />

                              <div>
                                <h2>Product Name here</h2>
                                <p>
                                  <span>Brand : </span>
                                  <span>Easy</span>
                                  <span className="text-lg">Quantity : 3</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-white mt-2">
                        <div className="flex justify-start items-center gap-3">
                          <h2>Seller 1 Order : </h2>
                          <span>pending</span>
                        </div>
                        <div className="mt-4 flex flex-col gap-4 bg-[#B3DAFF] rounded-md">
                          <div className="text-white">
                            <div className="flex gap-3 text-md mt-2">
                              <img
                                className="w-[45px] h-[45px]"
                                src={user01}
                                alt=""
                              />

                              <div>
                                <h2>Product Name here</h2>
                                <p>
                                  <span>Brand : </span>
                                  <span>Easy</span>
                                  <span className="text-lg">Quantity : 3</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
