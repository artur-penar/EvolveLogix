import React from "react";
import Layout from "shared/components/Layout";
import Banner from "features/users/components/HomePage/Banner";
import About from "features/users/components/HomePage/About";
import "./HomePage.css";
import Work from "features/users/components/HomePage/Work";
import Footer from "features/users/components/HomePage/Footer";
import Testimonial from "features/users/components/HomePage/Testimonial";

const HomePage = () => {
  return (
    <Layout title="EvolveLogix | Home" content="Home page.">
      <div className="home-page-container">
        <Banner />
        <About />
        <Work />
        <Testimonial />
        <Footer />
      </div>
    </Layout>
  );
};

export default HomePage;
