import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import ReserveHeader from "../../components/ReserveHeader";
import Stepper from "./components/Stepper";
import { BiSolidLeftArrow } from "react-icons/bi";

const Wrapper = styled.div`
  padding-top: 4rem;
  background: #f8f8f8;
  min-height: 100vh;
`;

const Main = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const ReturnBlock = styled.div`
  // border: 3px solid yellow;
  padding-left: 5rem;
`;

const StepperBlock = styled.section`
  // border: 3px solid red;
  display: flex;
  justify-content: center;
`;

const InfoBlock = styled.section`
  // border: 3px solid blue;
  padding-top: 1rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const LeftPart = styled.section`
  background: #fff;
  border: 3px solid #fff;
  box-shadow: 0px 4px 1px 0px rgba(122, 111, 111, 0.25);
  padding: 1rem;
  margin: 0 0 0 2rem;
  flex: 0 1 500px;
  // height: 600px;
  display: flex;
  flex-direction: column;

  h3 {
    margin: 1.2rem 0;
    font-size: 1.5rem;
  }

  p {
    a {
      color: rgba(227, 157, 8, 1);
    }
  }

  form {
    // border: 3px solid black;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    padding: 0.5rem;
    label {
      // border: 3px solid red;
      margin-top: 0.75rem;
    }
    input {
      margin: 0.25rem 0;
      border: 1px solid gray;
      width: 100%;
    }
  }
`;

const RightPart = styled.section`
  background: #fff;
  border: 3px solid #fff;
  box-shadow: 0px 4px 1px 0px rgba(122, 111, 111, 0.25);
  padding: 1rem;
  margin: 0 2rem 0 1rem;
  flex: 0 1 350px;
  // height: 600px;
  display: flex;
  flex-direction: column;

  h3 {
    text-align: center;
    padding: 1rem 0;
    font-size: 1.75rem;
  }
  p {
    margin: 0.5rem;
  }

  hr {
    margin: 1rem 0;
  }

  a {
    display: inline-block;
    width: 100%;
    text-align: center;
    border-radius: 3px;
    background: #f4a010;
    color: #fff;
    padding: 0.5rem 0.75rem;
  }
`;

const Total = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Information = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepper = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <>
      <ReserveHeader />
      <Wrapper>
        <Main>
          <ReturnBlock>
            <Link to="/choosedate">
              <i class="fa-solid fa-arrow-right-to-bracket fa-rotate-180"></i>{" "}
              返回
            </Link>
          </ReturnBlock>
          <StepperBlock>
            <Stepper currentStep={currentStep} />
          </StepperBlock>
          <InfoBlock>
            <LeftPart>
              <h3>聯絡人資料</h3>
              <p>
                已經是會員? 請<Link to="/login">登入</Link>
              </p>
              <form action="">
                <label htmlFor="name">姓名</label>
                <input type="text" id="name" placeholder="請輸入姓名" />
                <label htmlFor="email">電子信箱</label>
                <input
                  type="email"
                  id="email"
                  placeholder="請輸入正確的電子信箱格式"
                />
                <label htmlFor="phone">連絡電話</label>
                <input type="text" id="phone" placeholder="請輸入手機號碼" />
              </form>
            </LeftPart>
            <RightPart>
              <h3>紅衣小女孩</h3>
              <p>場次時間 :</p>
              <p>2023年07月31日 (週一) 12:55</p>
              <hr />
              <Total>
                <p>
                  總計 <span>NT$ 3,750</span>
                </p>
                <Link onClick={handleStepper} to="/checkout">
                  下一步
                </Link>
              </Total>
            </RightPart>
          </InfoBlock>
        </Main>
      </Wrapper>
    </>
  );
};

export default Information;
