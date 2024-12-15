import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const NavbarMenu = [
  { id: 1, title: "Home", path: "home" },
  { id: 2, title: "All Courses", path: "courses2" },
  { id: 3, title: "Our Team", path: "gallery2" },  
];

const Navbar1 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();


  const handleMenuClick = (path) => {
    if (path.startsWith("#")) {
      const sectionId = path.slice(1); // Remove the '#' to get the ID
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
      }
    } else if (path === "home") {
      navigate("/user/home"); // Redirect to login if not authenticated
    } 
     else if (path === "courses2") {
      navigate("/user/courses2"); // Redirect to login if not authenticated
    } 
     else if (path === "gallery2") {
      navigate("/user/gallery2"); // Redirect to login if not authenticated
    } else {
      navigate(path); // Navigate to the intended path
    }
  };

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle sign out: clear token and navigate to login
  const handleSignOut = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to login page
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
                  <button
                    onClick={() => handleMenuClick(menu.path)}
                    className="inline-block py-2 px-4 hover:text-secondary relative group"
                  >
                    <div className="w-2 h-2 bg-secondary absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
                    {menu.title}
                  </button>
                </li>
              ))}
              {/* Sign Out button for desktop */}
              <button onClick={handleSignOut} className="primary-btn">
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
              {/* Sign Out button for mobile */}
              <button onClick={handleSignOut} className="primary-btn w-1/2 text-center">
                Sign Out
              </button>
            </ul>
          </motion.div>
        )}
      </nav>

      {/* Content below the fixed navbar */}
      <div className="pt-20 lg:pt-24">
      </div>
    </>
  );
};

export default Navbar1;
