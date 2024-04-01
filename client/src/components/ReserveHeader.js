import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { BiRun } from "react-icons/bi";
import "./styles/ReserveHeader.css";

const ReserveHeader = () => {
  const Location = useLocation();
  const ref = useRef(null);

  const handleBars = () => {
    ref.current.classList.toggle("active");
  };

  return (
    <header
      className={`${
        Location.pathname == "/choosedate" ? "nofixed" : "reserve-header"
      } `}
    >
      <nav className="container">
        <div className="pl-4 py-2">
          <Link to="/">
            <BiRun size={50} />
          </Link>
        </div>
        <ul
          ref={ref}
          className="flex items-center pr-10 text-base cursor-pointer"
        >
          <Link to="/">
            <li className="hover:bg-gray-200 py-4 px-6">官網</li>
          </Link>
          <Link to="/collectionRooms">
            <li className="hover:bg-gray-200 py-4 px-6">收藏密室</li>
          </Link>
          <Link to="/reserveRooms">
            <li className="hover:bg-gray-200 py-4 px-6">我的預約</li>
          </Link>
        </ul>
        <i className="fa-solid fa-bars" id="bars" onClick={handleBars}></i>
      </nav>
    </header>
  );
};

export default ReserveHeader;
