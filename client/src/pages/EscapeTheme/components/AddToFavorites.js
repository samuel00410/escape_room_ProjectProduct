import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import MemberService from "../../../services/member.service";

const HeartContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  z-index: 5;

  &:hover {
    cursor: pointer;
  }
`;

const TextNotification = styled.span`
  position: absolute;
  top: -60px; // 使文字出現在愛心的上方
  right: -30px; // 將文字移動到愛心的右邊
  color: black;
  opacity: 0; // 預設透明度為0
  transition: opacity 0.3s ease-in-out;
`;

const FilledHeart = styled(AiFillHeart)`
  transition: all 0.3s ease-in-out;
`;

const OutlinedHeart = styled(AiOutlineHeart)`
  transition: all 0.3s ease-in-out;
`;

const AddToFavorites = ({ item, currentMember }) => {
  const [isFavorited, setIsFavorited] = useState(false); // 追蹤是否已加入收藏
  const [showText, setShowText] = useState(false);

  // 在組件加載時檢查該會員的收藏狀態 (換了其他會員的話畫面就會自動更新)
  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        let response = await MemberService.checkFavorite(
          currentMember.member.id,
          item.id
        );
        setIsFavorited(response.data.isFavorited);
      } catch (e) {
        console.log("檢查狀態失敗", e);
      }
    };

    checkIfFavorited();
  }, [item.id, currentMember.member.id]);

  const handleAddFav = async () => {
    try {
      await MemberService.addFavorite(currentMember.member.id, item.id);
    } catch (e) {
      console.log("加入收藏失敗", e);
    }
  };

  const handleDeleteFav = async () => {
    try {
      await MemberService.deleteFavorite(currentMember.member.id, item.id);
    } catch (e) {
      console.log("取消收藏失敗", e);
    }
  };

  const handleFavorite = async () => {
    setShowText(true); // 點擊時顯示文字

    try {
      // 如果已加過最愛，取消收藏
      if (!isFavorited) {
        await handleAddFav();
      } else {
        await handleDeleteFav();
      }
      // 更改該會員的收藏狀態
      setIsFavorited(!isFavorited);
    } catch (e) {
      console.error("收藏操作失败", e);
    }

    setTimeout(() => {
      setShowText(false); // 幾秒後隱藏文字
    }, 2000);
  };

  return (
    <HeartContainer onClick={handleFavorite}>
      {isFavorited ? (
        <>
          <FilledHeart size={30} color="rgba(241,51,51)" />
          <TextNotification style={{ opacity: showText ? 1 : 0 }}>
            已加入收藏 !
          </TextNotification>
        </>
      ) : (
        <>
          <OutlinedHeart size={30} color="gray" />
          <TextNotification style={{ opacity: showText ? 1 : 0 }}>
            已取消收藏 !
          </TextNotification>
        </>
      )}
    </HeartContainer>
  );
};

export default AddToFavorites;
