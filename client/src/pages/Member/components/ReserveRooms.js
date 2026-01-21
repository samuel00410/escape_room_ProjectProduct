import React from "react";
import styled from "@emotion/styled";
import moment from "moment";
import img from "../../../images/157937008_3745310832213528_5425317224597840220_o.webp";

const ReserveItem = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  flex: 1 1 300px;
  max-width: 300px;
`;

const ImageContainer = styled.div`
  padding: 0 1.5rem;
`;

const ReserveContent = styled.div`
  p {
    text-align: center;
    font-size: 1.25rem;
    padding: 0.25rem 0;
  }
`;

const ReserveRooms = ({ themeData }) => {
  // console.log(themeData);
  const serverURL =
    "https://escaperoomprojectproduct-production.up.railway.app";
  const imageURL = `${serverURL}/${themeData.EscapeRoomTheme.imageURL}`;
  const formattedDate = moment(themeData.reservationDate).format(
    "YYYY-MM-DD HH:mm",
  );

  return (
    <ReserveItem>
      <ImageContainer>
        <img src={imageURL} alt="密室逃脫圖片" />
      </ImageContainer>

      <ReserveContent>
        <p>
          主題: <span>{themeData.EscapeRoomTheme.name}</span>
        </p>
        <p>預訂日期時間:</p>
        <p>{formattedDate}</p>
        <p>
          預訂遊戲人數: <span>{themeData.people}人</span>
        </p>
        <p>
          遊戲時間: <span>{themeData.EscapeRoomTheme.duration}分鐘</span>
        </p>
      </ReserveContent>
    </ReserveItem>
  );
};

export default ReserveRooms;
