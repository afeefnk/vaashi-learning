import { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "All Courses", path: "courses" },
  { id: 3, title: "Our Team", path: "gallery" },
  { id: 4, title: "Contact Us", path: "#contactus" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with actual auth state
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = (path) => {
    if (path.startsWith("#")) {
      const sectionId = path.slice(1); // Remove the '#' to get the ID
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the section
      }
    } else if (path === "courses" && !isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    } else if (path === "gallery") {
      navigate("/gallery"); // Redirect to login if not authenticated
    } else {
      navigate(path); // Navigate to the intended path
    }
  };

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white border-b-2 border-gray-100 z-20">
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
              <Link to="/login" className="primary-btn">
                Sign In
              </Link>
            </ul>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden">
            <button onClick={toggleMobileMenu} className="text-4xl">
              <motion.div
                key={isMobileMenuOpen ? "close" : "menu"}
                initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 180, scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <IoMdClose /> : <IoMdMenu />}
              </motion.div>
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
                  <button
                    onClick={() => handleMenuClick(menu.path)}
                    className="block py-2 px-4 hover:text-secondary"
                  >
                    {menu.title}
                  </button>
                </li>
              ))}
              <Link
                to="/login"
                className="primary-btn w-1/2 text-center"
              >
                Sign In
              </Link>
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

export default Navbar;
