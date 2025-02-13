import { FaAngleLeft, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoIosListBox } from "react-icons/io";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { PiChatsFill } from "react-icons/pi";
import { MdSettings, MdPayments, MdGroups3 } from "react-icons/md";
import {
  IoDocumentText,
  IoGitPullRequestSharp,
  IoLogOut,
} from "react-icons/io5";
import { HiQuestionMarkCircle } from "react-icons/hi2";
import { BiSolidCategory } from "react-icons/bi";
import {
  CiMoneyCheck1,
  CiMoneyBill,
  CiUser,
  CiShoppingCart,
} from "react-icons/ci";
import user01 from "../images/user01.png";
import user02 from "../images/user02.png";
import user03 from "../images/user03.png";
import user04 from "../images/user04.png";
import { BsPeopleFill } from "react-icons/bs";
import {
  BarChart2,
  DollarSign,
  Eye,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

export const AdminMenus = [
  {
    title: "Dashboard",
    src: <MdDashboard color="#1d4ed8" size={25} />,
    path: "/admin/dashboard",
  },
  {
    title: "Chats",
    src: <PiChatsFill color="#1d4ed8" size={25} />,
    path: "/admin/chats",
  },
  {
    title: "Orders",
    src: <IoIosListBox color="#1d4ed8" size={25} />,
    path: "/admin/orders",
  },
  {
    title: "Category",
    src: <BiSolidCategory color="#1d4ed8" size={25} />,
    path: "/admin/category",
  },
  {
    title: "Payment Requests",
    src: <MdPayments color="#1d4ed8" size={25} />,
    path: "/admin/paymentreq",
  },
  {
    title: "Sellers",
    src: <BsPeopleFill color="#1d4ed8" size={25} />,
    path: "/admin/sellers",
  },
  {
    title: "AI Agents",
    src: <MdGroups3 color="#1d4ed8" size={25} />,
    path: "#",
  },
  {
    title: "Seller Requests",
    src: <IoGitPullRequestSharp color="#1d4ed8" size={25} />,
    path: "#",
  },
  {
    title: "Settings",
    src: <MdSettings color="#1d4ed8" size={25} />,
    path: "#",
  },
  {
    title: "Logout",
    src: <IoLogOut color="#1d4ed8" size={25} />,
    path: "#",
    isLogout: true,
  },
];

export const dailySalesData = [
  {
    name: "Mon",
    sales: 1000,
  },
  {
    name: "Tue",
    sales: 1200,
  },
  {
    name: "Wed",
    sales: 900,
  },
  {
    name: "Thu",
    sales: 1100,
  },
  {
    name: "Fri",
    sales: 1300,
  },
  {
    name: "Sat",
    sales: 1600,
  },
  {
    name: "Sun",
    sales: 1400,
  },
];

export const salesStats = {
  totalRevenue: "$1,234,567",
  averageOrderValue: "$78.90",
  conversionRate: "3.45%",
  salesGrowth: "12.3%",
};

export const salesByCategory = [
  {
    name: "Electronics",
    value: 400,
  },
  {
    name: "Clothing",
    value: 300,
  },
  {
    name: "Home & Garden",
    value: 200,
  },
  {
    name: "Books",
    value: 100,
  },
  {
    name: "Others",
    value: 150,
  },
];

export const monthlySalesData = [
  {
    month: "Jan",
    sales: 4000,
  },
  {
    month: "Feb",
    sales: 3000,
  },
  {
    month: "Mar",
    sales: 5000,
  },
  {
    month: "Apr",
    sales: 4500,
  },
  {
    month: "May",
    sales: 6000,
  },
  {
    month: "Jun",
    sales: 5500,
  },
  {
    month: "Jul",
    sales: 7000,
  },
];

export const Menus = [
  {
    title: "Dashboard",
    src: <MdDashboard color="#1d4ed8" size={25} />,
    path: "/admin/dashboard",
  },
  {
    title: "Chats",
    src: <PiChatsFill color="#1d4ed8" size={25} />,
    path: "#",
  },
  {
    title: "My AI Agents",
    src: <IoIosListBox color="#1d4ed8" size={25} />,
    path: "#",
  },
  // {
  //   title: "Find AI Agents",
  //   src: "",
  // },
  // {
  //   title: "Browse AI Agencies",
  //   src: "",
  // },
  {
    title: "Hire AI Agents",
    src: <HiBuildingOffice2 color="#1d4ed8" size={25} />,
    path: "#",
  },
  {
    title: "Profile",
    src: <FaUser color="#1d4ed8" size={25} />,
    path: "#",
  },
  {
    title: "Settings",
    src: <MdSettings color="#1d4ed8" size={25} />,
    path: "#",
  },
  {
    title: "Documentation",
    src: <IoDocumentText color="#1d4ed8" size={25} />,
    path: "#",
  },
  {
    title: "Help",
    src: <HiQuestionMarkCircle color="#1d4ed8" size={25} />,
    path: "#",
  },
];

export const SellerMenus = [
  {
    title: "Dashboard",
    icon: BarChart2,
    color: "#3b82f6",
    path: "/seller/dashboard",
  },
  {
    title: "Products",
    icon: ShoppingBag,
    color: "#3b82f6",
    path: "/seller/products",
  },
  {
    title: "Users",
    icon: Users,
    color: "#3b82f6",
    path: "/seller/users",
  },
  {
    title: "Sales",
    icon: DollarSign,
    color: "#3b82f6",
    path: "/seller/sales",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    color: "#3b82f6",
    path: "/seller/orders",
  },
  {
    title: "Analytics",
    icon: TrendingUp,
    color: "#3b82f6",
    path: "/seller/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    color: "#3b82f6",
    path: "/seller/settings",
  },
];

export const dailyOrdersData = [
  {
    date: "07/01",
    orders: 45,
  },
  {
    date: "07/02",
    orders: 52,
  },
  {
    date: "07/03",
    orders: 49,
  },
  {
    date: "07/04",
    orders: 60,
  },
  {
    date: "07/05",
    orders: 55,
  },
  {
    date: "07/06",
    orders: 58,
  },
  {
    date: "07/07",
    orders: 62,
  },
];

export const orderStatusData = [
  {
    name: "Pending",
    value: 30,
  },
  {
    name: "Processing",
    value: 45,
  },
  {
    name: "Shipped",
    value: 60,
  },
  {
    name: "Delivered",
    value: 120,
  },
];

export const orderData = [
  {
    id: "ORD001",
    customer: "John Doe",
    total: 235.4,
    status: "Delivered",
    date: "2023-07-01",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    total: 412.0,
    status: "Processing",
    date: "2023-07-02",
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    total: 162.5,
    status: "Shipped",
    date: "2023-07-03",
  },
  {
    id: "ORD004",
    customer: "Alice Brown",
    total: 750.2,
    status: "Pending",
    date: "2023-07-04",
  },
  {
    id: "ORD005",
    customer: "Charlie Wilson",
    total: 95.8,
    status: "Delivered",
    date: "2023-07-05",
  },
  {
    id: "ORD006",
    customer: "Eva Martinez",
    total: 310.75,
    status: "Processing",
    date: "2023-07-06",
  },
  {
    id: "ORD007",
    customer: "David Lee",
    total: 528.9,
    status: "Shipped",
    date: "2023-07-07",
  },
  {
    id: "ORD008",
    customer: "Grace Taylor",
    total: 189.6,
    status: "Delivered",
    date: "2023-07-08",
  },
];

export const overviewData = [
  { name: "Revenue", value: "$1,234,567", change: 12.5, icon: DollarSign },
  { name: "Users", value: "45,678", change: 8.3, icon: Users },
  { name: "Orders", value: "9,876", change: -3.2, icon: ShoppingBag },
  { name: "Page Views", value: "1,234,567", change: 15.7, icon: Eye },
];

export const revenueData = [
  { month: "Jan", revenue: 4000, target: 3800 },
  { month: "Feb", revenue: 3000, target: 3200 },
  { month: "Mar", revenue: 5000, target: 4500 },
  { month: "Apr", revenue: 4500, target: 4200 },
  { month: "May", revenue: 6000, target: 5500 },
  { month: "Jun", revenue: 5500, target: 5800 },
  { month: "Jul", revenue: 7000, target: 6500 },
];

export const orderStats = {
  totalOrders: "1,234",
  pendingOrders: "56",
  completedOrders: "1,178",
  totalRevenue: "$98,765",
};

export const categoryData = [
  {
    name: "Electronics",
    value: 4500,
  },
  {
    name: "Clothing",
    value: 3200,
  },
  {
    name: "Home & Garden",
    value: 2800,
  },
  {
    name: "Books",
    value: 2100,
  },
  {
    name: "Sports & Outdoors",
    value: 1900,
  },
];

export const userActivityData = [
  {
    name: "Mon",
    "0-4": 20,
    "4-8": 40,
    "8-12": 60,
    "12-16": 80,
    "16-20": 100,
    "20-24": 30,
  },
  {
    name: "Tue",
    "0-4": 30,
    "4-8": 50,
    "8-12": 70,
    "12-16": 90,
    "16-20": 110,
    "20-24": 40,
  },
  {
    name: "Wed",
    "0-4": 40,
    "4-8": 60,
    "8-12": 80,
    "12-16": 100,
    "16-20": 120,
    "20-24": 50,
  },
  {
    name: "Thu",
    "0-4": 50,
    "4-8": 70,
    "8-12": 90,
    "12-16": 110,
    "16-20": 130,
    "20-24": 60,
  },
  {
    name: "Fri",
    "0-4": 60,
    "4-8": 80,
    "8-12": 100,
    "12-16": 120,
    "16-20": 140,
    "20-24": 70,
  },
  {
    name: "Sat",
    "0-4": 70,
    "4-8": 90,
    "8-12": 110,
    "12-16": 130,
    "16-20": 150,
    "20-24": 80,
  },
  {
    name: "Sun",
    "0-4": 80,
    "4-8": 100,
    "8-12": 120,
    "12-16": 140,
    "16-20": 160,
    "20-24": 90,
  },
];

export const salesChannelData = [
  {
    name: "Website",
    value: 45600,
  },
  {
    name: "Mobile App",
    value: 38200,
  },
  {
    name: "Marketplace",
    value: 29800,
  },
  {
    name: "Social Media",
    value: 18700,
  },
];

export const userDemographicsData = [
  {
    name: "18-24",
    value: 20,
  },
  {
    name: "25-34",
    value: 30,
  },
  {
    name: "35-44",
    value: 25,
  },
  {
    name: "45-54",
    value: 15,
  },
  {
    name: "55+",
    value: 10,
  },
];

export const userGrowthData = [
  {
    month: "Jan",
    users: 1000,
  },
  {
    month: "Feb",
    users: 1500,
  },
  {
    month: "Mar",
    users: 2000,
  },
  {
    month: "Apr",
    users: 3000,
  },
  {
    month: "May",
    users: 4000,
  },
  {
    month: "Jun",
    users: 5000,
  },
];

export const userData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Customer",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "Moderator",
    status: "Active",
  },
];

