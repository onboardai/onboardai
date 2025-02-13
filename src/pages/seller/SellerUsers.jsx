import React from "react";
import SellerSidebar from "../../components/Seller/Sidebar/SellerSidebar";
import SellerHeader from "../../components/Seller/Header/SellerHeader";
import { motion } from "framer-motion";
import StatCard from "../../components/Seller/Cards/StatCard";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { userStats } from "../../constants";
import UsersTable from "../../components/Seller/Tables/UsersTable";
import UserGrowthChart from "../../components/Seller/Charts/UserGrowthChart";
import UserActivityHeatmap from './../../components/Seller/Charts/UserActivityHeatmap';
import UserDemographicsChart from "../../components/Seller/Charts/UserDemographicsChart";

const SellerUsers = () => {
  return (
    <div className="flex">
      <SellerSidebar />
      <div className="flex-1 overflow-auto relative z-10">
        <SellerHeader title="Users Dashboard" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          {/* STATS */}
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total Users"
              icon={UsersIcon}
              value={userStats.totalUsers.toLocaleString()}
              color="#6366F1"
            />
            <StatCard
              name="New Users Today"
              icon={UserPlus}
              value={userStats.newUsersToday}
              color="#10B981"
            />
            <StatCard
              name="Active Users"
              icon={UserCheck}
              value={userStats.activeUsers.toLocaleString()}
              color="#F59E0B"
            />
            <StatCard
              name="Churn Rate"
              icon={UserX}
              value={userStats.churnRate}
              color="#EF4444"
            />
          </motion.div>

          <UsersTable />

          {/* USER CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <UserGrowthChart/>
            <UserActivityHeatmap />
            <UserDemographicsChart/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerUsers;
