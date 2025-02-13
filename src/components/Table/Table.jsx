import React from "react";
import Title from "../Title/Title";
import { tableData } from "../../constants";

const Table = () => {
  return (
    <div className="flex-1 rounded-xl bg-white p-5">
      <Title>Receipt</Title>
      <table className="min-w-full">
        <thead>
          <tr className="text-sm md:text-base">
            <th className="px-4 py-2 text-left font-semibold text-slate-400">
              ID
            </th>
            <th className="px-4 py-2 text-left font-semibold text-slate-400">
              Receipt Name
            </th>
            <th className="px-4 py-2 text-left font-semibold text-slate-400">
              Date
            </th>
            <th className="px-4 py-2 text-left font-semibold text-slate-400">
              Amount
            </th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((item) => (
            <tr className="border-b border-slate-200 text-sm md:text-base">
              <td className="px-4 py-3 font-medium">{item.id}</td>
              <td className="px-4 py-3 font-medium">{item.receiptName}</td>
              <td className="px-4 py-3 font-medium">{item.date}</td>
              <td className="px-4 py-3 font-medium">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
