import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { salesTrendData } from "../../../constants";

const SalesTrendChart = () => {
  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-black">Sales Trend</h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={salesTrendData}>
            <XAxis dataKey="month" stroke="#00000" />
            <YAxis stroke="#00000" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#6366F1",
                borderColor: "#4B5563",
                color: "#ffffff",
              }}
              itemStyle={{ color: "#E5E0007EB" }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8B5CF6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesTrendChart;
