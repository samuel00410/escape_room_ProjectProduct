import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import TopBackground1 from "../../../images/電視牆圖1.jpg";
import TopBackground2 from "../../../images/電視牆圖2.jpg";
import TopBackground3 from "../../../images/電視牆圖3.jpg";

const ImgSlider = styled.div`
  background-image: ${(props) => `url(${props.currentImage})`};
  width: 100%;
  background-size: cover;
  background-position: center;
  transition: all 1s ease-in-out;
`;

const TopBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2.5rem;
`;

const Title = styled.div`
  margin: 1rem 0;
  h1 {
    color: #fff;
    font-size: 2.5rem;
  }

  // 平板裝置 (寬度768px以內)
  @media screen and (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

const Text = styled.div`
  margin: 1rem 0;
  p {
    color: #fff;
    font-size: 1.5rem;
    text-align: center;
  }

  // 平板裝置 (寬度768px以內)
  @media screen and (max-width: 768px) {
    p {
      font-size: 1rem;
    }
  }
`;

const GoAdventure = styled.div`
  margin: 1.5rem 0;
  transition: all 0.5s;
  a {
    white-space: nowrap;
    font-size: 1.2rem;
    border-radius: 30px;
    border: darkgray;
    padding: 0.5rem 2rem;
    font-weight: bolder;
    background: radial-gradient(
      85.87% 218.61% at 51.17% 0%,
      #fff 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }
  &:hover {
    color: white;
    transform: scale(1.2);
    cursor: pointer;
  }

  // 平板裝置 (寬度768px以內)
  @media screen and (max-width: 768px) {
    a {
      font-size: 1rem;
      );
    }
  }
`;

const ImageSlider = () => {
  const images = [TopBackground1, TopBackground2, TopBackground3];
  let [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // 設定每5秒鐘切換圖片背景
    let interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // 當觸發重新渲染or組件卸載時被呼叫
    return () => clearInterval(interval);
  }, []);

  return (
    <ImgSlider currentImage={images[currentImageIndex]}>
      <TopBlock>
        <Title>
          <h1>
            沒有解不開的謎題
            <br />
            只有看不見的真相
          </h1>
        </Title>
        <Text>
          <p>
            在有限的時間內團隊合作, 找出真相.
            <br />
            發揮你的搜索能力、觀察力、邏輯力、統御力,
            <br />
            密室中你就是遊戲主角, 決定了自己的命運 !
          </p>
        </Text>
        <GoAdventure>
          <Link to="/theme">立即前往冒險</Link>
        </GoAdventure>
      </TopBlock>
    </ImgSlider>
  );
};

export default ImageSlider;
