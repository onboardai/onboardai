import React, { forwardRef, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { FixedSizeList as List } from "react-window";
import { FaEdit, FaEye, FaImage, FaTrash } from "react-icons/fa";
import Pagination from "../../Pagination";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
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

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">$3434</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-blue-500 text-white rounded-md text-sm">
            Pending
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap"> 25 Dec 2023 </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <button className="bg-blue-500 shadow-lg hover:shadow-blue-500/50 px-3 py-[2px] cursor-pointer text-white rounded-sm text-sm">
            Confirm
          </button>
        </div>
      </div>
    );
  };

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
            <h2 className="text-xl font-medium pb-5 text-black">
              Withdrawal Request
            </h2>
            <div className="overflow-x-auto">
              <div className="flex bg-[#B3DAFF] uppercase text-xs font-bold min-w-[340px]">
                <div className="w-[25%] p-2"> No </div>
                <div className="w-[25%] p-2"> Amount </div>
                <div className="w-[25%] p-2"> Status </div>
                <div className="w-[25%] p-2"> Date </div>
                <div className="w-[25%] p-2"> Action </div>
              </div>
              {
                <List
                  style={{ minWidth: "340px" }}
                  className="List"
                  height={350}
                  itemCount={100}
                  itemSize={35}
                  outerElementType={outerElementType}
                >
                  {Row}
                </List>
              }
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

export default PaymentRequest;
