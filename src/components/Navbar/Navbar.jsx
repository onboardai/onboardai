import React, { useEffect, useState, useContext } from "react";
import { Link, Router } from "react-router-dom";
import { FaXmark, FaBars } from "react-icons/fa6";
import logo from "../../images/logo.png";

const Navbar = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // const handleScroll = () => {
    //   if (window.scrollY > 10) {
    //     setIsSticky(true);
    //   } else {
    //     setIsSticky(false);
    //   }
    // };
    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.addEventListener("scroll", handleScroll);
    // };
  });

  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "What is Mitini?", path: "/mitini" },
  ];

  const loggedInNavItems = [{ link: "Dashboard", path: "/dashboard" }];

  return (
    <div
      className={` ${
        props.chop
          ? "hidden"
          : "w-full bg-[#B3DAFF] md:bg-[#B3DAFF]  top-0 left-0 right-0"
      }`}
    >
      <nav className={`py-2 lg:px-14 px-4`}>
        <div className="flex justify-between items-center text-base gap-8">
          <a
            href="/"
            className="text-2xl font-semibold flex items-center space-x-3"
          >
            <img src={logo} alt="" className="w-16 inline-block items-center" />
          </a>

          {/* nav items for large devices */}
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link
                to={path}
                className="block text-base text-gray-900 hover:text-blue-700 cursor-pointer first:font-medium"
              >
                {link}
              </Link>
            ))}
          </ul>

          {/* btn for large devices */}
          <div className="space-x-4 hidden md:flex items-center">
            {/* <a
              href=""
              className="hidden lg:flex items-center text-mitini hover:text-gray-900"
            >
              Login
            </a> */}
            <button className="bg-gray-600 text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutral-600">
              Login
            </button>
            <button className="bg-gray-600 text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutral-600">
              Register
            </button>
          </div>

          {/* menu btn for only mobile devices */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-neutral-700 focus:outline-none focus:text-gray-500"
            >
              {isMenuOpen ? (
                <FaXmark className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6 " />
              )}
            </button>
          </div>
        </div>

        {/* nav items for mobile devices */}
        <div
          className={`md:hidden space-y-4 px-4 mt-20 py-7 bg-[#B3DAFF] ${
            isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
          }`}
        >
          {navItems.map(({ link, path }) => (
            <Link
              to={path}
              spy={true}
              smooth={true}
              offset={-100}
              key={path}
              className="block text-base text-white hover:text-blue-700 first:font-medium"
            >
              {link}
            </Link>
          ))}
          <button className="bg-gray-600 text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutral-600 mr-4">
            Login
          </button>
          <button className="bg-gray-600 text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutral-600">
            Login
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;