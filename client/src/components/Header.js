import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles/Header.css";
import { ReactComponent as EscapeLogo } from "../images/logo_man.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import DropdownMenu from "./DropdownMenu";
import AuthService from "../services/auth.service";

const Header = ({ currentMember, setCurrentMember }) => {
  const [activeLink, setActiveLink] = useState("/");
  const navRef = useRef();

  const handleActive = (path) => {
    setActiveLink(path);
    showNavbar();
  };

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header className="front_page">
      <div className="logo">
        <Link
          to="/"
          onClick={() => {
            handleActive("/");
          }}
          className={activeLink === "/" ? "active" : ""}
        >
          <EscapeLogo />
        </Link>
      </div>

      <nav className="nav-links" ref={navRef}>
        <ul>
          <li>
            <Link
              to="/"
              onClick={() => {
                handleActive("/");
              }}
              className={activeLink === "/" ? "active" : ""}
            >
              首頁
            </Link>
          </li>
          <li>
            <Link
              to="/aboutEscape"
              onClick={() => {
                handleActive("/aboutEscape");
              }}
              className={activeLink === "/aboutEscape" ? "active" : ""}
            >
              關於密室逃脫
            </Link>
          </li>
          <li>
            <Link
              to="/theme"
              onClick={() => {
                handleActive("/theme");
              }}
              className={activeLink === "/theme" ? "active" : ""}
            >
              密室主題
            </Link>
          </li>
          <li>
            <Link
              to="/appointment"
              onClick={() => {
                handleActive("/appointment");
              }}
              className={activeLink === "/appointment" ? "active" : ""}
            >
              線上預約
            </Link>
          </li>
          <li>
            <Link to="/escape_game">體驗逃脫小遊戲</Link>
          </li>
          {/* 沒有登入的狀況 */}
          {!currentMember && (
            <li>
              <Link
                className={`login ${activeLink === "/login" ? "active" : ""}`}
                to="/login"
                onClick={() => {
                  handleActive("/login");
                }}
              >
                登入/註冊
              </Link>
            </li>
          )}
          {/* 有登入的狀況 */}
          {currentMember && (
            <li>
              <DropdownMenu
                currentMember={currentMember}
                setCurrentMember={setCurrentMember}
              />
            </li>
          )}

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes color="#fff" />
          </button>
        </ul>
      </nav>

      <button className="nav-btn" onClick={showNavbar}>
        <FaBars color="#fff" />
      </button>
    </header>
  );
};

export default Header;
