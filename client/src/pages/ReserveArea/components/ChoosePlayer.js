import React, { useState, useEffect, useContext } from "react";
import styled from "@emotion/styled";
import { ThemeContext } from "../../../ThemeContext";
import { ReservationContext } from "../../../ReservationContext";

const Container = styled.section`
  border: 1px solid rgb(255, 255, 255);
  box-shadow: rgba(96, 97, 112, 0.16) 0px 4px 8px,
    rgba(40, 41, 61, 0.04) 0px 0px 2px;
  padding: 1rem;
  display: flex;
  align-items: center;

  @media screen and (max-width: 490px) {
    padding: 0.25rem;
  }
`;

const Left = styled.section`
  padding: 1rem;

  div.price_des {
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }

  div.price {
    color: rgb(244, 160, 16);
    margin-bottom: 0.5rem;
    font-size: 1.15rem;
  }

  div.least-res {
    color: rgb(198, 203, 213);
  }

  @media screen and (max-width: 490px) {
    div.price_des {
      font-size: var(--font-size-base);
    }

    div.price {
      font-size: 1.1rem;
    }

    div.least-res {
      font-size: var(--font-size-small);
    }
  }
`;

const Right = styled.section`
  margin-left: 10rem;
  display: flex;
  align-items: center;

  div {
    margin: 0 1rem;
  }

  div.operation {
    border: 1px solid rgb(198, 203, 213);
    color: rgb(198, 203, 213);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  div.active-reduce {
    border: 1px solid rgb(244, 160, 16);
    color: rgb(244, 160, 16);
  }

  div.plus {
    border: 1px solid rgb(244, 160, 16);
    color: rgb(244, 160, 16);
  }

  div.active-plus {
    border: 1px solid rgb(198, 203, 213);
    color: rgb(198, 203, 213);
  }

  @media screen and (max-width: 570px) {
    margin-left: 5rem;
  }

  @media screen and (max-width: 490px) {
    margin-left: 0.5rem;

    div {
      margin: 0 0.5rem;
    }
  }
`;

const ChoosePlayer = () => {
  const { selectedTheme } = useContext(ThemeContext); // 從全域變數那裏抓到選取的密室主題資訊

  const max = selectedTheme.maximumPlayers; // 設定最高人數
  const min = selectedTheme.minimumPlayers; // 設定最低人數
  const pricePerPerson = Math.floor(selectedTheme.price); // 設定每人票價
  // 設定總價
  const { setTotal } = useContext(ReservationContext);

  // 選擇人數數量
  const { count, setCount } = useContext(ReservationContext);

  useEffect(() => {
    // 初始化人數和總價
    if (count === 0) {
      setCount(min);
      setTotal(min * pricePerPerson);
    }
  }, [min, pricePerPerson, setCount, setTotal]);

  const handleReduce = () => {
    if (count > min) {
      setCount((prev) => prev - 1);
      setTotal((count - 1) * pricePerPerson);
    }
  };

  const handlePlus = () => {
    if (count < max) {
      setCount((prev) => prev + 1);
      setTotal((count + 1) * pricePerPerson);
    }
  };

  // const handleReduce = () => {
  //   if (count == min) {
  //     setCount((prev) => {
  //       return prev - min;
  //     });

  //     setTotal((prev) => {
  //       return prev - price * min;
  //     });
  //   } else if (count != 0) {
  //     setCount((prev) => {
  //       return prev - 1;
  //     });

  //     setTotal((prev) => {
  //       return prev - price;
  //     });
  //   }
  // };

  // const handlePlus = () => {
  //   if (count == 0) {
  //     setCount((prev) => {
  //       return prev + min;
  //     });

  //     setTotal((prev) => {
  //       return prev + price * min;
  //     });
  //   } else if (count != max) {
  //     setCount((prev) => {
  //       return prev + 1;
  //     });

  //     setTotal((prev) => {
  //       return prev + price;
  //     });
  //   }
  // };

  return (
    <Container>
      <Left>
        <div className="price_des">
          {min}~{max}人遊戲票價
        </div>
        <div className="price">${pricePerPerson}</div>
        <div className="least-res">
          可預訂數: {min}-{max}
        </div>
      </Left>
      <Right>
        {/* 減選項 */}
        <div
          className={`operation reduce ${count > 0 && "active-reduce"}`}
          onClick={handleReduce}
        >
          -
        </div>
        {/* 數量 */}
        <div className="num">{count}</div>
        {/* 加選項 */}
        <div
          className={`operation plus ${count == max && "active-plus"}`}
          onClick={handlePlus}
        >
          +
        </div>
      </Right>
    </Container>
  );
};

export default ChoosePlayer;
