import React from "react";
import { Twitter, LinkedIn, YouTube, Facebook } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        {/* <div className="footer-logo-container">
          <img src={Logo} alt="" />
        </div> */}
        <div className="footer-icons">
          <Twitter />
          <LinkedIn />
          <YouTube />
          <Facebook />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>Quality</span>
          <span>Help</span>
          <span>Share</span>
        </div>
        <div className="footer-section-columns">
          <span>123-456-7890</span>
          <span>info@evolvelogix.com</span>
          <span>contact@evolvelogix.com</span>
          <span>support@evolvelogix.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
