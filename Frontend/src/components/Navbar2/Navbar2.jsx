import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const NavbarMenu = [
  { id: 1, title: "All Courses", path: "courses" },
  { id: 2, title: "Add Course", path: "adminhome" },
  { id: 3, title: "All Students", path: "students" }
];

const Navbar2 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation after sign out

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Sign-out function
  const signOut = () => {
    // Remove authentication data (e.g., token, user data) from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page or homepage
    navigate("/login"); // Adjust the path to your login page
  };

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-20">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="container py-3 flex justify-between items-center"
        >
          {/* Logo section */}
          <div>
            <h1 className="font-bodoni font-medium text-3xl">VAASHI</h1>
            <p className="font-bodoni text-xs">Ignite Your Learning</p>
          </div>

          {/* Desktop Menu section */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-2 cursor-pointer">
              {NavbarMenu.map((menu) => (
                <li key={menu.id}>
                  <a
                    href={menu.path}
                    className="inline-block py-2 px-4 hover:text-secondary relative group"
                  >
                    <div className="w-2 h-2 bg-secondary absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
                    {menu.title}
                  </a>
                </li>
              ))}
              <button onClick={signOut} className="primary-btn">
                Sign Out
              </button>
            </ul>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden">
            <button onClick={toggleMobileMenu} className="text-4xl">
              {isMobileMenuOpen ? <IoMdClose /> : <IoMdMenu />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-white shadow-md w-full"
          >
            <ul className="flex flex-col items-center gap-4 py-4">
              {NavbarMenu.map((menu) => (
                <li key={menu.id}>
                  <a
                    href={menu.path}
                    className="block py-2 px-4 hover:text-secondary"
                    onClick={toggleMobileMenu} // Close menu on click
                  >
                    {menu.title}
                  </a>
                </li>
              ))}
              <button
                onClick={signOut}
                className="primary-btn w-1/2 text-center"
              >
                Sign Out
              </button>
            </ul>
          </motion.div>
        )}
      </nav>

      {/* Content below the fixed navbar */}
      <div className="pt-20 lg:pt-24">
        {/* The rest of your page content goes here */}
      </div>
    </>
  );
};

export default Navbar2;
