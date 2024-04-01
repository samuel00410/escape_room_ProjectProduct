import React from "react";

const DescriptionBox = ({ position, content, activeItem }) => {
  const lineLength = 100; // for example
  const dx = lineLength / Math.sqrt(2); // x distance based on 45-degree rotation
  const dy = -(lineLength / Math.sqrt(2)); // negative because the line is moving upwards

  const boxStyle = {
    position: "absolute",
    top: `calc(${position.y} + ${dy}px)`, // adjusted by the line's y change
    left: `calc(${position.x} + ${dx}px)`, // adjusted by the line's x change
    backgroundColor:
      activeItem === "door" ? "rgba(53,46,46,42%)" : "rgba(190,190,190,42%)",
    color: "#fff",
    width: "13rem",
    padding: "2rem",
    animation: "expandBox 2s forwards",
  };

  return (
    <div style={boxStyle}>
      {content.includes("正式官網") ? (
        <a href="/" style={{ color: "red" }}>
          {content.replace("正式官網", "")}
          正式官網
        </a>
      ) : (
        content
      )}
    </div>
  );
};

export default DescriptionBox;
