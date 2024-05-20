import React from "react";

const CycleTimeline = ({ trainingCycle }) => {
  const totalDuration = 12;

  const existingDuration = trainingCycle.reduce(
    (total, phase) => total + phase.duration,
    0
  );

  const remainingDuration = totalDuration - existingDuration;

  if (remainingDuration > 0) {
    trainingCycle.push({
      name: "Remaining",
      type: "remaining",
      duration: remainingDuration,
    });

  }

  const Timeline = ({ trainingCycle }) => (
    <div
      className="timeline"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Total weeks duration bar */}
      <div
        className="total-duration"
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "lightgray",
          width: `${totalDuration * 70}px`,
          textAlign: "center",
        }}
      >
        <p>Total: {totalDuration} weeks</p>
      </div>
      <div
        className="phases-duration"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {trainingCycle.map((phase, index) => (
          <Phase key={index} phase={phase} />
        ))}
      </div>
    </div>
  );

  const Phase = ({ phase }) => {
    let color;
    switch (phase.type) {
      case "hypertrophy":
        color = "green";
        break;
      case "strength":
        color = "yellow";
        break;
      case "peak":
        color = "red";
        break;
      case "deload":
        color = "aliceblue";
        break;
      default:
        color = "white"; // default color if phase type doesn't match any case
    }
    return (
      <div
        className={`phase phase-${phase.type}`}
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: color,
          width: `${phase.duration * 70}px`,
          textAlign: "center",
        }}
      >
        <p>{phase.name}</p>
        <p>{phase.duration} weeks</p>
      </div>
    );
  };

  const Week = ({ weekNumber }) => (
    <div className="week">Week {weekNumber}</div>
  );

  return <Timeline trainingCycle={trainingCycle} />;
};

export default CycleTimeline;
