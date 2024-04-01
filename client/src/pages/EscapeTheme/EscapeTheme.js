import React, { useState, useEffect } from "react";
import "./styles/EscapeTheme.css";
import backgroundImg from "../../images/modern-domestic-room-with-illuminated-wooden-desk-generated-by-ai.jpg";
import Scenery from "../../images/Rectangle_58.png";
import { ReactComponent as EscapeIcon } from "../../images/EscapeRoom_Logo.svg";
import List from "./components/List";
import styled from "@emotion/styled";
import ThemeService from "../../services/theme.service";

// 圖片背景
const BackgroundImg = styled.section`
  background-image: url(${backgroundImg});
  width: 100%;
  min-height: 100vh;
  background-position: center;
  background-size: cover;
  position: fixed;
  top: 0;
  z-index: -10;
  filter: blur(5px);
`;

const Body = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 設計的圖形佈景
const SceneryBackground = styled.section`
  background-image: url(${Scenery});
  background-size: cover;
  width: 90%;
  min-height: 90vh;
  padding: 5rem;
`;

// 逃脫小人Icon
const EscapeManIcon = styled(EscapeIcon)`
  width: 10%;
  height: 10%;
`;

const EscapeTheme = ({ currentMember }) => {
  const [currentTheme, setCurrentTheme] = useState(""); // 存放密室主題類型字條名稱(ex: "恐怖驚悚")
  const [themeItems, setThemeItems] = useState([]); // 存放密室主題的陣列

  // 監聽 currentTheme 的變化。當 currentTheme 更新時，將自動發出 Axios 請求來獲取相應的主題數據
  useEffect(() => {
    // 如果有選擇密室類型的話
    if (currentTheme) {
      ThemeService.searchTheme(currentTheme)
        .then((response) => {
          setThemeItems(response.data[0].escaperoomthemes);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      // 否則，抓取所有密室主題
      ThemeService.getAllTheme()
        .then((response) => {
          setThemeItems(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [currentTheme]);

  // 將點擊的主題分類內容，配置到 currentTheme 的狀態裡面
  const handleThemeClick = async (categoryName) => {
    setCurrentTheme(categoryName);
  };

  return (
    <Body>
      <BackgroundImg />
      <SceneryBackground>
        <section className="part-title">
          <div className="text-container">
            <h2>主題分類</h2>
            <div className="type-container">
              <div className="dividing_line"></div>
              <button
                className="theme-type"
                onClick={() => {
                  handleThemeClick("恐怖驚悚");
                }}
              >
                恐怖驚悚
              </button>
              <div className="dividing_line"></div>
              <button
                className="theme-type"
                onClick={() => {
                  handleThemeClick("偵探推理");
                }}
              >
                偵探推理
              </button>
              <div className="dividing_line"></div>
              <button
                className="theme-type"
                onClick={() => {
                  handleThemeClick("謎題邏輯");
                }}
              >
                謎題邏輯
              </button>
            </div>
            <EscapeManIcon />
          </div>
          <div className="hint">
            <p>【↓下滑看更多遊戲主題↓】</p>
          </div>
        </section>
        <section className="part-list-theme">
          <List
            themeItems={themeItems}
            currentTheme={currentTheme}
            currentMember={currentMember}
          ></List>
        </section>
      </SceneryBackground>
    </Body>
  );
};

export default EscapeTheme;
