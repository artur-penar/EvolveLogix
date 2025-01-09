import React from "react";
import Calendar from "./Assets/calendar.jpg";
import BenchPress from "./Assets/bench-press.jpg";
import Trend from "./Assets/trend.png";
import {
  CalendarMonth, // For planning/macrocycles
  FitnessCenter, // For workouts/exercises
  Timeline, // For tracking progress/timeline
} from "@mui/icons-material";

import "./Work.css";

const Work = () => {
  const workInfoData = [
    {
      image: Calendar,
      title: "Plan Your Training",
      text: "Design structured training programs, from Macrocycles to Microcycles, ensuring a clear path to your fitness goals.",
    },
    {
      image: BenchPress,
      title: "Log Your Workouts",
      text: "Easily record your training sessions, including exercises, sets, reps, and weights, for detailed workout tracking.",
    },
    {
      image: Trend,
      title: "Track Your Progress",
      text: "Monitor your performance with training logs, strength records, and body measurements to visualize your achievements.",
    },
  ];

  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="work-primary-text">
          EvolveLogix simplifies training program design, workout logging, and
          progress tracking. Plan your training cycles, record your workouts,
          and monitor your achievements—all in one place.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
