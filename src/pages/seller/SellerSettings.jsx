import React from "react";
import SellerSidebar from "../../components/Seller/Sidebar/SellerSidebar";
import SellerHeader from "../../components/Seller/Header/SellerHeader";
import SellerProfile from "../../components/Seller/Settings/SellerProfile";
import SellerNotifications from "../../components/Seller/Settings/SellerNotifications";
import SellerSecurity from './../../components/Seller/Settings/SellerSecurity';
import SellerConnectedAccounts from './../../components/Seller/Settings/SellerConnectedAccounts';
import SellerDangerZone from './../../components/Seller/Settings/SellerDangerZone';

const SellerSettings = () => {
  return (
    <div className="flex">
      <SellerSidebar />
      <div className="flex-1 overflow-auto relative z-10 ">
        <SellerHeader title={"Settings"} />
        <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
            <SellerProfile />
            <SellerNotifications />
            <SellerSecurity />
            <SellerConnectedAccounts />
            <SellerDangerZone />
        </main>
      </div>
    </div>
  );
};

export default SellerSettings;
