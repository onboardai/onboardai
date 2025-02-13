import React from "react";
import SellerSidebar from "../../components/Seller/Sidebar/SellerSidebar";
import SellerHeader from "../../components/Seller/Header/SellerHeader";
import OverviewCards from "../../components/Seller/Cards/OverviewCards";
import RevenueChart from "../../components/Seller/Charts/RevenueChart";
import ChannelPerformance from "./../../components/Seller/Charts/ChannelPerformance";
import ProductPerformance from "./../../components/Seller/Charts/ProductPerformance";
import UserRetention from "./../../components/Seller/Charts/UserRetention";
import CustomerSegmentation from "./../../components/Seller/Charts/CustomerSegmentation";

const SellerAnalytics = () => {
  return (
    <div className="flex">
      <SellerSidebar />
      <div className="flex-1 overflow-auto relative z-10 bg-white">
        <SellerHeader title={"Analytics Dashboards"} />

        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <OverviewCards />
          <RevenueChart />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ChannelPerformance />
            <ProductPerformance />
            <UserRetention />
            <CustomerSegmentation />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerAnalytics;
