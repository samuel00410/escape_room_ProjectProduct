import React from "react";
import "./styles/AboutEscape.css";
import backgroundImg from "../../images/aboutEscape.png";
import styled from "@emotion/styled";

const IntroductionBlock = styled.div`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  min-height: 40vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;

  // 手機到平板
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0);
  }
`;

const SubtitleContainer = styled.div`
  padding: 1.2rem;
  text-align: center;

  @media screen and (max-width: 1000px) {
    padding: 0.5rem;
  }

  // 手機到平板
  @media screen and (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 1.5rem;
    background-color: rgba(0, 0, 0, 0.75);
  }
`;

const Title = styled.h2`
  padding: 1.5rem 2;
  color: #ff0000;
  font-weight: lighter;
  font-size: var(--font-size-large);

  // @media screen and (max-width: 1270px) {
  //   padding: 1rem;
  //   font-size: var(--font-size-medium);
  // }

  // @media screen and (max-width: 1000px) {
  //   padding: 0.25rem;
  //   font-size: var(--font-size-base);
  // }

  // 手機到平板
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const Cotent = styled.p`
  color: #6c6060;
  font-size: var(--font-size-medium);
  line-height: 2.75rem;

  // @media screen and (max-width: 1270px) {
  //   font-size: var(--font-size-base);
  // }

  // @media screen and (max-width: 1000px) {
  //   font-size: var(--font-size-small);
  //   line-height: 1.8rem;
  // }
`;

const AboutEscape = () => {
  return (
    <>
      <section className="about">
        <div
          className="backgroundImg"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        ></div>

        <section className="title">
          <h1>
            How it works <br />
            關於密室逃脫
          </h1>
        </section>

        <IntroductionBlock>
          <Container>
            <SubtitleContainer>
              <Title>
                You Are Locked In <br /> 進入冒險旅程
              </Title>
              <Cotent>
                被鎖在密室內,玩家必須使
                <br />
                用房間的元素尋找線索來
                <br />
                解決謎題並在指定時間之內逃出.
              </Cotent>
            </SubtitleContainer>
            <SubtitleContainer>
              <Title>
                The Clock is Ticking <br /> 時間正式倒數...
              </Title>
              <Cotent>
                參與密室逃脫時,你們會被
                <br />
                置身於一個特定的場所,
                <br />
                在規定的時間內,通過尋找
                <br />
                線索,層層解謎,最終完
                <br />
                成任務並逃離密室.
              </Cotent>
            </SubtitleContainer>
            <SubtitleContainer>
              <Title>
                Feel The Atmosphere <br /> 成功逃脫密室
              </Title>
              <Cotent>
                密室內多種機關會給玩家帶
                <br />
                來無限樂趣及體驗,同時可
                <br />
                訓練及加強團隊間的"理
                <br />
                解","溝通","合作"和"觀察"能力.
              </Cotent>
            </SubtitleContainer>
          </Container>
        </IntroductionBlock>
      </section>
    </>
  );
};

export default AboutEscape;
