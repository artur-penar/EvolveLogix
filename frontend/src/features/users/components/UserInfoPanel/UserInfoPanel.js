import React from "react";
import UserDetailsPanel from "../UserDetails/UserDetailsPanel";
import StrengthRecordsPanel from "../StrengthRecordsPanel/StrengthRecordsPanel";
import "./UserInfoPanel.css";

const UserInfoPanel = ({ userDetails, strengthRecords }) => (
  <div className="details-container">
    <UserDetailsPanel userDetails={userDetails} />
    <StrengthRecordsPanel
      strengthRecords={strengthRecords}
      simple={true}
      styleClassName={"body-measurements"}
    />
  </div>
);

export default UserInfoPanel;
