import React from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const SellerDangerZone = () => {
  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center mb-4">
        <Trash2 className="text-red-400 mr-3" size={24} />
        <h2 className="text-xl font-semibold text-black">Danger Zone</h2>
      </div>
      <p className="text-black mb-4">
        Permanently delete your account and all of your content.
      </p>
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded 
      transition duration-200"
      >
        Delete Account
      </button>
    </motion.div>
  );
};

export default SellerDangerZone;
