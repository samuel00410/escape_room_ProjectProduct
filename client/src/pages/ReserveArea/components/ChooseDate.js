import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import Calendar from "react-calendar";
import TimeSlot from "./TimeSlot";
import "react-calendar/dist/Calendar.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import ReserveHeader from "../../../components/ReserveHeader";
import ChoosePlayer from "./ChoosePlayer";
import moment from "moment";
import "moment/locale/zh-cn"; // 導入中文語言包
import { Global, css } from "@emotion/react";
import { ThemeContext } from "../../../ThemeContext";
import { ReservationContext } from "../../../ReservationContext";
import { v4 as uuidv4 } from "uuid";

// 使用 Emotion 定義全局樣式
const globalStyles = css`
  .selectedDate {
    background-color: #006edc !important;
    color: white !important;
  }

  .todayDate {
    background-color: white !important;
    color: black !important;
    border: 1px solid #006edc !important;
  }

  .react-calendar__tile:hover:not(.selectedDate) {
    background-color: #f0f0f0 !important;
  }
`;

const Wrapper = styled.div``;

const MainContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  width: 100%;
  border: 1px solid #e2dede;
  background: #fff;
  box-shadow: 0px 4px 1px 0px rgba(154, 149, 149, 0.25);
`;

const TopBlock = styled.section`
  display: flex;
  padding: 1rem;
  a {
    text-align: right;
  }
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Exit = styled.div`
  a {
    text-align: right;
  }
`;

const ChooseContain = styled.section`
  display: flex;
  justify-content: center;
  flex-grow: 1; // 這使得元素會佔用所有剩餘空間

  @media screen and (max-width: 1135px) {
    display: flex;
    flex-direction: column;
  }
`;

const LeftBlock = styled.div`
  flex: 1;
  h5 {
    margin: 1rem 0;
    text-align: center;
  }
`;

const CalendarBlock = styled.div`
  display: flex;
  justify-content: center;
  .react-calendar {
    width: 70%;
  }

  @media screen and (max-width: 1135px) {
    .react-calendar {
      max-width: 520px;
    }
  }

  @media screen and (max-width: 490px) {
    .react-calendar {
      min-width: 330px;
    }
  }
`;

const RightBlock = styled.div`
  flex: 1;

  h5 {
    margin: 1rem 0;
    text-align: center;
  }
`;

// 場次區塊
const TimeBlock = styled.div`
  // border: 1px solid red;
  display: flex;
  justify-content: center;

  div.time-sessions {
    width: 80%;
    // border: 1px solid blue;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const PlayerBlock = styled.div`
  display: flex;
  justify-content: center;

  select {
    width: 20%;
    border: 1px solid rgba(0, 0, 0, 250);
  }
`;

const ResultContain = styled.section`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px 4px 1px 0px rgba(122, 111, 111, 0.25);
  padding: 1rem 0;
  margin-top: 1.5rem;

  @media screen and (max-width: 490px) {
    display: flex;
    flex-direction: column;
    p {
      padding: 0.2rem 0;
      text-align: center;
    }
  }
`;

const ThemeBlock = styled.div`
  p {
    font-weight: bolder;
  }
`;

const DateBlock = styled.div`
  p {
    font-weight: bolder;
  }
`;

const Next = styled.div`
  span {
    margin: 0 1.25rem;
    font-size: 1.25rem;
  }
  button {
    border-radius: 3px;
    background: #f4a010;
    color: #fff;
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
  }

  @media screen and (max-width: 490px) {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
  }
