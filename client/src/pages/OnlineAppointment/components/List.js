import React, { useContext } from "react";
import { ThemeContext } from "../../../ThemeContext";
import ThemeItem from "./ThemeItem";
import { v4 as uuidv4 } from "uuid";

const List = () => {
  const { themeData } = useContext(ThemeContext);
  return (
    <>
      {themeData &&
        themeData.map((data) => {
          let key = uuidv4();
          return <ThemeItem key={key} data={data} />;
        })}
    </>
  );
};

export default List;
