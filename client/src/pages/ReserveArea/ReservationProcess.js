import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReserveHeader from "../../components/ReserveHeader";
import Stepper from "./components/Stepper";
import { BiSolidLeftArrow } from "react-icons/bi";
import FillInfoStep from "./components/FillInfoStep";
import CheckoutStep from "./components/CheckoutStep";
import OrderConfirmStep from "./components/OrderConfirmStep";
import StepperControl from "./components/StepperControl";
import { ThemeContext } from "../../ThemeContext";
import { ReservationContext } from "../../ReservationContext";

const Wrapper = styled.div`
  padding: 4rem 9%;
  background: #f8f8f8;
  min-height: 100vh;
`;

const Main = styled.section``;

const ReturnBlock = styled.div`
  // border: 3px solid yellow;
  padding: 0.5rem 5rem;
  text-align: left;
  font-size: 1.5rem;

  @media screen and (max-width: 768px) {
    padding: 0.5rem 2rem;
    font-size: 1.2rem;
  }
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
  // flex-wrap: wrap;
  justify-content: center;

  @media screen and (max-width: 970px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const RightPart = styled.section`
  background: #fff;
  border: 3px solid #fff;
  box-shadow: 0px 4px 1px 0px rgba(122, 111, 111, 0.25);
  padding: 1rem;
  margin: 0 2rem 0 1rem;
  flex: 1 1 350px;
  max-width: 350px;
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

  @media screen and (max-width: 970px) {
    width: 100%;
    margin-top: 3rem;
  }

  // button {
  //   display: inline-block;
  //   width: 100%;
  //   text-align: center;
  //   border-radius: 3px;
  //   background: #f4a010;
  //   color: #fff;
  //   padding: 0.5rem 0.75rem;
  // }

  // a {
  //   display: inline-block;
  //   width: 100%;
  //   text-align: center;
  //   border-radius: 3px;
  //   background: #f4a010;
  //   color: #fff;
  //   padding: 0.5rem 0.75rem;
  // }
`;

const Total = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ReservationProcess = ({ currentMember }) => {
  // 選取的密室主題
  const { selectedTheme } = useContext(ThemeContext);

  // 預訂日期、場次時間、總價格、人數
  const { reservationDate, reservationTime, total, count } =
    useContext(ReservationContext);

  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const steps = ["填寫資料", "結帳", "確認訂單"];

  // 預訂好的訂單編號、密室主題名稱、繳費金額
  const [orderId, setOrderId] = useState(null);
  const [orderTheme, setOrderTheme] = useState(null);
  const [orderPrice, setOrderPrice] = useState(null);

  // FillInfoStep (填寫聯絡人資料表單的狀態，一開始會去尋找用戶是否有登入會員)
  const [name, setName] = useState(() => {
    return currentMember ? currentMember.member.userName : "";
  });
  const [email, setEmail] = useState(() => {
    return currentMember ? currentMember.member.email : "";
  });
  const [phone, setPhone] = useState(() => {
    return currentMember ? currentMember.member.phoneNumber : "";
  });
  const [errorMsg, setErrorMsg] = useState([]);

  const showStep = (step) => {
    switch (step) {
      case 1:
        return (
          <FillInfoStep
            currentMember={currentMember}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            errorMsg={errorMsg}
          />
        );
      case 2:
        return <CheckoutStep />;
      case 3:
        return (
          <OrderConfirmStep
            orderId={orderId}
            orderTheme={orderTheme}
            orderPrice={orderPrice}
          />
        );
      default:
    }
  };

  return (
    <>
      <ReserveHeader />
      <Wrapper>
        <Main>
          <ReturnBlock>
            {currentStep === 1 && (
              <Link to="/choosedate">
                <i className="fa-solid fa-arrow-right-to-bracket fa-rotate-180"></i>{" "}
                返回
              </Link>
            )}
          </ReturnBlock>
          <StepperBlock>
            <Stepper
              steps={steps}
              currentStep={currentStep}
              complete={complete}
            />
          </StepperBlock>
          <form action="" method="GET">
            <InfoBlock>
              {showStep(currentStep)}
              <RightPart>
                <h3>{selectedTheme.name}</h3>
                <p>場次時間 :</p>
                <p className="data-form">
                  {reservationDate} {reservationTime}
                </p>
                <hr />
                <p>人數 :</p>
                <p className="data-form">{count} 人</p>
                <hr />
                <Total>
                  <p>
                    總計 <span>NT$ {total}</span>
                  </p>

                  <StepperControl
                    currentMember={currentMember}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    setComplete={setComplete}
                    steps={steps}
                    name={name}
                    email={email}
                    phone={phone}
                    setOrderId={setOrderId}
                    setOrderTheme={setOrderTheme}
                    setOrderPrice={setOrderPrice}
                    errorMsg={errorMsg}
                    setErrorMsg={setErrorMsg}
                  />
                </Total>
              </RightPart>
            </InfoBlock>
          </form>
        </Main>
      </Wrapper>
    </>
  );
};

export default ReservationProcess;
