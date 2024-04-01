// 步驟二
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import CreditCard from "./CreditCard";

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

const PaymentBlock = styled.div`
  border: 1px solid #cdcccc;
  padding: 1.25rem;
  label.payfor {
    padding: 0 0.5rem;
    font-size: 1.25rem;

    span.payfor_credit {
      text-decoration: line-through;
    }

    span.payfor_ATM {
      text-decoration: line-through;
    }

    span.unlock {
      color: red;
    }
  }

  p {
    font-size: 1.05rem;
    margin-top: 0.5rem;
  }
`;

const CheckoutStep = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePayment = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  return (
    <>
      <LeftPart>
        <h3>付款方式</h3>

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
            <span className="payfor_credit">信用卡付款</span>{" "}
            <span className="unlock">(功能未開發，暫時無法使用)</span>
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
            <span className="payfor_ATM">ATM 虛擬代碼繳費 </span>
            <span className="unlock">(功能未開發，暫時無法使用)</span>
          </label>
          <p>
            超過 2023-09-18 00:00 預訂或付款金額超過$49,999，將無法使用 ATM
            虛擬代碼繳費。
          </p>
        </PaymentBlock>
        <PaymentBlock>
          <input
            id="atm"
            type="radio"
            name="paymentMethod"
            value="pay_on_site"
            onChange={handlePayment}
            required
          />
          <label className="payfor" htmlFor="atm">
            現場付款
          </label>
        </PaymentBlock>
      </LeftPart>
    </>
  );
};

export default CheckoutStep;
