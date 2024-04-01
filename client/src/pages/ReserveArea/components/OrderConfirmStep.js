// 步驟三
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

const LeftPart = styled.section`
  background: #fff;
  border: 3px solid #fff;
  box-shadow: 0px 4px 1px 0px rgba(122, 111, 111, 0.25);
  padding: 1rem;
  margin: 0 0 0 2rem;
  flex: 1 1 700px;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  h3 {
    // border: 3px solid blue;
    font-size: 1.75rem;
    padding: 1.2rem 0.5rem;
  }

  @media screen and (max-width: 970px) {
    width: 100%;
  }
`;

const OrderBlock = styled.div`
  border: 1px solid #cdcccc;
  padding: 1rem 0.5rem;
  h5 {
    text-align: center;
    font-size: 1.75rem;
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

  section.order {
    // border: 1px solid red;
    padding: 1.5rem 0 0 5rem;
    p {
      padding: 0.5rem 0;
      span.descript {
        margin-left: 0.75rem;
      }
      span.pay-fee {
        color: red;
      }
    }

    div.bank_info {
      // border: 1px solid yellow;
      background-color: #f8f8f8;
      p.pay-fee {
        color: red;
      }
    }

    div.notice {
      // border: 1px solid blue;
      background-color: #f8f8f8;
      margin: 1rem 0;
    }
  }
`;

const OrderConfirmStep = ({ orderId, orderTheme, orderPrice }) => {
  return (
    <>
      <LeftPart>
        <OrderBlock>
          <h5>恭喜您完成預約!</h5>
          <section className="waring">
            <FiAlertCircle size={60} color="ff3200" />
            <div className="waringtext">
              <p>繳費資訊已寄至您的信箱，請記得定時到現場繳費。。</p>
              <p className="alert-info">以下是繳費資訊(該預約需現場繳費)</p>
            </div>
          </section>

          <section className="order">
            <p>
              <span>訂單編號</span> <span className="descript">#{orderId}</span>
            </p>
            <hr />
            <p>
              <span>活動名稱</span>{" "}
              <span className="descript">{orderTheme}</span>
            </p>

            <div className="bank_info">
              <p>
                <span>繳費金額</span>{" "}
                <span className="descript">${orderPrice}</span>
              </p>
              <hr />
              {/* <p>
                <span>銀行代碼</span>{" "}
                <span className="descript">004 台灣銀行</span>
              </p>
              <hr />
              <p>
                <span>轉帳帳號</span>{" "}
                <span className="descript">386156654175</span>
              </p>
              <hr />
              <p>
                <span>繳費截止</span>{" "}
                <span className="descript pay-fee">2023-09-14 23:59:59</span>
              </p> */}
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
    </>
  );
};

export default OrderConfirmStep;
