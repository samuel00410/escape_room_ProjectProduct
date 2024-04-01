import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { ReservationContext } from "../../../ReservationContext";

const SlotBtn = styled.button`
  width: 40%;
  padding: 0.8rem;
  margin: 3px;
  border-radius: 10px;
  border: 1.5px solid ${(props) => (props.ActiveTime ? "#e9967a" : "#f5ebdc00")}; // 根據是否為當前選中時間動態更改邊框顏色
  box-shadow: 1px 2px 1px #e9d5d5;

  div.each-slot {
    display: flex;
    justify-content: space-between;
    align-items: center;

    div.remain {
      border-radius: 5px;
      background-color: #fff0d6;
      color: orange;
      padding: 5px;
    }
  }

  :hover {
    border: 1.5px solid #e9967a;
  }
`;

const TimeSlot = ({ slot }) => {
  const { reservationTime, setReservationTime } =
    useContext(ReservationContext);

  const handleTime = (e) => {
    setReservationTime(slot); // 更新當前選中的時間
  };

  // 檢查這個時間段是否為當前選中的時間
  const isActive = slot === reservationTime;

  return (
    <SlotBtn
      ActiveTime={isActive} // 根據是否為當前選擇的時間來動態更改樣式
      onClick={handleTime}
    >
      <div className="each-slot">
        <div> {slot}</div>
        <div className="remain">剩 6</div>
      </div>
    </SlotBtn>
  );
};

export default TimeSlot;
