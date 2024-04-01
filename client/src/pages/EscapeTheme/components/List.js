import React, { useEffect } from "react";
import ThemeItem from "./ThemeItem";
import HorrorItem from "./HorrorItem";
import DetectiveItem from "./DetectiveItem";
import PuzzleItem from "./PuzzleItem";
import ThemeService from "../../../services/theme.service";

const List = ({ themeItems, currentTheme, currentMember }) => {
  return (
    <>
      {/* 一開始先顯示所有的密室主題，選擇想要的類型所出現的密室主題(恐怖驚悚、偵探推理、謎題邏輯) */}
      {themeItems.map((item) => {
        switch (currentTheme) {
          case "恐怖驚悚":
            return (
              <HorrorItem
                key={item.id}
                item={item}
                currentMember={currentMember}
              />
            );
          case "偵探推理":
            return (
              <DetectiveItem
                key={item.id}
                item={item}
                currentMember={currentMember}
              />
            );
          case "謎題邏輯":
            return (
              <PuzzleItem
                key={item.id}
                item={item}
                currentMember={currentMember}
              />
            );
          default:
            return (
              <ThemeItem
                key={item.id}
                item={item}
                currentMember={currentMember}
              />
            );
        }
      })}
    </>
  );
};

export default List;