`;

const ChooseDate = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); // 用戶選中的日期
  const [todayDate, setTodayDate] = useState(new Date()); // 今天的日期

  // 選取的密室主題
  const { selectedTheme } = useContext(ThemeContext);
  // console.log(selectedTheme);

  // 選取預訂日期
  const { reservationDate, setReservationDate } =
    useContext(ReservationContext);

  // 選取場次時間
  const { reservationTime, setReservationTime } =
    useContext(ReservationContext);

  // 設定總價
  const { total, setTotal } = useContext(ReservationContext);

  // 選擇人數數量
  const { count, setCount } = useContext(ReservationContext);

  const [errorMsg, setErrorMsg] = useState(""); // 存放當有(日期、場次時間、人數)其中一項未填的時候出現的錯誤訊息

  const slots = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];

  // 處理密室主題的時間轉換成小時分鐘制
  const translateTime = (minuteTime) => {
    const hours = Math.floor(minuteTime / 60);
    const minutes = minuteTime % 60;
    return `${hours} 小時 ${minutes} 分鐘`;
  };

  const themeDuration = translateTime(selectedTheme.duration);

  const tileClassName = ({ date, view }) => {
    // 为了避免与本地时区混淆，可以使用 UTC 日期
    const today = new Date(new Date().toDateString());
    const selected = new Date(selectedDate.toDateString());

    // 当视图是“月”时才应用样式
    if (view === "month") {
      // 如果磁贴是今天的日期
      if (date.toDateString() === today.toDateString()) {
        return "todayDate";
      }
      // 如果磁贴是选中的日期
      if (date.toDateString() === selected.toDateString()) {
        return "selectedDate";
      }
    }
  };

  const onChange = (date) => {
    setSelectedDate(date); // 設置選中的日期
    setReservationDate(formatDateWithMoment(date)); // 制定格式化的日期顯示
  };

  const formatDateWithMoment = (date) => {
    moment.locale("zh-cn"); // 設定語言
    return moment(date).format("YYYY年MM月DD日(dddd)");
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 檢查日期、場次時間、人數數量是否都有選擇
  const checkReserve = () => {
    let errors = []; // 初始化一個空列表來收集錯誤訊息

    if (!reservationDate) {
      errors.push("請選擇日期!");
    }
    if (!reservationTime) {
      errors.push("請選擇場次!");
    }
    if (count == 0) {
      errors.push("請選擇人數!");
    }

    // 如果有任何錯誤(ex:沒選到 日期 or 場次 or 人數)
    if (errors.length > 0) {
      setErrorMsg(errors.join(" ")); // 將errors陣列的每個index值中間都加上空格並且合併成一個字串
      return;
    }

    // 如果都有填選值的話，就可以清除錯誤訊息並進行下一步導向到/reservationprocess頁面
    setErrorMsg("");

    // 將預訂的資訊個別儲存到本地儲存空間(localStorage)
    localStorage.setItem("reservationDate", JSON.stringify(reservationDate));
    localStorage.setItem("reservationTime", JSON.stringify(reservationTime));
    localStorage.setItem("total", JSON.stringify(total));
    localStorage.setItem("count", JSON.stringify(count));

    navigate("/reservationprocess");
  };

  return (
    <>
      <Global styles={globalStyles} /> {/* 應用全局樣式 */}
      <ReserveHeader />
      <Wrapper>
        <MainContainer>
          <TopBlock>
            <Title>選擇(日期、場次、人數)</Title>
            <Exit>
              <Link to="/reserve">
                <RxCross2 size={25} />
              </Link>
            </Exit>
          </TopBlock>
          <hr />
          <ChooseContain>
            <LeftBlock>
              <h5>請選擇日期</h5>
              <CalendarBlock>
                <Calendar
                  onChange={onChange}
                  value={date}
                  minDate={today}
                  tileClassName={tileClassName}
                />
              </CalendarBlock>
            </LeftBlock>
            <RightBlock>
              <h5>請選擇場次</h5>
              <TimeBlock>
                <div className="time-sessions">
                  {slots.map((slot) => {
                    let key = uuidv4();
                    return <TimeSlot key={key} slot={slot} />;
                  })}
                </div>
              </TimeBlock>
              <h5>請選擇數量</h5>
              <PlayerBlock>
                <ChoosePlayer />
              </PlayerBlock>
            </RightBlock>
          </ChooseContain>

          <ResultContain>
            <ThemeBlock>
              <p>{selectedTheme.name}</p>
              <p>{themeDuration}</p>
            </ThemeBlock>
            <DateBlock>
              <p>日期: {reservationDate}</p>
              <p>場次時間: {reservationTime} </p>
              <p>人數: {count}人</p>
            </DateBlock>

            <Next>
              {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
              <span>${total}</span>
              <button onClick={checkReserve}>下一步</button>
            </Next>
          </ResultContain>
        </MainContainer>
      </Wrapper>
    </>
  );
};

export default ChooseDate;
