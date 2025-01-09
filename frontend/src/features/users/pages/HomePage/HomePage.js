import React from "react";
import Layout from "shared/components/Layout";
import Banner from "features/users/components/HomePage/Banner";
import "./HomePage.css";

const HomePage = () => {
  return (
    <Layout title="EvolveLogix | Home" content="Home page.">
      <div className="home-page-container">
        <Banner />
      </div>
    </Layout>
  );
};

export default HomePage;
