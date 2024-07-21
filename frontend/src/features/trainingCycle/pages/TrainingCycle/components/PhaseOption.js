import React from "react";

const PhaseOption = ({
  displayWeightInPercent,
  setDisplayWeightInPercent,
  displayRecords,
  setDisplayRecords,
  displayMesocycleTimeline,
  setDisplayMesocycleTimeline,
}) => {
  return (
    <div
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          textAlign: "center",
          borderBottom: "1px solid rgb(0, 0, 0, 0.1",
          padding: "0.5rem",
        }}
      >
        <h4>Options</h4>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "1rem",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={displayWeightInPercent}
            onChange={(e) => setDisplayWeightInPercent(e.target.checked)}
            style={{ marginRight: "0.5rem" }}
          />
          Weight in percent of 1RM
        </label>
        <label>
          <input
            type="checkbox"
            checked={displayRecords}
            onChange={(e) => setDisplayRecords(e.target.checked)}
            style={{ marginRight: "0.5rem" }}
          />
          Show Strength Records
        </label>
        <label>
          <input
            type="checkbox"
            checked={displayMesocycleTimeline}
            onChange={(e) => setDisplayMesocycleTimeline(e.target.checked)}
            style={{ marginRight: "0.5rem" }}
          />
          Mesocycle Timeline
        </label>
      </div>
    </div>
  );
};
export default PhaseOption;
