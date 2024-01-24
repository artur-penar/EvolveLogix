import React from "react";
import "./DashboardHeader.css";

const Header = ({ user }) => (
  <div className="header-container">
    <h3>Dashboard</h3>
    <h3>{user.email}</h3>
  </div>
);

export default Header;
