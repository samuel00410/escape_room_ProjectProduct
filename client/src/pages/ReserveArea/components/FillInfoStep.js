// 步驟一
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const LeftPart = styled.section`
  background: #fff;
  border: 3px solid #fff;
  box-shadow: 0px 4px 1px 0px rgba(122, 111, 111, 0.25);
  padding: 1rem;
  margin: 0 0 0 2rem;
  flex: 1 1 500px;
  max-width: 500px;
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

  div.form-data {
    // border: 3px solid black;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    padding: 0.5rem;
    p.error-msg {
      color: red;
    }

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

  @media screen and (max-width: 970px) {
    width: 100%;
  }
`;

const FillInfoStep = ({
  currentMember,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  errorMsg,
}) => {
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  return (
    <>
      <LeftPart>
        <h3>聯絡人資料</h3>
        {/* 如果還沒有登入會員的話，就顯示以下 */}
        {!currentMember && (
          <p>
            已經是會員? 請
            <Link
              to={{ pathname: "/login" }}
              state={{ from: "/reservationprocess" }}
            >
              登入
            </Link>
          </p>
        )}

        <div className="form-data">
          {/* 顯示錯誤訊息 */}
          {errorMsg &&
            errorMsg.map((error, index) => (
              <p className="error-msg" key={index}>
                {error}
              </p>
            ))}
          <label htmlFor="name">姓名</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="請輸入姓名"
            value={name}
            onChange={handleName}
            required
          />
          <label htmlFor="email">電子信箱</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="請輸入正確的電子信箱格式"
            value={email}
            onChange={handleEmail}
            required
          />
          <label htmlFor="phone">連絡電話</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="請輸入手機號碼"
            value={phone}
            onChange={handlePhone}
            required
          />
        </div>
      </LeftPart>
    </>
  );
};

export default FillInfoStep;
