import React, { useState } from "react";
import { motion } from "framer-motion"; // Framer Motion for additional animation effects

// Importing images from a local folder
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import Footer from "../Footer2";
import Navbar1 from "../components/Navbar1/Navbar1";

const images = [img1, img2, img3, img4, img5, img6, img7];

const Gallery2 = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <>
    <Navbar1/>
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="sm:text-4xl font-bold text-center mb-12 text-gray-700">Image Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300"
            onHoverStart={() => setHovered(index)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{
              scale: 1.05,
              rotate: 5,
              transition: { duration: 0.3 },
            }}
          >
            <img
              src={img}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-full object-cover rounded-lg transform transition-all duration-500"
            />
            {hovered === index && (
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-xl font-semibold opacity-0 transition-opacity duration-300 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p>Image {index + 1}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      <Footer/>
    </div>
    </>
  );
};

export default Gallery2;
