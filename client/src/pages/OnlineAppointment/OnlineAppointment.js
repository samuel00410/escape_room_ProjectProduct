import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import styled from "@emotion/styled";
import reserveBackground from "../../images/tourist-supplies-green.jpg";
import List from "./components/List";
import { RiFilter3Line } from "react-icons/ri";
import ThemeService from "../../services/theme.service";

const Wrapper = styled.div`
  min-height: 100vh;
`;

// 上面背景圖
const TopContainer = styled.section`
  // border: 3px solid red;
  padding-top: 2rem;
  width: 100%;
  min-height: 15vh;
  background-image: url(${reserveBackground});
  background-size: cover;
  background-position: center;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 標題
const TitleContainer = styled.div`
  h1 {
    color: white;
    font-size: 2.5rem;
    text-align: center;
    font-weight: lighter;
  }
`;

const Main = styled.section`
  width: 100%;
  min-height: 100vh;
  background-color: #2d2c2c;
`;

const ReserveContainer = styled.div`
  // border: 3px solid blue;
  display: flex;
  justify-content: center;
  padding: 3rem 5%;
`;

const ReserveBlock = styled.section`
  // border: 3px solid white;
  // width: 90%;
  background-color: #101010;
  padding: 1.5rem;
  display: flex;
  margin: 0 auto;

  // 平板裝置 (寬度768px以內)
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 1rem;
  }
`;

// 左邊篩選欄
const FilterBlock = styled.section`
  min-width: 210px;
  height: fit-content;
  border: 1px solid #474242;
  padding: 2rem 1rem;
  margin: 0 1rem 1rem 1rem;

  // 平板裝置 (寬度768px以內)
  @media screen and (max-width: 768px) {
    // display: none;
    width: 40%;
  }
`;

// 分隔線
const DividingLine = styled.hr`
  width: 100%;
  border-color: rgba(255, 255, 255, 50%);
  margin: 1rem 0;
`;

const Search = styled.input`
  width: 100%;
  padding: 5px 5px;
`;

// 特色分類
const CategoryBlock = styled.div``;

const CategoryTitle = styled.div`
  p {
    font-size: 1.25rem;
    color: white;
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-left: 10px;
  }

  /* 隱藏原始的radio */
  input[type="radio"] {
    display: none;
  }

  /* 定義新的radio的外觀 */
  input[type="radio"] + label:before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid red;
    background-color: black;
    border-radius: 50%;
    margin-right: 10px;
    vertical-align: middle;
  }

  /* 當radio被選中時，內部添加一個小紅點 */
  input[type="radio"]:checked + label:before {
    background-color: red;
    box-shadow: inset 0 0 0 5px black;
  }

  label {
    font-size: 1.25rem;
    color: white;
  }
`;

// 遊玩人數
const PlayerBlock = styled.div``;

const PlayerTitle = styled.div`
  p {
    color: white;
    font-size: 1.25rem;
  }
`;

const PlaySelector = styled.div`
  select {
    margin: 10px 0;
    width: 100%;
    color: white;
    background-color: #101010;
  }
`;

// 每人預算
const BudgetBlock = styled.div``;

const BudgetTitle = styled.div`
  p {
    color: white;
    font-size: 1.25rem;
  }
`;

const BudgetSelector = styled.div`
  select {
    font-size: 1rem;
    margin: 10px 0;
    width: 100%;
    color: white;
    background-color: #101010;
  }
`;

// 按鈕(重設、搜尋)
const ButtonBlock = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ResetButton = styled.div`
  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ffffff;
    color: #ffffff;
    &:hover {
      opacity: 0.7;
    }
    &:active {
      background-color: gray;
    }
  }
`;

const SearchButton = styled.div`
  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ffffff;
    color: #ffffff;
    background-color: rgb(226, 79, 51);
    &:hover {
      opacity: 0.7;
    }
    &:active {
      background-color: darkred;
    }
  }
`;

const ThemeBlock = styled.section`
  // border: 3px solid darkblue;
  width: 100%;
`;

// 右邊顯示的密室主題區塊
const DisplayText = styled.div`
  p {
    color: #ffff;
    font-size: 1.25rem;
  }
