import React from "react";
import styled from "@emotion/styled";
import ReserveRooms from "./ReserveRooms";
import { v4 as uuidv4 } from "uuid";

const ThemeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const ReservedList = ({ orderThemes }) => {
  return (
    <ThemeList>
      {orderThemes.map((themeData) => {
        const key = uuidv4();
        return <ReserveRooms key={key} themeData={themeData} />;
      })}
    </ThemeList>
  );
};

export default ReservedList;
