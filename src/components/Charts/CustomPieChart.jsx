import React from "react";
import Title from "../Title/Title";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { chartData01, chartData02 } from "../../constants";

const CustomPieChart = () => {
  return (
    <div
      className="h-96 rounded-xl bg-white p-5 
      sm:h-[450px] xl:w-[400px]"
    >
      <Title>Sales by category</Title>

      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData01}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            nameKey="name"
            label
          />
          <Pie
            data={chartData02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            nameKey="name"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
