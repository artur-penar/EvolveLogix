import React from "react";
import "./PageHeader.css";

const Header = ({ headerContent }) => (
  <div className="header-container">
    <h1>{headerContent}</h1>
  </div>
);

export default Header;
