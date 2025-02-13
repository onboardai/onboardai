import React from "react";
import SellerSidebar from "../../components/Seller/Sidebar/SellerSidebar";
import SellerHeader from "../../components/Seller/Header/SellerHeader";
import { motion } from "framer-motion";
import StatCard from "../../components/Seller/Cards/StatCard";
import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { orderStats } from "../../constants";
import DailyOrders from "./../../components/Seller/Charts/DailyOrders";
import OrderDistribution from "./../../components/Seller/Charts/OrderDistribution";
import OrdersTable from "../../components/Seller/Tables/OrdersTable";

const SellerOrders = () => {
  return (
    <div className="flex">
      <SellerSidebar />
      <div className="flex-1 relative z-10 overflow-auto">
        <SellerHeader title={"Orders"} />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total Orders"
              icon={ShoppingBag}
              value={orderStats.totalOrders}
              color="#6366F1"
            />
            <StatCard
              name="Pending Orders"
              icon={Clock}
              value={orderStats.pendingOrders}
              color="#F59E0B"
            />
            <StatCard
              name="Completed Orders"
              icon={CheckCircle}
              value={orderStats.completedOrders}
              color="#10B981"
            />
            <StatCard
              name="Total Revenue"
              icon={DollarSign}
              value={orderStats.totalRevenue}
              color="#EF4444"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <DailyOrders />
            <OrderDistribution />
          </div>

          <OrdersTable />
        </main>
      </div>
    </div>
  );
};

export default SellerOrders;