`;

const DisplayTheme = styled.div`
  // border: 3px solid green;
  width: 100%;

  div.contain {
    // border: 3px solid yellow;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const OnlineAppointment = () => {
  const { setThemeData } = useContext(ThemeContext);
  const [msg, setMsg] = useState("目前顯示的是【所有密室主題】");
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categoryName, setCatgoryName] = useState("");
  const [players, setPlayers] = useState("");
  const [price, setPrice] = useState("");

  // 抓到所有的密室主題
  const showAllThemes = async () => {
    try {
      let response = await ThemeService.getAllTheme();
      if (response) {
        setThemeData(response.data);
      }
    } catch (e) {
      setError("找不到任何密室主題");
    }
  };

  // 重設篩選
  const handleReset = async () => {
    setSearchKeyword("");
    setCatgoryName("");
    setPlayers("");
    setPrice("");
    window.location.reload();
  };

  // 篩選搜尋
  const handleSearch = async () => {
    try {
      let response = await ThemeService.filterSearch(
        searchKeyword,
        categoryName,
        players,
        price
      );
      if (response.data && response.data.data.length > 0) {
        let themeAry = response.data.data;
        setThemeData(themeAry);
        setMsg(`目前顯示的有【${themeAry.length}筆】密室主題`);
      } else {
        setMsg("未找到符合條件的密室主題");
      }
      setError(null);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        setError(e.response.data); // 後端返回的錯誤信息
      } else {
        setError("搜索失败，请稍后重试"); // 其他錯誤情況
      }
    }
  };
  useEffect(() => {
    showAllThemes();
  }, []);

  return (
    <Wrapper>
      <TopContainer>
        <TitleContainer>
          <h1>線上預約</h1>
        </TitleContainer>
      </TopContainer>

      <Main>
        <ReserveContainer>
          <ReserveBlock>
            <FilterBlock>
              <Search
                type="text"
                name="search"
                placeholder="搜尋關鍵字"
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                }}
              />
              <DividingLine />

              <CategoryBlock>
                <CategoryTitle>
                  <p>特色分類</p>
                </CategoryTitle>
                <CategoryFilter>
                  <div>
                    <input
                      id="horror"
                      type="radio"
                      name="category"
                      value="驚悚恐怖"
                      onChange={(e) => {
                        setCatgoryName(e.target.value);
                      }}
                    />
                    <label htmlFor="horror">恐怖驚悚</label>
                  </div>
                  <div>
                    <input
                      id="detective"
                      type="radio"
                      name="category"
                      value="偵探推理"
                      onChange={(e) => {
                        setCatgoryName(e.target.value);
                      }}
                    />
                    <label htmlFor="detective">偵探推理</label>
                  </div>
                  <div>
                    <input
                      id="puzzle"
                      type="radio"
                      name="category"
                      value="謎題邏輯"
                      onChange={(e) => {
                        setCatgoryName(e.target.value);
                      }}
                    />
                    <label htmlFor="puzzle">謎題邏輯</label>
                  </div>
                </CategoryFilter>
              </CategoryBlock>

              <DividingLine />

              <PlayerBlock>
                <PlayerTitle>
                  <p>遊玩人數</p>
                </PlayerTitle>
                <PlaySelector>
                  <select
                    name="player"
                    id="player"
                    onChange={(e) => {
                      setPlayers(e.target.value);
                    }}
                  >
                    <option>不限</option>
                    <option value={1}>1 人</option>
                    <option value={2}>2 人</option>
                    <option value={3}>3 人</option>
                    <option value={4}>4 人</option>
                    <option value={5}>5 人</option>
                    <option value={6}>6 人</option>
                    <option value={7}>7 人</option>
                    <option value={8}>8 人</option>
                    <option value={9}>9 人</option>
                    <option value={10}>10 人</option>
                  </select>
                </PlaySelector>
              </PlayerBlock>

              <DividingLine />
              <BudgetBlock>
                <BudgetTitle>
                  <p>每人預算</p>
                </BudgetTitle>
                <BudgetSelector>
                  <select
                    name="Budget"
                    id="Budget"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  >
                    <option>不限</option>
                    <option>$400以內</option>
                    <option>$400~$600</option>
                    <option>$600~$800</option>
                    <option>$800~$1000</option>
                    <option>$1000以上</option>
                  </select>
                </BudgetSelector>
              </BudgetBlock>

              <ButtonBlock>
                <ResetButton>
                  <button onClick={handleReset}>重設</button>
                </ResetButton>
                <SearchButton>
                  <button onClick={handleSearch}>搜尋</button>
                </SearchButton>
              </ButtonBlock>
            </FilterBlock>

            <ThemeBlock>
              <DisplayText>
                {/* 有錯誤就才會顯示(ex:找不到密室) */}
                {error && <p>{error}</p>}
                {/* 沒錯誤才會顯示的訊息 */}
                {!error && <p>{msg}</p>}
              </DisplayText>
              <DisplayTheme>
                {/* 沒錯誤的話，列出的密室主提 */}
                {!error && (
                  <div className="contain">
                    <List />
                  </div>
                )}
              </DisplayTheme>
            </ThemeBlock>
          </ReserveBlock>
        </ReserveContainer>
      </Main>
    </Wrapper>
  );
};

export default OnlineAppointment;
