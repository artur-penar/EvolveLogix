import React from "react";

const CycleTimeline = ({ mesocycleDuration, phasesData }) => {
  // Calculate the existing duration from phasesData
  const existingDuration = phasesData.reduce(
    (total, phase) => total + phase.duration,
    0
  );

  // Calculate the remaining duration
  const remainingDuration = mesocycleDuration - existingDuration;

  // If there's a remaining duration, add a "Remaining" phase
  if (remainingDuration > 0) {
    phasesData = [
      ...phasesData,
      { name: "Remaining", type: "remaining", duration: remainingDuration },
    ];
  }

  // Function to determine the color based on phase type
  const getPhaseColor = (type) => {
    switch (type) {
      case "hypertrophy":
        return "green";
      case "strength":
        return "yellow";
      case "peak":
        return "red";
      case "deload":
        return "aliceblue";
      default:
        return "white"; // Default color
    }
  };

  return (
    <div
      className="timeline"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div
        className="total-duration"
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "lightgray",
          width: `${mesocycleDuration * 70}px`,
          textAlign: "center",
        }}
      >
        <p>Total: {mesocycleDuration} weeks</p>
      </div>
      <div
        className="phases-duration"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {phasesData.map((phase, index) => (
          <div
            key={index}
            className={`phase phase-${phase.type}`}
            style={{
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: getPhaseColor(phase.type),
              width: `${phase.duration * 70}px`,
              textAlign: "center",
            }}
          >
            <p>{phase.type}</p>
            <p>{phase.duration} weeks</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CycleTimeline;
