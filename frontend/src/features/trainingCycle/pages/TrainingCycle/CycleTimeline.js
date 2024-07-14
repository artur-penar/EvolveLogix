import React, { useState } from "react";
import SmallCalendarComponent from "./components/SmallCalendar";

const CycleTimeline = ({
  mesocycleStartDate,
  mesocycleEndDate,
  mesocycleDuration,
  phasesData,
}) => {
  // Calculate the existing duration from phasesData
  const [activePhase, setActivePhase] = useState(null);

  const handlePhaseClick = (phase) => {
    setActivePhase(phase);
  };

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
      case "Hypertrophy":
        return "green";
      case "Strength":
        return "yellow";
      case "Peak":
        return "red";
      case "Deload":
        return "aliceblue";
      default:
        return "white"; // Default color
    }
  };

  return (
    <>
      <div
        className="timeline"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          padding: "2rem",
        }}
      >
        <div
          className="total-duration"
          style={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "lightgray",
            width: `${mesocycleDuration * 90}px`,
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
                width: `${phase.duration * 90}px`,
                textAlign: "center",
              }}
              title={`Start: ${phase.start_date}, End: ${phase.end_date}`}
              onClick={() => handlePhaseClick(phase)}
            >
              <p>{phase.type}</p>
              <p>{phase.duration} weeks</p>
              {/* <p>{phase.start_date}</p>
            <p>{phase.end_date}</p> */}
            </div>
          ))}
        </div>
      </div>
      {activePhase && (
        <SmallCalendarComponent
          mesocycleStartDate={mesocycleStartDate}
          mesocycleEndDate={mesocycleEndDate}
          phasesData={phasesData}
          onClose={() => setActivePhase(null)}
        />
      )}
    </>
  );
};

export default CycleTimeline;
