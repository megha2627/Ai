import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <header className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 fixed w-full z-50 top-0">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left section: Logo */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-700 to-purple-800 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-500 drop-shadow-2xl">
            EntropyAI
          </h1>
        </div>

        {/* Right section: Navigation */}
        <nav className="flex items-center space-x-8">
          {["Home",  "Trial", "Pricing", "About Us"].map(
            (item) => (
              <a
                key={item}
                href={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className="text-white font-semibold text-lg relative group transition-all duration-300 hover:text-yellow-300"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-1 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
              </a>
            )
          )}
          <a
            href="/get-started"
            className="bg-gradient-to-r from-blue-700 to-purple-800 text-white font-semibold py-2 px-5 rounded-full hover:from-blue-800 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
