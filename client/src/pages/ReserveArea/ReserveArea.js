import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../../ThemeContext";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import backgroundImg from "../../images/RserveBackground.png";
import { BiTimeFive } from "react-icons/bi";
import { LiaCalendar } from "react-icons/lia";
import { MdPeople } from "react-icons/md";

import SlidePicture from "./components/SlidePicture";
import ChooseDate from "./components/ChooseDate";
import ReserveHeader from "../../components/ReserveHeader";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${backgroundImg});
  background-size: cover;
  position: relative;
`;

const Container = styled.section`
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 880px) {
    flex-direction: column;
  }
`;

// 左邊區塊 => 圖片滑動、活動資訊
const LeftBlock = styled.section`
  flex: 3 1 50vw;
  max-width: 1000px;
  display: flex;

  flex-direction: column;
  // align-item: center;
  margin: 1rem 1.5rem;

  @media screen and (max-width: 880px) {
    width: 80vw;
  }
`;

const ActivityInfo = styled.div`
  border: 1px solid #fff;
  background: #f8f8f8;
  box-shadow: 0px 4px 1px 0px rgba(122, 111, 111, 0.25);
  padding: 0.75rem 1rem;
  // margin: 0 1.5rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  svg {
    padding: 0 0.25rem;
  }
  p {
    margin: 0.5rem 0;
  }
`;

const RightBlock = styled.section`
  flex: 2 1 15vw;
  max-width: 500px;
  border: 1px solid #fff;
  background: #f8f8f8;
  padding: 0 1rem;
  margin: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;

  hr {
    border: 1px solid #000000;
  }
`;

const Title = styled.div`
  margin: 2rem 0;
  h2 {
    text-align: center;
    color: #000;
    text-align: center;
    font-size: 40px;
    font-weight: 600;
  }

  @media screen and (max-width: 1000px) {
    h2 {
      font-size: var(--font-size-xl);
    }
  }
`;

const Descript = styled.div`
  margin: 1rem 0;
  ul {
    list-style: disc;
    li {
      margin: 1rem;
      color: #808080;
      font-size: 1.15rem;
    }
  }
`;

const Price = styled.div`
  p {
    font-size: 1.25rem;
    text-align: center;
    color: #808080;
  }
`;

const StartingPrice = styled.div`
  p {
    // margin-left: 1rem;
    margin: 1rem;
    color: #808080;
    span {
      color: #f4a010;
      font-size: 1.75rem;
    }
  }
`;

const GoReserve = styled.div`
  text-align: center;
  a {
    border-radius: 3px;
    background: #f4a010;
    color: #fff;
    font-size: 1.5rem;
    padding: 0.5rem 2rem;
  }
  // button {
  //   border-radius: 3px;
  //   background: #f4a010;
  //   color: #fff;
  //   font-size: 1.75rem;
  //   padding: 0.5rem 2rem;
  // }
`;

const ReserveArea = () => {
  const { selectedTheme } = useContext(ThemeContext);

  if (!selectedTheme) {
    return;
  }

  return (
    <>
      <ReserveHeader />
      <Wrapper>
        <Container>
          <LeftBlock>
            <SlidePicture />
            <ActivityInfo>
              <p>活動資訊</p>
              <Info>
                <BiTimeFive size={20} />
                <p>活動時間 {selectedTheme.duration} 分鐘</p>
              </Info>
              <Info>
                <LiaCalendar size={20} />
                <p>活動開始前 1 天的 19:00 以前可預訂</p>
              </Info>
              <Info>
                <MdPeople size={20} />
                <p>數量 1 以上可以成團</p>
              </Info>
            </ActivityInfo>
          </LeftBlock>
          <RightBlock>
            <Title>
              <h2>{selectedTheme.name}</h2>
            </Title>
            <hr />
            <Descript>
              <ul>
                <li>
                  遊玩人數:{selectedTheme.minimumPlayers}-
                  {selectedTheme.maximumPlayers}人
                </li>
                <li>當日遊玩人數可以增加,現場補齊差額即可</li>
                <li>
                  若人數臨時變動,請提前三天告知(不含出發日),現場臨時變動無法提供退費
                </li>
              </ul>
            </Descript>
            <Price>
              <p>
                遊戲票價 | <br />
                {selectedTheme.price}元/人
              </p>
            </Price>
            <StartingPrice>
              <p>
                NT$ <span>{selectedTheme.price}</span> 起
              </p>
            </StartingPrice>
            <GoReserve>
              <Link to="/choosedate">立即預訂</Link>
            </GoReserve>
          </RightBlock>
        </Container>
      </Wrapper>
    </>
  );
};

export default ReserveArea;
