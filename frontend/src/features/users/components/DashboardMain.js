import React from "react";
import LogSelector from "./LogSelector";
import UserDetails from "./UserDetails";
import "./DashboardMain.css";
import Records from "./StrengthRecords/Records";

const Main = ({
  trainingLogs,
  selectedLog,
  handleChange,
  userDetails,
  strengthRecords,
}) => (
  <>
    <div className="log-info">
      <LogSelector
        trainingLogs={trainingLogs}
        selectedLog={selectedLog}
        handleChange={handleChange}
      />
    </div>
    <div className="details-container">
      <UserDetails userDetails={userDetails} />
      <Records
        strengthRecords={strengthRecords}
        simple={true}
        styleClassName={"body-measurements"}
      />
    </div>
  </>
);

export default Main;
