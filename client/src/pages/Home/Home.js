import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import CanvasBox from "./components/CanvasBox";
import ImageSlider from "./components/ImageSlider";
import Footer from "../../components/Footer";
import "./styles/Home.css";
import CorridorImg from "../../images/obed-hernandez-P8ioEmnpQpI-unsplash.jpg";
import AboutEscape from "../../images/fa8b7ec04f0be5da2eb5c1dc7d3217e4.jpg";
import EscapeTheme from "../../images/elyas-cile-8Mqwf84-7w0-unsplash.jpg";
import OnlineTheme from "../../images/eric-rothermel-FoKO4DpXamQ-unsplash.jpg";
import Vitrification from "../../images/dark-grunge-texture.jpg";
import { TbArrowBigRightLineFilled } from "react-icons/tb";

const Wrapper = styled.div`
  min-height: 100vh;
`;

// 走廊背景
const CorridorBackground = styled.div`
  position: fixed;
  width: 100%;
  min-height: 100vh;
  z-index: -100;
  background-image: url(${CorridorImg});
  background-size: cover;
  background-position: center;
`;

// 頁面主題部分
const PageThemeContainer = styled.div`
  // border: 3px solid black;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.75rem 0;
  position: relative; // 這是必需的，以便背景和內容可以重疊
`;

// 透明度背景
const BackgroundWrapper = styled.div`
  background-image: url(${Vitrification});
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

// 頁面主題區塊
const PageThemeBlock = styled.section`
  width: 50vw;
  max-width: 720px; // 設定最大寬度
  height: 30vh;
  max-height: 220px; // 設定最大高度
  margin: 3rem;
  position: relative;

  // 平板裝置 (寬度768px以內)
  @media screen and (max-width: 768px) {
    width: 55vw;
    p {
      font-size: 0.85rem;
    }
  }

  // 手機板行動裝置 (寬度650px以內)
  @media screen and (max-width: 650px) {
    width: 100vw;
  }
`;

const ThemeWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-size: cover;
  background-position: center;
  opacity: 0.8;
`;

// 標題 (左)
const TitleLeft = styled.div`
  // position: absolute;
  // top: 20%;
  // left: -3.5%;
  h2 {
    font-size: 2.5rem;
    color: #fff;
  }

  animation: moveLeftTitle 2.5s ease-in-out 1s 1 normal forwards;

  @keyframes moveLeftTitle {
    from {
      position: absolute;
      top: 25%;
      left: -7%;
      color: white;
      opacity: 0.25;
    }
    to {
      position: absolute;
      top: 25%;
      left: -3.5%;
      color: white;
    }
  }

  // 手機板行動裝置 (寬度650px以內)
  @media screen and (max-width: 650px) {
    animation: moveLeftTitle 2.5s ease-in-out 1s 1 normal forwards;

    @keyframes moveLeftTitle {
      from {
        position: absolute;
        top: 25%;
        left: -3.5%;
        color: white;
        opacity: 0.25;
      }
      to {
        position: absolute;
        top: 25%;
        left: 3%;
        color: white;
      }
    }
  }
`;

// 標題 (右)
const TitleRight = styled.div`
  // position: absolute;
  // top: 20%;
  // right: -3.5%;
  h2 {
    font-size: 2.5rem;
    color: #fff;
  }

  animation: moveRightTitle 2.5s ease-in-out 1s 1 normal forwards;

  @keyframes moveRightTitle {
    from {
      position: absolute;
      top: 25%;
      right: -7%;
      color: white;
      opacity: 0.25;
    }
    to {
      position: absolute;
      top: 25%;
      right: -3.5%;
      color: white;
    }
  }

  // 手機板行動裝置 (寬度650px以內)
  @media screen and (max-width: 650px) {
    animation: moveLeftTitle 2.5s ease-in-out 1s 1 normal forwards;
  }
`;

// 頁面主題介紹區塊(左邊)
const IntroLeftBlock = styled.div`
  position: absolute;
  bottom: -15%;
  left: -20%;
  // width: 70%;
  // height: 65%;
  border: 1px solid #fefefe;
  background: #0b0b0b;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // padding-top: 1rem;
  padding: 1.25rem 1rem 0.25rem 1rem;

  transition: 0.5s;

  &:hover {
    transform: scale(1.05);
  }

  // 手機板行動裝置 (寬度650px以內)
  @media screen and (max-width: 650px) {
    bottom: -20%;
    left: 25%;
    width: 70%;
  }

  //  (寬度550px以內)
  @media screen and (max-width: 550px) {
    width: 90%;
    left: 10%;
  }

  //  (寬度370px以內)
  @media screen and (max-width: 370px) {
    width: 100%;
    left: 0%;
    bottom: -40%;
  }
`;

