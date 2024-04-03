import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../ThemeContext";
import styled from "@emotion/styled";
import Image from "../../../images/157937008_3745310832213528_5425317224597840220_o.webp";
import { BiTimeFive } from "react-icons/bi";
import { MdPeople } from "react-icons/md";
import { LuDollarSign } from "react-icons/lu";

const Theme = styled.div`
  flex: 1 1 330px;
  max-width: 330px;
  background-color: rgba(238, 231, 231, 0.07);
  margin: 1rem;
  border-radius: 5px;
  border: 1px solid #544d4d;
  display: flex;
  flex-direction: column;

  div.photograph {
    // background-image: url(${Image});
    width: 100%;
    height: 15vh;
    background-size: cover;
    background-position: center;
  }

  div.title-go-reserve {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0 0.75rem 0.25rem;
    p {
      padding-left: 0.5rem;
      color: #ffff;
      font-size: 1.25rem;
    }

    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 20px;
      background-color: #f30;
      color: #fff;
      padding: 0 1rem;
      margin-right: 0.25rem;

      &:hover {
        opacity: 0.75;
      }
    }
  }

  div.check-rule {
    display: flex;
    justify-content: space-around;
    color: #fff;
    div.descript {
      display: flex;
      align-items: center;
      p {
        padding: 0 0.25rem;
      }
    }
  }

  //筆電 (寬度1170px以內)
  @media screen and (max-width: 1170px) {
    // flex: 1 1 250px;
    // max-width: 250px;
  }

  // 手機版 (寬度425px以內)
  @media screen and (max-width: 425px) {
    div.title-go-reserve {
      padding: 0.75rem;
    }

    div.check-rule {
      p {
        font-size: 0.85rem;
      }
    }
  }

  // 手機版 (寬度375px以內)
  @media screen and (max-width: 375px) {
    div.check-rule {
      p {
        font-size: 0.7rem;
      }
    }
  }

  // 手機版 (寬度350px以內)
  @media screen and (max-width: 350px) {
    div.title-go-reserve {
      padding: 0.25rem;
      p {
        font-size: 1rem;
      }
    }

    div.check-rule {
      p {
        font-size: 0.5rem;
      }
    }
  }
`;

const TimeFive = styled(BiTimeFive)`
  font-size: 25px;
  color: #5f8af9;

  // 手機版 (寬度425px以內)
  @media screen and (max-width: 425px) {
    font-size: 20px;
  }
`;

const People = styled(MdPeople)`
  font-size: 25px;
  color: #5f8af9;

  // 手機版 (寬度425px以內)
  @media screen and (max-width: 425px) {
    font-size: 20px;
  }
`;

const DollarSign = styled(LuDollarSign)`
  font-size: 25px;
  color: #5f8af9;

  // 手機版 (寬度425px以內)
  @media screen and (max-width: 425px) {
    font-size: 20px;
  }
`;

const ThemeItem = ({ data }) => {
  const { setSelectedTheme } = useContext(ThemeContext);
  const serverURL = "https://escaperoom-project-6a9688f7a146.herokuapp.com";
  const image_URL = `${serverURL}/${data.imageURL}`;

  const handleSelect = () => {
    setSelectedTheme(data);
    localStorage.setItem("selectedTheme", JSON.stringify(data)); // 保存到 localStorage
  };

  return (
    <Theme>
      <div
        className="photograph"
        style={{ backgroundImage: `url(${image_URL}` }}
      ></div>
      <div className="title-go-reserve">
        <p>{data.name}</p>
        <Link to="/reserve" onClick={handleSelect}>
          預約
        </Link>
      </div>
      <div className="check-rule">
        <div className="descript">
          <TimeFive />
          <p>{data.duration}分鐘</p>
        </div>
        <div className="descript">
          <People />
          <p>
            {data.minimumPlayers}-{data.maximumPlayers}人
          </p>
        </div>
        <div className="descript">
          <DollarSign />
          <p>{data.price}起</p>
        </div>
      </div>
    </Theme>
  );
};

export default ThemeItem;
