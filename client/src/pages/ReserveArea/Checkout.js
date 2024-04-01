import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import ReserveHeader from "../../components/ReserveHeader";
import Stepper from "./components/Stepper";
import CreditCard from "./components/CreditCard";
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
  flex: 0 1 700px;
  // height: 50vh;
  display: flex;
  flex-direction: column;
  h3 {
    // border: 3px solid blue;
    font-size: 1.75rem;
    padding: 1.2rem 0.5rem;
  }
`;

const PaymentBlock = styled.div`
  border: 1px solid #cdcccc;
  padding: 1.25rem;
  label.payfor {
    padding: 0 0.5rem;
    font-size: 1.25rem;
  }
  p {
    font-size: 1.05rem;
    margin-top: 0.5rem;
  }
`;

const RightPart = styled.section`
  background: #fff;
  border: 3px solid #fff;
  box-shadow: 0px 4px 1px 0px rgba(122, 111, 111, 0.25);
  padding: 1rem;
  margin: 0 2rem 0 1rem;
  flex: 0 1 350px;
  // height: 50vh;
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
const Checkout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePayment = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  return (
    <>
      <ReserveHeader />
      <Wrapper>
        <Main>
          <ReturnBlock>
            <Link to="/information">
              <i class="fa-solid fa-arrow-right-to-bracket fa-rotate-180"></i>{" "}
              返回
            </Link>
          </ReturnBlock>
          <StepperBlock>
            <Stepper />
          </StepperBlock>
          <InfoBlock>
            <LeftPart>
              <h3>付款方式</h3>
              <form action="">
                <PaymentBlock>
                  <input
                    id="credit"
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    onChange={handlePayment}
                    required
                  />
                  <label className="payfor" htmlFor="credit">
                    信用卡付款
                  </label>
                  <p>
                    請於 15 分鐘內完成付款流程，逾時該筆訂單失效，需重新操作。
                    <br />
                    付款金額超過 NT$199,999 無法使用信用卡付款。
                  </p>
                  {selectedPaymentMethod == "credit" && <CreditCard />}
                </PaymentBlock>
                <PaymentBlock>
                  <input
                    id="atm"
                    type="radio"
                    name="paymentMethod"
                    value="atm"
                    onChange={handlePayment}
                    required
                  />
                  <label className="payfor" htmlFor="atm">
                    ATM 虛擬代碼繳費
                  </label>
                  <p>
                    超過 2023-09-18 00:00 預訂或付款金額超過$49,999，將無法使用
                    ATM 虛擬代碼繳費。
                  </p>
                </PaymentBlock>
                <PaymentBlock>
                  <input
                    id="atm"
                    type="radio"
                    name="paymentMethod"
                    value="atm"
                    onChange={handlePayment}
                    required
                  />
                  <label className="payfor" htmlFor="atm">
                    現場付款
                  </label>
                </PaymentBlock>
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
                <Link to="/orderconfirm">下一步</Link>
              </Total>
            </RightPart>
          </InfoBlock>
        </Main>
      </Wrapper>
    </>
  );
};

export default Checkout;