// 頁面主題介紹區塊(右邊)
const IntroRightBlock = styled.div`
  position: absolute;
  bottom: -15%;
  right: -20%;
  // width: 70%;
  // height: 65%;
  border: 1px solid #fefefe;
  background: #0b0b0b;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // padding-top: 1rem;
  padding: 1.25rem 1rem 0.25rem 1rem;

  transition: 0.5s;

  &:hover {
    transform: scale(1.05);
  }

  // 手機板行動裝置 (寬度650px以內)
  // @media screen and (max-width: 650px) {
  //   padding: 0.75rem 1rem 0.25rem 1rem;
  // }

  // 手機板行動裝置 (寬度650px以內)
  @media screen and (max-width: 650px) {
    bottom: -20%;
    left: 25%;
    width: 70%;
  }

  //  (寬度550px以內)
  @media screen and (max-width: 550px) {
    width: 90%;
    left: 10%;
  }

  //  (寬度370px以內)
  @media screen and (max-width: 370px) {
    width: 100%;
    left: 0%;
    bottom: -40%;
  }

  // 手機板行動裝置 (寬度335px以內)
  // @media screen and (max-width: 335px) {
  //   bottom: -20%;
  //   left: 25%;
  //   width: 75%;
  // }
`;

// 敘述文字
const Intro = styled.div`
  // border: 3px solid blue;

  p {
    font-size: 1rem;
    color: #fff;
  }

  // 手機板行動裝置 (寬度650px以內)
  @media screen and (max-width: 650px) {
    p {
      font-size: 0.9rem;
    }
  }

  //  (寬度550px以內)
  @media screen and (max-width: 550px) {
    p {
      font-size: 0.75rem;
    }
  }

  // 手機板行動裝置 (寬度400px以內)
  // @media screen and (max-width: 400px) {
  //   p {
  //     font-size: 0.75rem;
  //   }
  // }

  // 手機板行動裝置 (寬度335px以內)
  // @media screen and (max-width: 335px) {
  //   p {
  //     font-size: 0.55rem;
  //   }
  // }
`;

// 前往連結
const NavigateLink = styled.div`
  // border: 3px solid red;
  color: rgba(204, 153, 0, 1);
  align-self: end;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  transition: all 0.25s ease-in-out;

  a {
    font-size: 1.05rem;
  }

  &:hover {
    color: rgba(255, 228, 147, 1);
    transform: translateY(-20%);
  }

  // 平板裝置 (寬度768px以內)
  @media screen and (max-width: 768px) {
    a {
      font-size: 0.8rem;
    }
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <CorridorBackground />
      <ImageSlider />
      <PageThemeContainer>
        <BackgroundWrapper />
        <PageThemeBlock>
          <ThemeWrapper style={{ backgroundImage: `url(${AboutEscape})` }} />
          <TitleLeft>
            <h2>關於密室逃脫</h2>
          </TitleLeft>
          <IntroRightBlock>
            <Intro>
              <p>
                在各種不同風格的主題中,體驗真實的故事場
                <br />
                景,與夥伴互相討論、交換資訊、尋找線索.
              </p>
            </Intro>
            <NavigateLink>
              <Link to="/aboutEscape">深入了解</Link>
              <TbArrowBigRightLineFilled
                size={20}
                color="rgba(204, 153, 0, 1)"
              />
            </NavigateLink>
          </IntroRightBlock>
        </PageThemeBlock>
        <PageThemeBlock>
          <ThemeWrapper style={{ backgroundImage: `url(${EscapeTheme})` }} />
          <TitleRight>
            <h2>密室主題</h2>
          </TitleRight>
          <IntroLeftBlock>
            <Intro>
              <p>
                由解開各種形式的謎題與關卡,了解最深層的
                <br />
                故事內容,與設計者想傳達的意境.
              </p>
            </Intro>
            <NavigateLink>
              <Link to="/theme">查看主題</Link>
              <TbArrowBigRightLineFilled
                size={20}
                color="rgba(204, 153, 0, 1)"
              />
            </NavigateLink>
          </IntroLeftBlock>
        </PageThemeBlock>
        <PageThemeBlock>
          <ThemeWrapper style={{ backgroundImage: `url(${OnlineTheme})` }} />
          <TitleLeft>
            <h2>線上預約</h2>
          </TitleLeft>
          <IntroRightBlock>
            <Intro>
              <p>
                選取想要遊玩的密室主題,快速查看其參與人
                <br />
                數、時間以及價格並立即做線上預約.
              </p>
            </Intro>
            <NavigateLink>
              <Link to="/appointment">立即預約</Link>
              <TbArrowBigRightLineFilled
                size={20}
                color="rgba(204, 153, 0, 1)"
              />
            </NavigateLink>
          </IntroRightBlock>
        </PageThemeBlock>
      </PageThemeContainer>
    </Wrapper>
  );
};

export default Home;
