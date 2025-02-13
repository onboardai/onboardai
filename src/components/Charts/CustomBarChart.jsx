import React from "react";
import Title from "../Title/Title";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { monthData } from "../../constants";

const CustomBarChart = () => {
  return (
    <div className="h-[450px] w-full rounded-xl bg-white p-5 pb-20 xl:flex-1">
      <Title>Sales and Revenue</Title>

      <ResponsiveContainer>
        <BarChart data={monthData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#60a5fa" /> 
          <Bar dataKey="revenue" fill="#1d4ed8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
