import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ currentMember, setCurrentMember }) => {
  const Location = useLocation();
  const noHeaderPaths = [
    "/reserve",
    "/choosedate",
    "/information",
    "/checkout",
    "/orderconfirm",
    "/reservationprocess",
    "/escape_game",
  ]; // 不要顯示<Header />的路徑

  const noFooterPaths = [
    "/login",
    "/register",
    "/member",
    "/reserve",
    "/choosedate",
    "/information",
    "/checkout",
    "/orderconfirm",
    "/reservationprocess",
    "/escape_game",
    "/addnewtheme",
    "/collectionRooms",
    "/reserveRooms",
  ]; // 不要顯示<Footer />的路徑

  return (
    <>
      {!noHeaderPaths.includes(Location.pathname) && (
        <Header
          currentMember={currentMember}
          setCurrentMember={setCurrentMember}
        />
      )}
      <Outlet />
      {!noFooterPaths.includes(Location.pathname) && <Footer />}
    </>
  );
};

export default Layout;
