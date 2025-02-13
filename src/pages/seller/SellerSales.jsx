import React from "react";
import SellerSidebar from "../../components/Seller/Sidebar/SellerSidebar";
import SellerHeader from "../../components/Seller/Header/SellerHeader";
import { motion } from "framer-motion";
import StatCard from "../../components/Seller/Cards/StatCard";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { salesStats } from "../../constants";
import SalesOverviewChart from "./../../components/Seller/Charts/SalesOverviewChart";
import SalesByCategoryChart from "./../../components/Seller/Charts/SalesByCategoryChart";
import DailySalesTrend from "./../../components/Seller/Charts/DailySalesTrend";

const SellerSales = () => {
  return (
    <div className="flex">
      <SellerSidebar />
      <div className="flex-1 overflow-auto relative z-10 ">
        <SellerHeader title={"Sales Dashboard"} />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          {/* SALES STATS */}

          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total Revenue"
              icon={DollarSign}
              value={salesStats.totalRevenue}
              color="#6366F1"
            />
            <StatCard
              name="Avg. Order Value"
              icon={ShoppingCart}
              value={salesStats.averageOrderValue}
              color="#10B981"
            />
            <StatCard
              name="Conversion Rate"
              icon={TrendingUp}
              value={salesStats.conversionRate}
              color="#F59E0B"
            />
            <StatCard
              name="Sales Growth"
              icon={CreditCard}
              value={salesStats.salesGrowth}
              color="#EF4444"
            />
          </motion.div>

          <SalesOverviewChart />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <SalesByCategoryChart />
            <DailySalesTrend />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerSales;
