import React from "react";
import "./styles/Footer.css";
import ContactUs from "../images/contactus.png";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <p>Copyright @ 2023 由翔翔團隊製作 | All Rights Reserved</p>
      <div>
        <p>連絡電話: +886 (02) 939318488</p>
        <p>聯絡信箱: samuel00410@gmail.com</p>
      </div>
      <img src={ContactUs} alt="聯絡我們" />
    </footer>
  );
};

export default Footer;
