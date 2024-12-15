import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./footer2.css";

const Footer2 = () => {
  return (
    <footer className="py-28 bg-[#f7f7f7]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className=""
      >
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-4 justify-items-center container">
  {/* First Section */}
  <div className="space-y-4 max-w-[300px] side1 ">
  <h1 className="font-bold ">
    <span className="font-bodoni">VAASHI </span> Learning
  </h1>
  <p className="text-dark2">
    <span className="font-bodoni">VAASHI</span> is a student-led initiative
    focused on empowering underprivileged individuals through education,
    mentorship, and career guidance. Driven by a "students for students"
    model, it aims to address educational inequity and economic disparity,
    offering accessible support that transcends boundaries and promotes a
    more equitable future.
  </p>
</div>


  {/* Second Section */}
  <div className="grid grid-cols-3 lg:pl-10 gap-12 side2">
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Courses</h1> 
      <div className="text-dark2">
        <ul className="space-y-2 text-lg">
          <li className="hover:text-secondary duration-200">Class X</li>
          <li className="hover:text-secondary duration-200">Class XI</li>
          <li className="hover:text-secondary duration-200">Class XII</li>
        </ul>
      </div>
    </div>
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Links</h1>
      <div className="text-dark2">
        <ul className="space-y-2 text-lg">
          <Link to='/user/courses2'>
          <li className="cursor-pointer hover:text-secondary duration-200 lg:mb-2">
            Courses
          </li>
          </Link>
          <Link to='/user/gallery2'>
          <li className="cursor-pointer hover:text-secondary duration-200">
            Our Team
          </li>
          </Link>
        </ul>
      </div>
    </div>
  

  {/* Third Section */}
  <div className="lg:space-y-4 max-w-[300px] justify-items-start">
    <h1 className="follow font-bold justify-self-center md:text-xl lg:mb-5">Follow</h1>
    {/* Social Icons */}
    <div className="flex lg:space-x-4  gap-2">
      <a href="https://wa.me/917902298520?text=Hello" target="_blank">
        <FaWhatsapp className="cursor-pointer hover:text-primary hover:scale-105 duration-200 w-auto h-5 lg:w-auto lg:h-7" />
      </a>
      <a
        href="https://www.instagram.com/vaashi_learning_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==/"
        className="target_blank"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram className="cursor-pointer hover:text-primary hover:scale-105 duration-200 w-auto h-5 lg:w-auto lg:h-7" />
      </a>
      <a
        href="https://www.linkedin.com/company/vaashi/posts/?feedView=all"
        className="target_blank"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin className="cursor-pointer hover:text-primary hover:scale-105 duration-200 w-auto h-5 lg:w-auto lg:h-7" />
      </a>
    </div>
  </div>
  </div>

  {/* Fourth Section (Phone and Email) */}
  <div className="space-y-4 max-w-[300px] lg:ml-20 side3">
    <h1 className="text-sm font-bold">Contact Information</h1>
    <div className="text-dark2">
      <ul className="space-y-2 text-lg">
        <li >
          <span className="font-bold">Phone:</span> +91 7902298520
        </li>
        <li >
          <span className="font-bold">Email:</span> vaashi.org@gmail.com
        </li>
      </ul>
    </div>
  </div>
</div>

      </motion.div>
    </footer>
  );
};

export default Footer2;