export const productData = [
  {
    id: 1,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 59.99,
    stock: 143,
    sales: 1200,
  },
  {
    id: 2,
    name: "Leather Wallet",
    category: "Accessories",
    price: 39.99,
    stock: 89,
    sales: 800,
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    stock: 56,
    sales: 650,
  },
  {
    id: 4,
    name: "Yoga Mat",
    category: "Fitness",
    price: 29.99,
    stock: 210,
    sales: 950,
  },
  {
    id: 5,
    name: "Coffee Maker",
    category: "Home",
    price: 79.99,
    stock: 78,
    sales: 720,
  },
];

export const userStats = {
  totalUsers: 152845,
  newUsersToday: 243,
  activeUsers: 98520,
  churnRate: "2.4%",
};

export const cardItems = [
  {
    title: "Total Earning",
    value: "$2200.00",
    icon: (
      <CiMoneyCheck1 className="rounded-full bg-blue-500 p-2 text-4xl text-white" />
    ),
  },
  {
    title: "Total Expenses",
    value: "$1200.00",
    icon: (
      <CiMoneyBill className="rounded-full bg-blue-500 p-2 text-4xl text-white" />
    ),
  },
  {
    title: "New Users",
    value: "150",
    icon: (
      <CiUser className="rounded-full bg-blue-500 p-2 text-4xl text-white" />
    ),
  },
  {
    title: "Total Sales",
    value: "320",
    icon: (
      <CiShoppingCart className="rounded-full bg-blue-500 p-2 text-4xl text-white" />
    ),
  },
];

