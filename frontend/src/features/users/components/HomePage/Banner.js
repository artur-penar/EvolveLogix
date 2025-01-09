import React from "react";
import BannerBackground from "./Assets/home-banner-background.png";
import BannerImage from "./Assets/home-banner-image.png";
import Eagle from "./Assets/eagle.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="home-container">
      {/* <Navbar /> */}
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="home-primary-heading">
            Design Your Training, Track Your Progress.
          </h1>
          <p className="home-primary-text">
            Stop struggling with scattered spreadsheets and generic workout
            plans. EvolveLogix empowers you to design and manage your training
            programs with precision, from the big picture down to the daily
            details.
          </p>
          <button className="secondary-button">
            Order Now <ArrowForwardIcon />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={Eagle} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;