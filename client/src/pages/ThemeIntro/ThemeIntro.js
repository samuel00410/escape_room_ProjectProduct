import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import "./styles/ThemeIntro.css";
import backgroundImg from "../../images/interior-old-room-with-spotlight.jpg";
import TopImage from "../../images/maxresdefault.jpg";
import { ReactComponent as PlayersIcon } from "../../images/3289574_clan_family_group_peer_people_icon.svg";
import { ReactComponent as PriceIcon } from "../../images/9165555_coin_money_icon.svg";
import { ReactComponent as PlayingTimeIcon } from "../../images/hourglass.svg";
import SlidePicture from "./components/SlidePicture";
import Comment from "./components/Comment";
import ThemeService from "../../services/theme.service";
import { v4 as uuidv4 } from "uuid";
import SkeletonLoader from "./components/SkeletonLoader";

const Wrapper = styled.div`
  min-height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  background-position: center;
`;

// const Background = styled.div`
//   background-image: url(${backgroundImg});
//   background-size: container;
//   background-position: center;
//   position: fixed;
//   z-index: -10;
//   min-height: 100vh;
//   width: 100%;
// `;

const TopImageContainer = styled.div`
  // background-image: url(${TopImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 500px;
`;

// 滑動圖片區塊
const SlidePictureBlock = styled.div`
  margin-top: 3rem;
  width: 100%;
`;

// 故事介紹區塊
const StoryIntroBlock = styled.section`
  margin-top: 3rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StoryIntro = styled.div`
  max-width: 900px;
  background-color: rgba(204, 193, 193, 0.17);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem 2.5rem;
`;

const StoryTitle = styled.div`
  margin-top: 1rem;
  h2 {
    color: #ff0000;
    font-size: 2.5rem;
    font-weight: normal;
  }

  @media screen and (max-width: 1000px) {
    h2 {
      font-size: var(--font-size-xl);
    }
  }
`;

const StoryContent = styled.div`
  margin-top: 1rem;
  p {
    color: #eab7b7;
    font-size: 1.5rem;
    font-weight: normal;
    text-align: left;
  }

  @media screen and (max-width: 1000px) {
    p {
      font-size: var(--font-size-medium);
    }
  }
`;

const FeatureAndFitBlock = styled.section`
  // border: 3px solid blue;
  padding: 5rem 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const OutSideBorder = styled.div`
  background-color: #000000;
  flex: 0 1 500px;
  border: 3px solid #c36767;
  padding: 1rem;
  margin: 1.25rem 2.5rem;
`;

const InsideBorder = styled.div`
  border: 3px solid #c36767;
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  h2 {
    color: #ff0000;
    font-size: 1.5rem;
    font-weight: normal;
    text-align: center;
  }
`;

const Content = styled.div`
  p {
    padding: 0.75rem 0;
    color: #eab7b7;
    font-size: 1rem;
    font-weight: normal;

    &::before {
      content: "◇ ";
    }
  }
`;

// 人數、價格、遊戲時間 區塊
const PatternBlock = styled.section`
  margin-top: 5rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  }
`;

// 人數、價格、遊戲時間 圖案
const PatternContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// 外框
const CirclePatternFrame = styled.div`
  width: 250px;
  height: 250px;
  border: 3px solid #ff0000;
  border-radius: 50%;
  padding: 1rem;

  @media screen and (max-width: 1000px) {
    width: 200px;
    height: 200px;
  }

  @media screen and (max-width: 600px) {
    margin-top: 1.25rem;
  }
`;
// 裡面圓形圖案
const CirclePattern = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(108, 31, 31, 90%);
  border: 1px solid #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 70%;
  }
`;

const GameInstructions = styled.div`
  margin-top: 1rem;
  p {
    color: #d69393;
    text-align: center;
  }
`;

const ThemeIntro = () => {
  let params = useParams(); // 用來抓取 /themeintro/:id 路徑的 id參數值
  let [themeData, setThemeData] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState(null);

  useEffect(() => {
    const showTheme = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log(`發送請求 - ID: ${params.id}`);
        let response = await ThemeService.findTheme(params.id);
        if (response) {
          console.log("數據提取成功", response.data.data);
          setThemeData(response.data.data);
        }
      } catch (e) {
        console.log("讀取密室資料失敗...", e);
        setError(e);
      }
      setIsLoading(false);
    };

    showTheme();
  }, [params.id]);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div>發生錯誤: {error.message}</div>;
  }

  if (!themeData) {
    return <div>沒有找到任何主題資料。</div>;
  }

  const serverURL = "https://escaperoom-project-6a9688f7a146.herokuapp.com";
  const image_URL = `${serverURL}/${themeData.imageURL}`;

  return (
    <Wrapper>
      <TopImageContainer style={{ backgroundImage: `url(${image_URL})` }} />
      {/* 滑動圖片 */}
      <SlidePictureBlock>
        <SlidePicture themeData={themeData} />
      </SlidePictureBlock>

      {/* 故事介紹 */}
      <StoryIntroBlock>
        <StoryIntro>
          <StoryTitle>
            <h2>故事介紹</h2>
          </StoryTitle>
          <StoryContent>
            <p>{themeData.storyContent}</p>
          </StoryContent>
        </StoryIntro>
      </StoryIntroBlock>

      {/* 密室特色、適合對象 */}
      <FeatureAndFitBlock>
        <OutSideBorder>
          <InsideBorder>
            <Title>
              <h2>密室特色</h2>
            </Title>
            <Content>
              {themeData.details.roomFeatures &&
                themeData.details.roomFeatures.map((item) => {
                  const uniqueKey = uuidv4();
                  return <p key={uniqueKey}>{item}</p>;
                })}
            </Content>
          </InsideBorder>
        </OutSideBorder>
        <OutSideBorder>
          <InsideBorder>
            <Title>
              <h2>適合對象</h2>
            </Title>
            <Content>
              {themeData.details.suitableFor &&
                themeData.details.suitableFor.map((item) => {
                  const uniqueKey = uuidv4();
                  return <p key={uniqueKey}>{item}</p>;
                })}
            </Content>
          </InsideBorder>
        </OutSideBorder>
      </FeatureAndFitBlock>

      {/* 遊戲人數、價格、遊戲時間 圖案標示解說 */}
      <PatternBlock>
        <PatternContainer>
          <CirclePatternFrame>
            <CirclePattern>
              <PlayersIcon />
            </CirclePattern>
          </CirclePatternFrame>
          <GameInstructions>
            <p>遊戲人數</p>
            <p>
              {themeData.minimumPlayers}-{themeData.maximumPlayers}人
            </p>
          </GameInstructions>
        </PatternContainer>
        <PatternContainer>
          <CirclePatternFrame>
            <CirclePattern>
              <PriceIcon />
            </CirclePattern>
          </CirclePatternFrame>
          <GameInstructions>
            <p>價格</p>
            <p>$ {themeData.price}/人</p>
          </GameInstructions>
        </PatternContainer>
        <PatternContainer>
          <CirclePatternFrame>
            <CirclePattern>
              <PlayingTimeIcon />
            </CirclePattern>
          </CirclePatternFrame>
          <GameInstructions>
            <p>遊戲時間</p>
            <p>{themeData.duration}分鐘</p>
          </GameInstructions>
        </PatternContainer>
      </PatternBlock>

      {/* 網友評論 */}
      <Comment />
    </Wrapper>
  );
};

export default ThemeIntro;
