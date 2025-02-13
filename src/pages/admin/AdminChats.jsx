import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { IoMdClose } from "react-icons/io";
import user01 from "../../images/user01.png";
import user02 from "../../images/user02.png";
import user03 from "../../images/user03.png";
import { FaList } from "react-icons/fa";

const AdminChats = () => {
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
        <div className="px-2 lg:px-7 py-5">
          <div className="w-full bg-blue-400 px-4 py-4 rounded-md h-[calc(100vh-140px)]">
            <div className="flex w-full h-full relative">
              <div
                className={`w-[280px] h-full absolute z-10 ${
                  show ? "-left-[16px]" : "-left-[336px]"
                } md:left-0 md:relative transition-all`}
              >
                <div className="w-full h-[calc(100vh-177px)] bg-[#B3DAFF] md:bg-transparent overflow-y-auto">
                  <div
                    className="flex
                   text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white"
                  >
                    <h2>Sellers</h2>
                    <span
                      onClick={() => setShow(!show)}
                      className="block cursor-pointer md:hidden"
                    >
                      <IoMdClose />
                    </span>
                  </div>
                  <div
                    className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-md 
                    cursor-pointer bg-[#B3DAFF]`}
                  >
                    <div className="relative">
                      <img
                        src={user01}
                        className="w-[38px] h-[38px] border-white border-2 max-w-[38px]  p-[2px] rounded-full"
                        alt=""
                      />
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    </div>

                    <div className="flex justify-center items-start flex-col w-full">
                      <div className="flex justify-between items-center w-full">
                        <h2 className="text-base font-semibold">
                          Abhilokeet Sherchan
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm 
                    cursor-pointer`}
                  >
                    <div className="relative">
                      <img
                        src={user02}
                        className="w-[38px] h-[38px] border-white border-2 max-w-[38px]  p-[2px] rounded-full"
                        alt=""
                      />
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    </div>

                    <div className="flex justify-center items-start flex-col w-full">
                      <div className="flex justify-between items-center w-full">
                        <h2 className="text-base font-semibold">
                          Pratyush Joshi
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm 
                    cursor-pointer`}
                  >
                    <div className="relative">
                      <img
                        src={user03}
                        className="w-[38px] h-[38px] border-white border-2 max-w-[38px]  p-[2px] rounded-full"
                        alt=""
                      />
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    </div>

                    <div className="flex justify-center items-start flex-col w-full">
                      <div className="flex justify-between items-center w-full">
                        <h2 className="text-base font-semibold">Liam Ottley</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
                <div className="flex justify-between items-center">
                  {sellerId && (
                    <div className="flex justify-start items-center gap-3">
                      <div className="relative">
                        <img
                          src={user01}
                          className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px]  p-[2px] rounded-full"
                          alt=""
                        />
                        <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                      </div>
                    </div>
                  )}
                  <div
                    onClick={() => setShow(!show)}
                    className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-slate-500 shadow-lg hover:shadow-slate-500/50 
                    justify-center cursor-pointer items-center text-white"
                  >
                    <span>
                      <FaList />
                    </span>
                  </div>
                </div>

                <div className="py-4">
                  <div className="bg-[#475569] h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                    <div className="w-full flex justify-start items-center">
                      <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-fu lg:max-w-[85%]">
                        <div>
                          <img
                            src={user01}
                            className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                            alt=""
                          />
                        </div>
                        <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm">
                          <span>How are you?</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex justify-end items-center">
                      <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-fu lg:max-w-[85%]">
                        <div className="flex justify-center items-start flex-col w-full bg-red-500 shadow-lg shadow-red-500/50 text-white py-1 px-2 rounded-sm">
                          <span>How are you?</span>
                        </div>
                        <div>
                          <img
                            src={user01}
                            className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex justify-start items-center">
                      <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-fu lg:max-w-[85%]">
                        <div>
                          <img
                            src={user01}
                            className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                            alt=""
                          />
                        </div>
                        <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm">
                          <span>I need some help</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <form className="flex gap-3">
                  <input
                    type="text"
                    className="w-full flex justify-between px-2 border border-gray-500 items-center py-[5px]
                    focus:border-gray-700 rounded-md outline-none bg-transparent text-white placeholder:text-white"
                    placeholder="Message..."
                  />
                  <button
                    className="shadow-lg bg-blue-700 hover:shadow-cyan-500/50 font-semibold w-[75px] h-[35px] 
                  rounded-md text-white flex justify-center items-center"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminChats;
