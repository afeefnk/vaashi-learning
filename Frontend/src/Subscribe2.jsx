import React from "react";
import { FaBell } from "react-icons/fa";
import BgImage from "./assets/bg.png";
import { motion } from "framer-motion";

const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Subscribe2 = () => {
  return (
    <section className="bg-[#f7f7f7] my-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        style={bgStyle}
        className="container py-24 md:py-48"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col justify-center"
        >
          <div className="text-center space-y-4 lg:max-w-[430px] mx-auto">
            <h1 className="text-4xl font-bold !leading-snug">
              100+ Students are learning from us
            </h1>
            <p>
            Unlock your potential with courses designed to inspire, educate, and empower students from all backgrounds. 
            Join us in building a brighter future!
            </p>
            <a
              href="https://www.instagram.com/vaashi_learning_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==/"
              className="primary-btn !mt-8 inline-flex items-center gap-4 group target_blank"
              target="_blank"
              rel="noopener noreferrer"
            >
               Follow Our Page
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Subscribe2;
