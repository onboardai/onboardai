import React from "react";
import {
  BarChart3,
  Megaphone,
  Banknote,
  Users,
  ClipboardList,
  UserCircle,
  Settings,
  Network,
  Menu,
} from "lucide-react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const DepartmentCard = ({ icon: Icon, title, agents }) => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
    <Icon className="w-6 h-6 text-blue-600 mb-3" />
    <h3 className="font-medium text-gray-900">{title}</h3>
    <p className="text-sm text-gray-500 mt-1">{agents} agents available</p>
  </div>
);

const AgentCard = ({ title, company, description, tags, fullTime = true }) => (
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{company}</p>
      </div>
      {fullTime && (
        <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full whitespace-nowrap ml-2">
          Full Time
        </span>
      )}
    </div>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const Home = () => {
  //     const { role } = useSelector((state) => state.auth);
  // if (role === "seller") return <Navigate to={"/seller/dashboard"} replace />;
  // else if (role === "admin")
  //   return <Navigate to={"/admin/dashboard"} replace />;
  // else return <Navigate to="/login" replace />;

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="relative px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-blue-600">
            <img src={logo} className="w-14 h-14" alt="" />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/usecases" className="text-gray-600 hover:text-gray-900">
              Use Cases
            </Link>
            <Link to="/howitworks" className="text-gray-600 hover:text-gray-900">
              How it Works
            </Link>
            <Link to={"/booraa"} className="text-blue-600 hover:text-blue-700">
              Log In
            </Link>
            <Link
              to={"/booraa"}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link to={"/usecases"} className="text-gray-600 hover:text-gray-900">
                Use Cases
              </Link>
              <Link to='/howitworks' className="text-gray-600 hover:text-gray-900">
                How it Works
              </Link>
              <Link
                to={"/booraa"}
                className="text-blue-600 hover:text-blue-700"
              >
                Log In
              </Link>
              <Link
                to={"/booraa"}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 py-12 sm:py-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          <span className="text-blue-600">Onboard</span> the AI Agents to
          <br className="hidden sm:block" />
          your Business
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
          Hire the perfect AI Agents for your business from the top AI Agencies
          in the world to automate any and every part of your workflow
        </p>
        <Link
          to={"/booraa"}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium"
        >
          Hire My AI Agents
        </Link>
      </div>

      {/* Departments Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold">Explore by departments</h2>
          <Link
            to="/booraa"
            className="text-blue-600 hover:text-blue-700 whitespace-nowrap"
          >
            Explore →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <DepartmentCard icon={BarChart3} title="Sales" agents="15" />
          <DepartmentCard icon={Megaphone} title="Marketing" agents="25" />
          <DepartmentCard icon={Banknote} title="Finance" agents="12" />
          <DepartmentCard icon={Users} title="Human Resource" agents="18" />
          <DepartmentCard icon={ClipboardList} title="Research" agents="10" />
          <DepartmentCard
            icon={UserCircle}
            title="Customer Support"
            agents="24"
          />
          <DepartmentCard icon={Settings} title="Operations" agents="17" />
        </div>
      </div>

      {/* Workflow Section */}
      <div className="text-center px-4 sm:px-6 py-12 sm:py-16 bg-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16">
          Automate Your
          <br />
          Workflow
        </h2>
        <div className="max-w-lg mx-auto">
          <Network className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-12 sm:mb-16" />
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            AGENTS FROM AI AGENCIES
          </h3>
          <p className="text-gray-600 mb-8">
            Connecting businesses looking for AI solutions to the AI Agents from
            various Automation Agencies from all around the world.
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-20 my-12 sm:my-20">
          <div>
            <div className="text-2xl sm:text-3xl font-bold">&gt;30%</div>
            <div className="text-sm text-gray-600">
              OF NET INCOME LOST
              <br />
              DUE TO INEFFICIENCY
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold">7X</div>
            <div className="text-sm text-gray-600">
              REVENUE INCREASE
              <br />
              FROM AUTOMATION
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold">10000+</div>
            <div className="text-sm text-gray-600">
              BUSINESSES ALREADY UP
              <br />
              ON AUTOMATIONS
            </div>
          </div>
        </div>

        <Link
          to="/booraa"
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium"
        >
          Find My AI Agents
        </Link>
      </div>

      {/* Featured Agents Section */}
      {/* <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold">Featured Agents</h2>
          <a
            href="#"
            className="text-blue-600 hover:text-blue-700 whitespace-nowrap"
          >
            Show all agents →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <AgentCard
            title="Call Assistant AI Agent"
            company="Luna Automation"
            description="Automate customer service calls with our AI agent that handles inquiries efficiently"
            tags={["Customer Support", "Sales"]}
          />
          <AgentCard
            title="Lead Generation Automation"
            company="LeadGen AI Agency"
            description="Build your sales pipeline by automating lead generation and qualification"
            tags={["Sales", "Marketing"]}
          />
          <AgentCard
            title="Invoice Processing Agent"
            company="SparkAI Solutions"
            description="Streamline your finance operations with our invoice processing process"
            tags={["Finance"]}
          />
          <AgentCard
            title="Recruiter AI Assistant"
            company="TalentAI"
            description="Streamline your hiring process automating sourcing, and interview scheduling"
            tags={["Human Resource"]}
          />
        </div>
      </div> */}

      {/* Help Section */}
      <div className="bg-blue-50 px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            How can
            <br />
            OnboardedAI
            <br />
            help you?
          </h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              Optimized Business Operations
            </div>
            <div className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              Recruit AI Employees Team
            </div>
            <div className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              Unified Bridge for Businesses and Agencies
            </div>
            <div className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              Further Partnerships & Growth
            </div>
            <div className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
              Global Scalability & Market Expansion
            </div>
          </div>
          <Link to={"/booraa"}>
            <button className="text-blue-600 hover:text-blue-700 mt-8">
              Check OnboardedAI →
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
