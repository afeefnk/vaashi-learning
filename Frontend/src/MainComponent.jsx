import React from "react";
import Hero from "./components/Hero/Hero";
import Banner from "./components/Banner/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Banner2 from "./components/Banner/Banner2";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

const MainComponent = () => {
  return (
    <main className="overflow-x-hidden bg-white text-dark">
      <Navbar />
      <Hero />
      <Banner />
      <Subscribe />
      <Banner2 />
      <footer id="contactus">
      <Footer />
      </footer>
    </main>
  );
};

export default MainComponent;
