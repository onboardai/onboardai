import React from "react";
import { CircleDot } from "lucide-react"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
            {/* Brand Section */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <CircleDot className="w-6 h-6 text-blue-500" />
                <span className="text-xl font-bold">OnboardedAI</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering businesses to hire AI agents for their processes
                globally. Streamline operations with cutting-edge AI solutions
                from the top AI Service Providers.
              </p>
            </div>

            {/* About Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    What is OnboardedAI?
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to={"/usecases"}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Use Cases
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/howitworks"}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
