import React from "react";
import EscapeRoomBackground from "../images/escape_room.jpg";

const ImageBackground = () => {
  const backgroundImageStyle = {
    minWidth: "100%",
    height: "60vw",
    position: "absolute",
    zIndex: "-100",
  };

  return (
    // 放置背景圖片
    <img src={EscapeRoomBackground} style={backgroundImageStyle} alt="" />
  );
};

export default ImageBackground;
