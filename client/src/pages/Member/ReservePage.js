import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Image from "../../images/Login&Register_img.png";
import GlassesImg from "../../images/18010.jpg";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { FiBook } from "react-icons/fi";
import { ReactComponent as UserIcon } from "../../images/member-svgrepo-com.svg";
import List from "./components/List";
import ReservedList from "./components/ReservedList";
import MemberService from "../../services/member.service";

// 背景
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${Image});
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopBlock = styled.div`
  width: 70vw;
  border: 1px solid #9b9797;
  background: #fefefe;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
  margin: 1.25rem 0;
`;

// 玻璃背景
const BackgroundBlock = styled.div`
  background-image: url(${GlassesImg});
  background-position: center;
  background-size: cover;
  padding: 1.5rem 1rem;
`;

// 頭像&會員名稱
const UserBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  svg {
    width: 10%;
    height: 10%;
  }
  h1 {
    margin: 0 1rem;
    font-size: 2.5rem;
    color: #000;
    font-weight: bolder;
  }

  @media screen and (max-width: 1440px) {
    svg {
      width: 120px;
    }
    h1 {
      font-size: 2.2rem;
    }
  }

  @media screen and (max-width: 768px) {
    svg {
      width: 100px;
    }
    h1 {
      font-size: 2rem;
    }
  }

  @media screen and (max-width: 425px) {
    svg {
      width: 80px;
    }
    h1 {
      font-size: 1.5rem;
    }
  }
`;

// 選單區塊
const ListNav = styled.div`
  ul {
    display: flex;
    align-items: center;
    li {
      padding: 0.75rem 1.25rem;
      color: #000;
      text-align: center;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
`;

// 收藏 (選單)
const Collect = styled.div`
  display: flex;
  button {
    margin: 0 0.25rem;
  }
`;

// 預約密室 (選單)
const Reserve = styled.div`
  display: flex;
  button {
    margin: 0 0.25rem;
  }
`;

// 選單裡的內容區塊
const BottomBlock = styled.div`
  width: 70vw;
  // height: 55vh;
  border: 1px solid #9b9797;
  background: #fefefe;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
`;

const ReserveContent = styled.div`
  .title {
    font-size: 1.5rem;
    font-weight: bolder;
    padding: 1rem;
  }
`;

// 還未收藏遊戲區塊 (只有會員沒有收藏才會出現)
const NothingReserve = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextDescript = styled.div`
  p {
    text-align: center;
    color: #000;
    text-align: center;
    font-family: Inter;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const GoCheck = styled.div`
  margin: 1rem 0;
  a {
    border-radius: 8px;
    border: 1px solid #2f2f2f;
    background-color: #2b66b1;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.25);
    color: #fff;
    font-size: 1.5rem;
    padding: 0.25rem 0.75rem;
  }
`;

const ReservePage = ({ currentMember, setCurrentMember }) => {
  const [orderThemes, setOrderThemes] = useState([]);

  // 畫面一渲染完後做的事情
  useEffect(() => {
    // 抓取該會員預約的所有密室主題
    const getAppointments = async () => {
      try {
        let response = await MemberService.showAllAppointments();
        if (response) {
          setOrderThemes(response.data);
        }
      } catch (err) {
        console.log("獲取該會員預約的密室失敗", err);
      }
    };

    getAppointments();
  }, []);

  return (
    <Wrapper>
      {!currentMember && (
        <div className="alert alert-warning">
          在獲取您的個人資料之前，您必須先登入。
        </div>
      )}
      {currentMember && (
        <>
          <TopBlock>
            <BackgroundBlock>
              <UserBlock>
                <UserIcon />
                <h1>{currentMember.member.userName}</h1>
              </UserBlock>
            </BackgroundBlock>

            <ListNav>
              <ul>
                <li>
                  <Collect>
                    <AiOutlineHeart size={20} />
                    <Link to="/collectionRooms">收藏</Link>
                  </Collect>
                </li>
                <li>
                  <Reserve>
                    <FiBook size={20} />
                    <Link to="#">預約密室</Link>
                  </Reserve>
                </li>
              </ul>
            </ListNav>
          </TopBlock>
          <BottomBlock>
            {/* 如果沒有任何預約的密室顯示如下 */}
            {orderThemes.length == 0 && (
              <NothingReserve>
                <TextDescript>
                  <p>
                    預約 0 款遊戲
                    <br />
                    還沒預約任何一款遊戲喔 !
                  </p>
                </TextDescript>
                <GoCheck>
                  <Link to="/theme">去看看</Link>
                </GoCheck>
              </NothingReserve>
            )}
            {/* 有超過一個的話就顯示出來 */}
            {orderThemes && orderThemes.length > 0 && (
              <ReserveContent>
                <div className="title">我的預約</div>
                <ReservedList orderThemes={orderThemes}></ReservedList>
              </ReserveContent>
            )}
          </BottomBlock>
        </>
      )}
    </Wrapper>
  );
};

export default ReservePage;
