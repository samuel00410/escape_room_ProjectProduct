import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { ThemeContext } from "../../../ThemeContext";
import { ReservationContext } from "../../../ReservationContext";
import ReserveService from "../../../services/reserve.service";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 1rem 0;

  button.stepper {
    padding: 0.5rem 2rem;
    font-weight: 600;
  }

  button.prev {
    border: 1px solid gray;
    border-radius: 3px;
    background-color: white;
    color: gray;

    &:hover {
      background-color: black;
      color: white;
    }
  }

  button.next {
    border-radius: 3px;
    background: #f4a010;
    color: #fff;

    &:hover {
      opacity: 0.7;
    }
  }

  a {
    padding: 0.5rem 1.5rem;
    font-weight: 600;
    border-radius: 3px;
    background: #f4a010;
    color: #fff;
    &:hover {
      opacity: 0.7;
    }
  }
`;

const StepperControl = ({
  currentMember,
  currentStep,
  setCurrentStep,
  setComplete,
  steps,
  name,
  email,
  phone,
  setErrorMsg,
  setOrderId,
  setOrderTheme,
  setOrderPrice,
}) => {
  // 選取的密室主題
  const { selectedTheme } = useContext(ThemeContext);

  // 預訂日期、場次時間、總價格、人數
  const { reservationDate, reservationTime, total, count } =
    useContext(ReservationContext);

  // 處理上一步動作
  const handlePrevStep = (e) => {
    e.preventDefault();
    setCurrentStep((prev) => {
      return prev - 1;
    });
  };

  // 檢查聯絡人資料是否填寫(驗證資訊是否已填寫完整)
  const validateInfo = () => {
    const errors = [];
    // 有錯誤的話就把訊息存入陣列
    if (!name) {
      errors.push("請填入姓名!");
    }
    if (!email) {
      errors.push("請填入電子信箱!");
    }
    if (!phone) {
      errors.push("請填入連絡電話!");
    }

    setErrorMsg(errors);
    return errors.length === 0;
  };

  // 處理下一步動作
  const handleNextStep = (e) => {
    // e.preventDefault();

    // 如果當前步驟是填寫資料步驟，則需要驗證資訊
    if (currentStep === 1) {
      const isValid = validateInfo();
      // 如果驗證沒通過就不能進行下一步
      if (!isValid) return;
    }

    if (currentStep < steps.length) {
      setCurrentStep((prev) => {
        return prev + 1;
      });
    }

    if (currentStep === steps.length) {
      setComplete(true);
    }
  };

  // 處理訪客預約
  const handleQuestReserve = async () => {
    const reservationDateTime = reservationDate + " " + reservationTime;
    try {
      const response = await ReserveService.reserveByQuest(
        name,
        email,
        phone,
        selectedTheme.id,
        reservationDateTime,
        count,
        total
      );

      // 如果成功送出預約，才能完成到下一步
      if (response) {
        const result = response.data;
        console.log(result);
        setOrderId(result.reserveData.id);
        setOrderTheme(result.themeData.name);
        setOrderPrice(result.reserveData.totalPrice);
        handleNextStep();
      }
    } catch (error) {
      console.log(`預約失敗: ${error}`);
    }
  };

  // 處理會員預約
  const handleMemberReserve = async () => {
    const reservationDateTime = reservationDate + " " + reservationTime;
    try {
      const response = await ReserveService.reserveByMember(
        currentMember.member.id,
        selectedTheme.id,
        reservationDateTime,
        count,
        total
      );

      // 如果成功送出預約，才能完成到下一步
      if (response) {
        const result = response.data;
        console.log(result);
        setOrderId(result.reserveData.id);
        setOrderTheme(result.themeData.name);
        setOrderPrice(result.reserveData.totalPrice);
        handleNextStep();
      }
    } catch (error) {
      console.log(`預約失敗: ${error}`);
    }
  };

  // 根據用戶身分來發送不同的API(訪客預約or會員預約)
  const handleReserve = () => {
    // 有會員的話
    if (currentMember) {
      handleMemberReserve();
    } else {
      // 否則以訪客身分去預約
      handleQuestReserve();
    }
  };

  return (
    <Container>
      {/* 上一步按鈕 ( 步驟一 & 到步驟三不會顯示) */}
      {currentStep === 1 || currentStep === steps.length ? (
        ""
      ) : (
        <button type="button" className="stepper prev" onClick={handlePrevStep}>
          上一步
        </button>
      )}

      {/* 下一步按鈕 */}
      {/* {currentStep !== steps.length ? (
        <button className="stepper next" type="submit" onClick={handleNextStep}>
          下一步
        </button>
      ) : (
        <Link to="/">回首頁</Link>
      )} */}
      {
        // 如果最後一部就顯示 回首頁，否則再檢查是否到第二步，不是就是為下一步
        currentStep === steps.length ? (
          <Link to="/">回首頁</Link>
        ) : currentStep === 2 ? (
          <button
            className="stepper next"
            type="button"
            onClick={() => {
              handleReserve();
            }}
          >
            完成
          </button>
        ) : (
          <button
            type="button"
            className="stepper next"
            onClick={handleNextStep}
          >
            下一步
          </button>
        )
      }
    </Container>
  );
};

export default StepperControl;
