import React, { useState } from "react";
import styled from "@emotion/styled";
import Image from "../../images/Login&Register_img.png";
import AuthService from "../../services/auth.service";
import ThemeService from "../../services/theme.service";

// 背景
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${Image});
  background-size: cover;
  background-position: center;

  display: flex;
  justify-content: center;
  align-items: center;

  section.creator-setData {
    background: rgba(255, 255, 255, 0.25);
    padding: 2rem 3rem;
    border: 0.1rem solid #fff;

    div {
      text-align: center;
      font-size: 1.5rem;
    }

    form {
      padding: 1rem;
      display: flex;
      flex-direction: column;

      label {
        font-size: 1.25rem;
      }

      input {
        margin-bottom: 1.25rem;
      }

      div {
        text-align: left;

        label {
          padding: 0 0.5rem;
        }
      }

      button {
        margin-top: 1rem;
        border: 0.1rem solid black;
        background: #fff;
      }
    }
  }
`;

const AddNewTheme = ({ currentMember }) => {
  let [categoryName, setCategoryName] = useState("");
  let [themeName, setThemeName] = useState("");
  let [storyContent, setStoryContent] = useState("");
  let [description, setDescription] = useState("");
  let [roomFeatures, setRoomFeatures] = useState("");
  let [suitableFor, setSuitableFor] = useState("");
  let [difficultyLevel, setDifficultyLevel] = useState("");
  let [minimumPlayers, setMinimumPlayers] = useState("");
  let [maximumPlayers, setMaximumPlayers] = useState("");
  let [duration, setDuration] = useState("");
  let [price, setPrice] = useState("");
  let [image, setImage] = useState(null);
  let [slideImages, setSlideImages] = useState([]);
  let [isActive, setIsActive] = useState("true");

  let [message, setMessage] = useState(null); // 顯示成功的狀態
  let [error, setError] = useState(null); // 顯示錯誤訊息的狀態

  // 呼叫新增密室API
  const handleAddTheme = async () => {
    try {
      // 建立 FormData 物件
      const formData = new FormData();
      // 把資料都丟進formData裡
      formData.append("categoryName", categoryName); // formData 物件裡面的名為 categoryName 的屬性
      formData.append("themeName", themeName);
      formData.append("storyContent", storyContent);
      formData.append("description", description);
      formData.append("difficultyLevel", difficultyLevel);
      formData.append("minimumPlayers", minimumPlayers);
      formData.append("maximumPlayers", maximumPlayers);
      formData.append("duration", duration);
      formData.append("price", price);
      formData.append("isActive", isActive);
      // roomFeatures(密室特色) 和 suitableFor(適合對象)部分
      const details = JSON.stringify({
        roomFeatures: roomFeatures.split("\n"), // 將輸入的每一個字串換行都變成有序的陣列
        suitableFor: suitableFor.split("\n"), // 將輸入的每一個字串換行都變成有序的陣列
      });
      formData.append("details", details);

      if (image) {
        formData.append("image", image); // 確保當用戶沒有選擇任何文件時，不要將 "undefined" 或 null 值添加到 FormData 中。
      }
      if (slideImages.length > 0) {
        slideImages.forEach((file, index) => {
          formData.append("slideImages", file);
        });
      }

      let response = await ThemeService.addNewTheme(formData);
      if (response) {
        setMessage(response.data.msg);
        setError(null);
      }
    } catch (e) {
      console.log(e);
      if (e.response.data) {
        setError(e.response.data);
      }
    }
  };

  return (
    <Wrapper>
      {!currentMember && (
        <div className="alert alert-warning">
          如果您有創建者身分的帳戶，請先做登入。
        </div>
      )}

      {currentMember && currentMember.member.role == "creator" && (
        <section className="creator-setData">
          <div>選擇您要上傳的密室主題</div>
          <form>
            <label htmlFor="categoryName">類型</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
            />

            <label htmlFor="themeName">密室主題名稱</label>
            <input
              type="text"
              id="themeName"
              value={themeName}
              onChange={(e) => {
                setThemeName(e.target.value);
              }}
            />

            <label htmlFor="storyContent">故事內容</label>
            <textarea
              type="text"
              cols="30"
              rows="8"
              id="storyContent"
              value={storyContent}
              onChange={(e) => {
                setStoryContent(e.target.value);
              }}
            ></textarea>

            <label htmlFor="description">故事描述</label>
            <textarea
              id="description"
              cols="30"
              rows="6"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>

            <label htmlFor="roomFeatures">房間特色</label>
            <textarea
              id="roomFeatures"
              cols="30"
              rows="4"
              value={roomFeatures}
              onChange={(e) => setRoomFeatures(e.target.value)}
            />

            <label htmlFor="suitableFor">適合對象</label>
            <textarea
              id="suitableFor"
              cols="30"
              rows="4"
              value={suitableFor}
              onChange={(e) => setSuitableFor(e.target.value)}
            />

            <label htmlFor="difficultyLevel">難度</label>
            <select
              id="difficultyLevel"
              onChange={(e) => {
                setDifficultyLevel(e.target.value);
              }}
            >
              <option>請選擇難度</option>
              <option value="1">等級一</option>
              <option value="2">等級二</option>
              <option value="3">等級三</option>
              <option value="4">等級四</option>
              <option value="5">等級五</option>
              <option value="6">等級六</option>
            </select>

            <label htmlFor="minimumPlayers">至少幾位玩家</label>
            <select
              id="minimumPlayers"
              onChange={(e) => {
                setMinimumPlayers(e.target.value);
              }}
            >
              <option>請選擇人數</option>
              <option value="1">一位</option>
              <option value="2">二位</option>
              <option value="3">三位</option>
              <option value="4">四位</option>
            </select>

            <label htmlFor="maximumPlayers">最多幾位玩家</label>
            <select
              id="maximumPlayers"
              onChange={(e) => {
                setMaximumPlayers(e.target.value);
              }}
            >
              <option>請選擇人數</option>
              <option value="1">一位</option>
              <option value="2">二位</option>
              <option value="3">三位</option>
              <option value="4">四位</option>
              <option value="5">五位</option>
              <option value="6">六位</option>
              <option value="7">七位</option>
              <option value="8">八位</option>
            </select>

            <label htmlFor="duration">遊戲時間</label>
            <input
              type="number"
              id="duration"
              placeholder="幾分鐘"
              min="0"
              max="120"
              step={1}
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            />

            <label htmlFor="price">一人/價錢</label>
            <input
              type="number"
              id="price"
              min="0"
              step={1}
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />

            <label htmlFor="image">上傳圖片(密室逃脫主題圖片)</label>
            <input
              type="file"
              id="image"
              onChange={(e) => {
                setImage(e.target.files[0]); // 確保這裡正確設置了圖片
              }}
            />

            <label htmlFor="slideImages">上傳滑動圖片</label>
            <input
              type="file"
              id="slideImages"
              multiple
              onChange={(e) => {
                setSlideImages(Array.from(e.target.files));
              }}
            />

            <div className="is-active">
              是否要發佈?
              <label htmlFor="isActiveYes">是</label>
              <input
                id="isActiveYes"
                type="radio"
                name="isActive"
                value={true}
                required
                onChange={(e) => {
                  setIsActive(e.target.value);
                }}
                defaultChecked
              />
              <label htmlFor="isActiveNo">否</label>
              <input
                id="isActiveNo"
                type="radio"
                name="isActive"
                value={false}
                required
                onChange={(e) => {
                  setIsActive(e.target.value);
                }}
              />
            </div>

            <button type="button" onClick={handleAddTheme}>
              新增
            </button>
          </form>
          {message && <div style={{ color: "green" }}>{message}</div>}
          {error && <div style={{ color: "red" }}>{error}</div>}
        </section>
      )}
    </Wrapper>
  );
};

export default AddNewTheme;
