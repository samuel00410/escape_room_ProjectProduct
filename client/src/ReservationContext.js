// 共享預約流程的資料(日期、場次時間、總價錢)
import React, { createContext, useState } from "react";

export const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  // 從本地儲存空間(localStorage)提取個別預訂資料的狀態
  const getLocalStorageItem = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  // 跨組件共享的(預約資料)狀態
  // 預訂日期
  const [reservationDate, setReservationDate] = useState(() => {
    return getLocalStorageItem("reservationDate", null);
  });
  // 預訂場次時間
  const [reservationTime, setReservationTime] = useState(() => {
    return getLocalStorageItem("reservationTime", null);
  });
  // 總價格
  const [total, setTotal] = useState(() => {
    return getLocalStorageItem("total", 0);
  });
  // 人數
  const [count, setCount] = useState(() => {
    return getLocalStorageItem("count", 0);
  });

  return (
    <ReservationContext.Provider
      value={{
        reservationDate,
        setReservationDate,
        reservationTime,
        setReservationTime,
        total,
        setTotal,
        count,
        setCount,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
