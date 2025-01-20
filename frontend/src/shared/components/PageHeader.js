import React from "react";
import "./PageHeader.css";

const Header = ({ headerContent }) => (
  <div className="header-container bg-page-header">
    <h1>{headerContent}</h1>
  </div>
);

export default Header;
