import React from "react";
import Title from "../Title/Title";
import { recentActivities } from "../../constants";

const Activity = () => {
  return (
    <div className="rounded-xl bg-white p-5 xl:w-[400px]">
      <Title>Recent Activities</Title>
      <ul className="space-y-4">
        {recentActivities.map((activity) => (
          <li key={activity.id} className="flex items-center gap-4">
            <img
              src={activity.img}
              alt={activity.name}
              className="h-10 w-10 rounded-full border-2 border-teal-600"
            />
            <div>
              <h3 className="font-medium">{activity.name}</h3>
              <p className="text-sm text-slate-400">{activity.activity}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activity;
