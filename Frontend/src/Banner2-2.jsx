import React from "react";
import BannerPng from "./assets/banner.png";
import { motion } from "framer-motion";

const Banner22 = () => {
  return (
    <section>
      <div className="container py-14 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6 md:space-y-0">
        {/* Banner Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="text-center space-y-4 lg:max-w-[450px]">
            <h1 className="text-4xl font-bold">
            Any Doubts?
            </h1>
            <p className="text-dark2">
            Have any questions or need clarification? Our team is here to help! Don't hesitate to reach out and get the answers you need to move forward with confidence.
            </p>
            <a
              href="https://wa.me/917902298520?text=Hello"
              target="_blank"
              className="primary-btn !mt-8"
            >
              Ask Your Doubts
            </a>
          </div>
        </motion.div>
        {/* Banner Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            src={BannerPng}
            alt=""
            className="w-[350px] md:max-w-[450px] object-cover drop-shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner22;