export const monthData = [
  {
    name: "Jan",
    sales: 4000,
    revenue: 2400,
  },
  {
    name: "Feb",
    sales: 3000,
    revenue: 1398,
  },
  {
    name: "Mar",
    sales: 2000,
    revenue: 9800,
  },
  {
    name: "Apr",
    sales: 2780,
    revenue: 3908,
  },
  {
    name: "May",
    sales: 1890,
    revenue: 4800,
  },
  {
    name: "Jun",
    sales: 2390,
    revenue: 3800,
  },
  {
    name: "Jul",
    sales: 3490,
    revenue: 4300,
  },
];

export const chartData01 = [
  {
    name: "Electronics",
    value: 400,
  },
  {
    name: "Clothing",
    value: 300,
  },
  {
    name: "Groceries",
    value: 300,
  },
  {
    name: "Furniture",
    value: 200,
  },
];

export const chartData02 = [
  {
    name: "Laptops",
    value: 100,
  },
  {
    name: "Smartphones",
    value: 300,
  },
  {
    name: "Men's Wear",
    value: 100,
  },
  {
    name: "Women's Wear",
    value: 80,
  },
];

export const salesData = [
  {
    name: "Jul",
    sales: 4200,
  },
  {
    name: "Aug",
    sales: 3800,
  },
  {
    name: "Sep",
    sales: 5100,
  },
  {
    name: "Oct",
    sales: 4600,
  },
  {
    name: "Nov",
    sales: 5400,
  },
  {
    name: "Dec",
    sales: 7200,
  },
  {
    name: "Jan",
    sales: 6100,
  },
  {
    name: "Feb",
    sales: 5900,
  },
  {
    name: "Mar",
    sales: 6800,
  },
  {
    name: "Apr",
    sales: 6300,
  },
  {
    name: "May",
    sales: 7100,
  },
  {
    name: "Jul",
    sales: 7500,
  },
];

