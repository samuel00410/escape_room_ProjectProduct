import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import "./styles/DropdownMenu.css";

const DropdownMenu = ({ currentMember, setCurrentMember }) => {
  const [dropdown, setDropdown] = useState(false);

  const handleLogOut = () => {
    AuthService.logout();
    window.alert("登出成功! 現在您會被導向到首頁。");
    setCurrentMember(null);
  };

  return (
    <div className="dropdown">
      <Link
        className="dropbtn"
        onClick={() => {
          setDropdown(!dropdown);
        }}
      >
        <i class="fa-solid fa-circle-user"></i>
        使用者 {currentMember.member.userName}
        <i class="fa-solid fa-caret-down caret-btn"></i>
      </Link>

      <div className={`dropdown-content ${dropdown ? "drop-active" : ""}`}>
        {/* 身分為一般會員 */}
        {currentMember.member.role == "player" && (
          <>
            <Link
              to="/collectionRooms"
              className="content"
              onClick={() => setDropdown(false)}
            >
              我的收藏
            </Link>
            <Link
              to="/reserveRooms"
              className="content"
              onClick={() => setDropdown(false)}
            >
              預約密室
            </Link>
            <Link to="/" className="content" onClick={handleLogOut}>
              登出
            </Link>
          </>
        )}
        {/* 身分為密室創建者 */}
        {currentMember.member.role == "creator" && (
          <>
            <Link
              to="/addnewtheme"
              className="content"
              onClick={() => setDropdown(false)}
            >
              創建密室主題
            </Link>

            <Link to="/" className="content" onClick={handleLogOut}>
              登出
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
