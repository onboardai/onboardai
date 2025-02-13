import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ name, icon: Icon, value, color }) => {
  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-300"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-black">
          <Icon size={20} className="mr-2" style={{ color }} />
          {name}
        </span>
        <p className="mt-2 text-2xl font-semibold text-black"> {value}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
