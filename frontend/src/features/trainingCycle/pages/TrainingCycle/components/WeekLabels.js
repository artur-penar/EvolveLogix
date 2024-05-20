import React from "react";

const WeekLabels = ({ weeksNumber }) =>
  Array.from(
    {
      length: weeksNumber,
    },
    (_, i) => i + 1
  ).map((week) => (
    <div key={week} className="week-label">
      <label>Week: {week}</label>
    </div>
  ));
export default WeekLabels;
