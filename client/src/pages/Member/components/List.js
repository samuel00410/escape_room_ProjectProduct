import React from "react";
import CollectionRooms from "./CollectionRooms";
import ReserveRooms from "./ReserveRooms";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";

const ItemList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const List = ({ collectRooms }) => {
  return (
    <ItemList>
      {collectRooms.map((eachRoom) => {
        const randomKey = uuidv4();
        return (
          <CollectionRooms
            key={randomKey}
            eachRoom={eachRoom}
          ></CollectionRooms>
        );
      })}
    </ItemList>
  );
};

export default List;
