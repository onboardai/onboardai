import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/auth/AdminLogin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import Category from "./pages/admin/Category";
import Sellers from "./pages/admin/Sellers";
import PaymentRequest from "./pages/admin/PaymentRequest";
import AdminChats from "./pages/admin/AdminChats";
import OrderDetails from "./pages/admin/OrderDetails";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerProducts from "./pages/seller/SellerProducts";
import SellerUsers from "./pages/seller/SellerUsers";
import SellerSales from "./pages/seller/SellerSales";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerAnalytics from "./pages/seller/SellerAnalytics";
import SellerSettings from "./pages/seller/SellerSettings";
import SellerLogin from "./pages/auth/SellerLogin";
import SellerRegister from "./pages/auth/SellerRegister";
import { useDispatch, useSelector } from "react-redux";
import { get_user_info } from "./store/Reducers/authReducer";
import AddAgent from "./pages/seller/AddAgent";
import SellerAgents from "./pages/seller/SellerAgents";
import EditAgent from "./pages/seller/EditAgent";
import MySellerProfile from "./pages/seller/MySellerProfile";
import AAorBO from "./pages/AAorBO";
import AACreateProf from "./pages/seller/AACreateProf";
import AAProfilePg from "./pages/seller/AAProfilePg";
import AAEditProfile from "./pages/seller/AAEditProfile";
import AAChangePassword from "./pages/seller/AAChangePassword";
import BORegister from "./pages/auth/BORegister";
import BOCreateProf from "./pages/bo/BOCreateProf";
import { get_bo_info } from "./store/Reducers/boAuthReducer";
import BOLogin from "./pages/auth/BOLogin";
import BOSearchAgents from "./pages/bo/BOSearchAgents";
import BOAgentDescp from "./pages/bo/BOAgentDescp";
import BOChat from "./pages/bo/BOChat";
import AAChat from "./pages/seller/AAChat";
import BOProfilePg from "./pages/bo/BOProfilePg";
import BOEditProfile from "./pages/bo/BOEditProfile";
import BOChangePassword from "./pages/bo/BOChangePassword";
import HowItWorks from "./pages/HowItWorks";
import UseCasesPage from "./pages/UseCasesPage";
import BODashboard from "./pages/bo/BODashboard";
import AAPublicProfilePage from "./pages/seller/AAPublicProfilePage";
import BOHelpCent from "./pages/bo/BOHelpCent";
import AAAgentDescp from "./pages/seller/AAAgentDescp";
import BOPublicProfile from "./pages/bo/BOPublicProfile";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { boToken } = useSelector((state) => state.boAuth);

  useEffect(() => {
    if (token) {
      dispatch(get_user_info());
    }

    if (boToken) {
      dispatch(get_bo_info());
    }
  }, [token, boToken]);

  return (
    <div className="h-auto min-h-screen bg-gray-50 font-Rubik">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/usecases" element={<UseCasesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/sellers" element={<Sellers />} />
        <Route path="/admin/paymentreq" element={<PaymentRequest />} />
        <Route path="/admin/chats" element={<AdminChats />} />
        <Route path="/admin/orderdetails" element={<OrderDetails />} />

        {/* Seller Routes */}
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/products" element={<SellerProducts />} />
        <Route path="/seller/users" element={<SellerUsers />} />
        <Route path="/seller/sales" element={<SellerSales />} />
        <Route path="/seller/orders" element={<SellerOrders />} />
        <Route path="/seller/analytics" element={<SellerAnalytics />} />
        <Route path="/seller/settings" element={<SellerSettings />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/dashboard/add-agent" element={<AddAgent />} />
        <Route path="/seller/dashboard/agents" element={<SellerAgents />} />
        <Route
          path="/seller/dashboard/edit-agent/:agentId"
          element={<EditAgent />}
        />
        <Route path="/booraa" element={<AAorBO />} />
        <Route path="/seller/create" element={<AACreateProf />} />
        <Route path="/seller/dashboard/profile/" element={<AAProfilePg />} />
        <Route
          path="/seller/dashboard/edit-profile/"
          element={<AAEditProfile />}
        />
        <Route
          path="/seller/dashboard/change-password"
          element={<AAChangePassword />}
        />
        <Route path="/seller/dashboard/chat/" element={<AAChat />} />
        <Route path="/seller/dashboard/chat/:boId" element={<AAChat />} />
        <Route path="/seller/profile/:username" element={<AAPublicProfilePage />} />
        <Route path="/seller/agent/:agentId" element={<AAAgentDescp />} />

        {/* Business Owner Routes */}
        <Route path="/bo/register" element={<BORegister />} />
        <Route path="/bo/create" element={<BOCreateProf />} />
        <Route path="/bo/login" element={<BOLogin />} />
        <Route path="/bo/dashboard" element={<BODashboard />} />
        <Route
          path="/bo/dashboard/search-agents"
          element={<BOSearchAgents />}
        />
        {/* <Route path="/bo/dashboard/helpcent" element={<BOHelpCent />} /> */}
        <Route path="/bo/agent/:agentId" element={<BOAgentDescp />} />
        <Route path="/bo/dashboard/chat" element={<BOChat />} />
        <Route path="/bo/dashboard/chat/:sellerId" element={<BOChat />} />
        <Route path="/bo/dashboard/profile" element={<BOProfilePg />} />
        <Route path="/bo/dashboard/edit-profile/" element={<BOEditProfile />} />
        <Route path="/bo/profile/:username" element={<BOPublicProfile />} />
        <Route
          path="/bo/dashboard/change-password"
          element={<BOChangePassword />}
        />
      </Routes>
    </div>
  );
}

export default App;
