import React, { useState } from "react";
import { BarChart2, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SellerMenus } from "../../../constants";
import { Link } from "react-router-dom";

const SellerSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isOpen ? 256 : 80 }}
    >
      <div className="h-full bg-white bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-200">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-blue-700 hover:text-white transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SellerMenus.map((item, index) => (
            <Link key={index} to={item.path}>
              <motion.div className="flex items-center p-4 text-sm font-semibold rounded-lg hover:bg-gray-300 transition-colors mb-2">
                <item.icon
                  size={20}
                  style={{ color: item.color, minWidth: "20px" }}
                />

                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default SellerSidebar;
