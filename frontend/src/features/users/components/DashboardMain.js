import React from "react";
import LogSelector from "./LogSelector";
import UserDetails from "./UserDetails";
import "./DashboardMain.css";
import Records from "./StrengthRecords/Records";

const Main = ({
  trainingLogs,
  selectedLog,
  handleChange,
  userDetail,
  strengthRecords,
}) => (
  <>
    <div
      className="log-selector-container"
      style={{
        display: "flex",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <h2 className="dashboard-subtitle" style={{ width: "100%" }}>
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
      <Records
        strengthRecords={strengthRecords}
        simple={true}
        styleClassName={"body-measurements"}
      />
    </div>
  </>
);

export default Main;
