import React from "react";
import "../styles/style.css";

const RedLine = ({ start }) => {
  const halfImageWidth = 50; // Assuming the image is 100px in width.
  const halfImageHeight = 50; // Assuming the image is 100px in height.

  const lineStyle = {
    position: "absolute",
    top: `calc(${start.y} - ${halfImageHeight}px)`, // Adjusting by half the image's height to start from the center.
    left: `calc(${start.x} - ${halfImageWidth}px)`, // Adjusting by half the image's width to start from the center.
    width: "0",
    height: "3px",
    backgroundColor: "red",
    transform: `rotate(-45deg)`, // 45 degrees ensures a line from bottom-left to top-right.
    transformOrigin: "0% 100%", // Start the rotation from the bottom-left.
    animation: "expandLine 1s forwards",
  };
  return <div className="red-line" style={lineStyle}></div>;
};

export default RedLine;
