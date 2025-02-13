import React from "react";
import { Link } from "react-router-dom";

const AAorBO = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Leverage The Future of AI
            <br />
            with <span className="text-blue-600">OnboardedAI</span>
          </h1>
        </div>

        {/* Question Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Are you a Business Owner or an AI Agency Owner?
            </h2>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Business Owner Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-6">
              <svg
                className="w-16 h-16 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Business Owner
            </h3>
            <p className="text-gray-600 mb-6">
              Hire AI Agents as employees to enhance your business workflow and
              process.
            </p>
            <Link
              to={"/bo/register"}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* AI Agency Owner Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-center mb-6">
              <svg
                className="w-16 h-16 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              AI Agency Owner
            </h3>
            <p className="text-gray-600 mb-6">
              Post your AI Agents as business employees for companies to hire
              and partner with.
            </p>
            <Link
              to={"/seller/register"}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AAorBO;
