import React from "react";
import UserDetails from "./UserDetails";
import Records from "./Records";
import "./UserInfoPanel.css";

const UserInfoPanel = ({ userDetails, strengthRecords }) => (
  <div className="details-container">
    <UserDetails userDetails={userDetails} />
    <Records
      strengthRecords={strengthRecords}
      simple={true}
      styleClassName={"body-measurements"}
    />
  </div>
);

export default UserInfoPanel;
