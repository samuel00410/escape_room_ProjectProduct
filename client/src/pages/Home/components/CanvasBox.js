import React, { useRef, useEffect, useState } from "react";
import Technology_circular from "../../../images/Ellipse 1.svg";

const CanvasBox = () => {
  console.log("執行CanvasBox function");

  const canvasRef = useRef(null);

  const handleMouseMove = (e) => {
    console.log(e);
    console.log(e.clientX);
    console.log(e.clientY);
  };

  useEffect(() => {
    console.log("執行useEffect Hooks");

    const canvas = canvasRef.current;
    const ctx = canvasRef.current.getContext("2d"); // 畫布上操作時，要將畫布改寫成方法
    // 加載 SVG 圖片
    const image = new Image();
    image.src = Technology_circular;

    // 在圖片加載完成後繪製到畫布上
    image.onload = () => {
      // ctx.drawImage(image, 770, 770);
      // ctx.drawImage(image, 1235, 610);
      // ctx.drawImage(image, 1480, 620);
      // ctx.drawImage(image, 1580, 830);
      // ctx.drawImage(image, 320, 425);
      // ctx.drawImage(image, 1200, 750);
      ctx.drawImage(image, 570, 790);
      ctx.drawImage(image, 1440, 1250);
    };
  }, []);

  return (
    <div onMouseMove={handleMouseMove}>
      {console.log("Render")}
      <canvas
        ref={canvasRef}
        style={
          {
            // position: "absolute",
            // zIndex: "1",
          }
        }
      ></canvas>
    </div>
  );
};

export default CanvasBox;
