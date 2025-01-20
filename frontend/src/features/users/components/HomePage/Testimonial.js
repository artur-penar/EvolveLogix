import React from "react";
import ProfilePic from "./Assets/profile-image.png";
import StarIcon from "@mui/icons-material/Star";
import "./Testimonial.css";

const Testimonial = () => {
  const stars = () => {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      starArray.push(<StarIcon />);
    }
    return starArray;
  };
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="testimonial-primary-heading">What They Are Saying</h1>
      </div>
      <div className="testimonial-section-bottom">
        <img src={ProfilePic} alt="" />
        <p>
          EvolveLogix has completely streamlined my training process. Before, I
          was using messy spreadsheets and struggling to keep track of
          everything. Now, I can easily plan my workouts, log my progress, and
          see real results.
        </p>
        <div className="testimonials-stars-container">{stars()}</div>
        <h2>John Doe</h2>
      </div>
    </div>
  );
};

export default Testimonial;
