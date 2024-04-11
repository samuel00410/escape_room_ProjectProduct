import React, { useState, useEffect } from "react";
import loadingGif from "../images/Animation - 1712733876769.gif";

const Loading = () => {
  const [opacity, setOpacity] = useState(1);

  // 畫面渲染完後只執行一次
  useEffect(() => {
    // 在組件裝載後設置一個短暫延遲，然後開始淡出
    const timer = setTimeout(() => setOpacity(0), 800); // 給予一些時間確保轉場平滑

    // 當組件將要卸載時執行清理
    return () => clearTimeout(timer);
  }, []);

  const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#a8927c",
    transition: "opacity 0.5s ease-out",
    opacity: opacity, // 使用狀態控制透明度
  };

  return (
    <div style={loadingStyle}>
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default Loading;
