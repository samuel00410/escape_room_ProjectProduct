import React, { useContext } from "react";
import { Link } from "react-router-dom";
import preview_img from "../../../images/智慧獵人_紅衣小女孩_01.webp";
import { ReactComponent as PeopleIcon } from "../../../images/人數圖案.svg";
import { ReactComponent as PlayTimeIcon } from "../../../images/時鐘圖案.svg";
import AddToFavorites from "./AddToFavorites";
import { v4 as uuidv4 } from "uuid";
import { ThemeContext } from "../../../ThemeContext";

const HorrorItem = ({ item, currentMember }) => {
  // 假設 text 是從後端取得的字符串資料 (密室主題的介紹內文)
  const text = item.description;
  const serverURL = process.env.REACT_APP_SERVER_URL;
  const image_URL = `${serverURL}/${item.imageURL}`;
  const { setSelectedTheme } = useContext(ThemeContext); // 從 ThemeContext 抓取 setSelectedTheme()方法

  const handleSelect = () => {
    setSelectedTheme(item);
    localStorage.setItem("selectedTheme", JSON.stringify(item)); // 保存到 localStorage
  };

  return (
    <div className="theme_container">
      <div
        className="theme_preview"
        style={{ backgroundImage: `url(${image_URL})` }}
      >
        <div className="theme_preview_filter"></div>
        {/* 有登入會員的情況下才能加入收藏 */}
        {currentMember && (
          <AddToFavorites item={item} currentMember={currentMember} />
        )}
        <div className="content_container">
          <div className="content">
            <h3>{item.name}</h3>
            <p>
              {text.split(" ").map((str, index) => {
                const uniqueKey = uuidv4();
                return (
                  <span key={uniqueKey}>
                    {str}
                    {index != text.length - 1 && <br />}
                  </span>
                );
              })}
            </p>
          </div>
          <div className="intro_btn">
            <Link to={`/themeintro/${item.id}`}>遊戲介紹</Link>
            <Link to="/reserve" onClick={handleSelect}>
              前往預約
            </Link>
          </div>
        </div>
      </div>

      <div className="game_rule">
        <div className="rule_container">
          <ul className="players_container">
            <li>
              <span className="players_icon">
                <PeopleIcon />
              </span>
            </li>
            <li className="players_list">
              <span className="players_text">
                遊戲人數 : {item.minimumPlayers}-{item.maximumPlayers}人
              </span>
            </li>
          </ul>
          <div className="dotted_line"></div>
          <ul className="playtime_container">
            <li>
              <span className="playtime_icon">
                <PlayTimeIcon />
              </span>
            </li>
            <li className="playtime_list">
              <span className="playtime_text">
                遊戲時間 : {item.duration}分鐘
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HorrorItem;
