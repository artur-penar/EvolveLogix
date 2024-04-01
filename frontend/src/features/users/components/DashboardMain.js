import React from "react";
import LogSelector from "./LogSelector";
import UserDetails from "./UserDetails";
import "./DashboardMain.css";
import StrengthRecords from "./StrengthRecords";

const Main = ({ trainingLogs, selectedLog, handleChange, userDetail, strengthRecords }) => (
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
      <StrengthRecords strengthRecords={strengthRecords} />
    </div>
  </>
);

export default Main;
