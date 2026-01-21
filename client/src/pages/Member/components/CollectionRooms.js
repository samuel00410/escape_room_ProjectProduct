import React from "react";
import styled from "@emotion/styled";

const CollectItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 300px;
  max-width: 300px;
`;

const ImageContainer = styled.div`
  padding: 0 1.5rem;
`;

const CollectContent = styled.div`
  p {
    font-size: 1.25rem;
    padding: 0.25rem 0;
  }
`;

const CollectionRooms = ({ eachRoom }) => {
  const serverURL =
    "https://escaperoomprojectproduct-production.up.railway.app";
  const image_URL = `${serverURL}/${eachRoom.EscapeRoomTheme.imageURL}`;

  return (
    <CollectItem>
      <ImageContainer>
        <img src={image_URL} alt="密室逃脫圖片" />
      </ImageContainer>

      <CollectContent>
        <p>
          主題: <span>{eachRoom.EscapeRoomTheme.name}</span>
        </p>
        <p>
          遊戲人數:{" "}
          <span>
            {eachRoom.EscapeRoomTheme.minimumPlayers}-
            {eachRoom.EscapeRoomTheme.maximumPlayers}人
          </span>
        </p>
        <p>
          遊戲時間: <span>{eachRoom.EscapeRoomTheme.duration}分鐘</span>
        </p>
      </CollectContent>
    </CollectItem>
  );
};

export default CollectionRooms;
