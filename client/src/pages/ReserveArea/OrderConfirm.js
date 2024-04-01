import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import ReserveHeader from "../../components/ReserveHeader";
import Stepper from "./components/Stepper";
import CreditCard from "./components/CreditCard";
import { BiSolidLeftArrow } from "react-icons/bi";
import { FiAlertCircle } from "react-icons/fi";

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

const OrderBlock = styled.div`
  border: 1px solid #cdcccc;
  padding: 1rem 0.5rem;
  h5 {
    font-size: 1.5rem;
  }

  section.waring {
    margin: 0.75rem;
    display: flex;
    align-items: center;
    .waringtext {
      p {
        margin: 0 1rem;
        font-size: 1.05rem;
        font-weight: bolder;
      }

      .alert-info {
        color: red;
      }
    }
  }

  section.order{
    // border: 1px solid red;
    padding: 1.5rem 0 0 5rem;
    p{
      padding: 0.5rem 0;
      span.descript{
        margin-left: 0.75rem;
      }
      span.pay-fee{
        color: red;
      }
    }
    
    div.bank_info{
      // border: 1px solid yellow;
      background-color: #f8f8f8;
      p.pay-fee{
        color: red;
      }
    }

    div.notice{
      // border: 1px solid blue;
      background-color: #f8f8f8;
      margin: 1rem 0;
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
const OrderConfirm = () => {
  return (
    <>
      <ReserveHeader />
      <Wrapper>
        <Main>
          <ReturnBlock>
            <Link to="/checkout">
              <i class="fa-solid fa-arrow-right-to-bracket fa-rotate-180"></i>{" "}
              返回
            </Link>
          </ReturnBlock>
          <StepperBlock>
            <Stepper />
          </StepperBlock>
          <InfoBlock>
            <LeftPart>
              <OrderBlock>
                <h5>還差一步就能完成訂單</h5>
                <section className="waring">
                  <FiAlertCircle size={60} color="ff3200" />
                  <div className="waringtext">
                    <p>繳費資訊已寄至您的信箱，需完成繳費才算訂購完成。</p>
                    <p className="alert-info">
                      請記住以下繳費資訊(跨行轉帳需繳費)
                    </p>
                  </div>
                </section>


              <section className="order">
                  <p>
                    <span>訂單編號</span> <span className="descript">#232561353121566</span>
                  </p>
                  <hr />
                  <p>
                    <span>活動名稱</span> <span className="descript">紅衣小女孩</span>
                  </p>

                  <div className="bank_info">
                    <p>
                      <span>繳費金額</span> <span className="descript">$2,600</span>
                    </p>
                    <hr />
                    <p>
                      <span>銀行代碼</span> <span className="descript">004 台灣銀行</span>
                    </p>
                    <hr />
                    <p>
                      <span>轉帳帳號</span> <span className="descript">386156654175</span>
                    </p>
                    <hr />
                    <p>
                      <span>繳費截止</span> <span className="descript pay-fee">2023-09-14 23:59:59</span>
                    </p>
                  </div>

                  <div className="notice">
                    <p>注意事項 :</p>
                    <ul>
                      <li>我們收到您的款項後，才能確認訂單成立。</li>
                      <li>訂單成立後，您才會收到訂單通知信。</li>
                      <li>過了繳費期限後，訂單將無法在為您保留。</li>
                    </ul>
                  </div>

              </section>

              </OrderBlock>
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

export default OrderConfirm;
