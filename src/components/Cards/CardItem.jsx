import React from "react";

const CardItem = ({ item }) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl 
    bg-white p-5 sm:flex-1">
      <div className="flex items-center gap-3">
        {item.icon}
        <h3 className="font-medium">{item.title}</h3>
      </div>
      <h1 className="text-2xl font-bold">{item.value}</h1>
    </div>
  );
};

export default CardItem;
