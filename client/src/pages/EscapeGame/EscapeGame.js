import React, { useState } from "react";
import "./styles/style.css";
import blueshot from "../../images/Ellipse 1.svg";
import RedLine from "./components/RedLine";
import DescriptionBox from "./components/DescriptionBox";

const EscapeGame = () => {
  const [activeItem, setActiveItem] = useState(null); // 設定被追蹤的點擊按鈕

  return (
    <section className="wrapper">
      <section className="escape-game">
        <div
          className="blue-shot"
          id="document"
          onClick={() => {
            setActiveItem("document");
          }}
        >
          <img src={blueshot} alt="觸發點擊按鈕" />

          {/* 點擊到的特效顯示 (紅線、對話框) */}
          {activeItem == "document" && (
            <>
              <RedLine start={{ x: "120%", y: "150%" }}></RedLine>
              <DescriptionBox
                position={{ x: "110%", y: "-260%" }}
                activeItem={activeItem}
                content="是個說明文件,內容好像有跟行程有關..."
              ></DescriptionBox>
            </>
          )}
        </div>
        <div
          className="blue-shot"
          id="table"
          onClick={() => {
            setActiveItem("table");
          }}
        >
          <img src={blueshot} alt="觸發點擊按鈕" />

          {/* 點擊到的特效顯示 (紅線、對話框) */}
          {activeItem == "table" && (
            <>
              <RedLine start={{ x: "120%", y: "150%" }}></RedLine>
              <DescriptionBox
                position={{ x: "110%", y: "-260%" }}
                activeItem={activeItem}
                content="桌上好像有圖案..."
              ></DescriptionBox>
            </>
          )}
        </div>
        <div
          className="blue-shot"
          id="drawer"
          onClick={() => {
            setActiveItem("drawer");
          }}
        >
          <img src={blueshot} alt="觸發點擊按鈕" />

          {/* 點擊到的特效顯示 (紅線、對話框) */}
          {activeItem == "drawer" && (
            <>
              <RedLine start={{ x: "120%", y: "150%" }}></RedLine>
              <DescriptionBox
                position={{ x: "110%", y: "-260%" }}
                activeItem={activeItem}
                content="儲藏櫃裡面好像有東西..."
              ></DescriptionBox>
            </>
          )}
        </div>
        <div
          className="blue-shot"
          id="door"
          onClick={() => {
            setActiveItem("door");
          }}
        >
          <img src={blueshot} alt="觸發點擊按鈕" />

          {/* 點擊到的特效顯示 (紅線、對話框) */}
          {activeItem == "door" && (
            <>
              <RedLine start={{ x: "120%", y: "150%" }}></RedLine>
              <DescriptionBox
                position={{ x: "110%", y: "-260%" }}
                activeItem={activeItem}
                content="逃出,前往正式官網"
              ></DescriptionBox>
            </>
          )}
        </div>
        <div
          className="blue-shot"
          id="handle"
          onClick={() => {
            setActiveItem("handle");
          }}
        >
          <img src={blueshot} alt="觸發點擊按鈕" />

          {/* 點擊到的特效顯示 (紅線、對話框) */}
          {activeItem == "handle" && (
            <>
              <RedLine start={{ x: "120%", y: "150%" }}></RedLine>
              <DescriptionBox
                position={{ x: "110%", y: "-260%" }}
                activeItem={activeItem}
                content="好像有剛握過的痕跡..."
              ></DescriptionBox>
            </>
          )}
        </div>
        <div
          className="blue-shot"
          id="chair"
          onClick={() => {
            setActiveItem("chair");
          }}
        >
          <img src={blueshot} alt="觸發點擊按鈕" />

          {/* 點擊到的特效顯示 (紅線、對話框) */}
          {activeItem == "chair" && (
            <>
              <RedLine start={{ x: "120%", y: "150%" }}></RedLine>
              <DescriptionBox
                position={{ x: "110%", y: "-260%" }}
                activeItem={activeItem}
                content="摸起來還很溫熱，似乎有人坐過..."
              ></DescriptionBox>
            </>
          )}
        </div>
      </section>
    </section>
  );
};

export default EscapeGame;
