import React from "react";
import AboutBackground from "./Assets/about-background.png";
import Eagle from "./Assets/eagle2.png";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import "./About.css";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={Eagle} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="about-primary-heading">
          Structured Training for Optimal Results
        </h1>
        <p className="about-primary-text">
          EvolveLogix provides the tools to design, log, and track your training
          programs, including the ability to record strength records for various
          exercises.
        </p>
        <p className="about-primary-text">
          From macrocycles to individual workouts and personal bests, we
          simplify training management so you can focus on maximizing your
          performance.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          <button className="watch-video-button">
            <PlayCircleIcon fontSize="large" /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
