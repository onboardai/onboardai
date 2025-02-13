import React from "react";
import SellerSidebar from "../../components/Seller/Sidebar/SellerSidebar";
import SellerHeader from "../../components/Seller/Header/SellerHeader";
import StatCard from "../../components/Seller/Cards/StatCard";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  BarChart2,
  DollarSign,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import CategoryChart from "../../components/Seller/Charts/CategoryChart";
import SalesTrendChart from "./../../components/Seller/Charts/SalesTrendChart";
import ProductsTable from "../../components/Seller/Tables/ProductsTable";

const SellerProducts = () => {
  return (
    <div className="flex">
      <SellerSidebar />
      <div className="flex-1 overflow-auto relative z-10">
        <SellerHeader title="Products" />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          {/* STATS */}
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              name="Total Products"
              icon={Package}
              value={1234}
              color="#3b82f6"
            />
            <StatCard
              name="Top Selling"
              icon={TrendingUp}
              value={89}
              color="#3b82f6"
            />
            <StatCard
              name="Low Stock"
              icon={AlertTriangle}
              value={23}
              color="#3b82f6"
            />
            <StatCard
              name="Total Revenue"
              icon={DollarSign}
              value={"$543,210"}
              color="#3b82f6"
            />
          </motion.div>

          <ProductsTable />

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SalesTrendChart />
            <CategoryChart />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerProducts;
