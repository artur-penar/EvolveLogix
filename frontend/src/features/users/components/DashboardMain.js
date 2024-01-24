import React from "react";
import LogSelector from "./LogSelector";
import UserDetails from "./UserDetails";
import "./DashboardMain.css";
import StrengthRecords from "./StrengthRecord";

const Main = ({ trainingLogs, selectedLog, handleChange, userDetail }) => (
  <>
    <div className="log-selector-container">
      <h2 className="dashboard-subtitle" style={{ width: "40%" }}>
        Current log:
      </h2>
      <LogSelector
        trainingLogs={trainingLogs}
        selectedLog={selectedLog}
        handleChange={handleChange}
      />
    </div>
    <div className="details-container">
      <UserDetails userDetail={userDetail} />
      <StrengthRecords userDetail={userDetail} />
    </div>
  </>
);

export default Main;