export const salesTrendData = [
  {
    month: "Jan",
    sales: 4000,
  },
  {
    month: "Feb",
    sales: 3000,
  },
  {
    month: "Mar",
    sales: 5000,
  },
  {
    month: "Apr",
    sales: 4500,
  },
  {
    month: "May",
    sales: 6000,
  },
  {
    month: "Jun",
    sales: 5500,
  },
];

export const tableData = [
  {
    id: 1,
    receiptName: "Payment Received",
    date: "2024-09-14",
    amount: "$500",
  },
  {
    id: 2,
    receiptName: "Refund Issued",
    date: "2024-09-13",
    amount: "$200",
  },
  {
    id: 3,
    receiptName: "Subscription",
    date: "2024-09-12",
    amount: "$150",
  },
  {
    id: 4,
    receiptName: "Product Sale",
    date: "2024-09-11",
    amount: "$300",
  },
];

export const recentActivities = [
  {
    id: 1,
    name: "John Doe",
    img: user01,
    activity: "Logged In",
  },
  {
    id: 2,
    name: "Jane Smith",
    img: user02,
    activity: "Made a Purchase",
  },
  {
    id: 3,
    name: "Alice Johnson",
    img: user03,
    activity: "Updated Profile",
  },
  {
    id: 4,
    name: "Bob Brown",
    img: user04,
    activity: "Logged Out",
  },
];
