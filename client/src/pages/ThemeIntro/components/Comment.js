import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as PeopleIcon } from "../../../images/_icons.svg";
import { ReactComponent as StarIcon } from "../../../images/star.svg";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// 評論區塊
const CommentBlock = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// 網友評論(上面標題區塊)
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  svg {
    color: #dd4f4f;
    padding: 1rem;
    width: 5rem;
    height: 5rem;
  }
`;

const Title = styled.p`
  color: #dd4f4f;
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 13.72px;
`;

// 網友評論(下面評論區塊)
const CommentContainer = styled.div`
  width: 100%;
  min-height: 30vh;
  background-color: rgba(88, 85, 85, 0.2);
  display: flex;
  justify-content: center;

  div.swiper-button-prev {
    color: antiquewhite;
  }

  div.swiper-button-next {
    color: antiquewhite;
  }
`;
// 每一個評論格框
const CommentBox = styled.div`
  width: 100%;
  height: 100%;
  text-align: left;
  padding: 0 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled.p`
  color: #876e6e;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StarIconContainer = styled.div`
  display: flex;
  padding: 0.25rem 0;
`;

const DividingLine = styled.div`
  width: 80%;
  height: 1px;
  border: 1px solid #9d8c8c;
`;

const Cotent = styled.p`
  color: #c9c6c6;
  text-align: left;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Arrow = styled.div`
  display: flex;
  align-items: center;
`;

const Comment = () => {
  return (
    <CommentBlock>
      <TitleContainer>
        <PeopleIcon />
        <Title>網友評論</Title>
      </TitleContainer>
      <CommentContainer>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          <SwiperSlide>
            <CommentBox>
              <UserName>Vivan</UserName>
              <StarIconContainer>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </StarIconContainer>
              <DividingLine />
              <Cotent>場景吸引人，機關音效也都很棒很有趣!</Cotent>
            </CommentBox>
          </SwiperSlide>

          <SwiperSlide>
            <CommentBox>
              <UserName>Nana</UserName>
              <StarIconContainer>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </StarIconContainer>
              <DividingLine />
              <Cotent>很嚇人，推~</Cotent>
            </CommentBox>
          </SwiperSlide>

          <SwiperSlide>
            <CommentBox>
              <UserName>Rion</UserName>
              <StarIconContainer>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </StarIconContainer>
              <DividingLine />
              <Cotent>想再去第二次</Cotent>
            </CommentBox>
          </SwiperSlide>

          <SwiperSlide>
            <CommentBox>
              <UserName>Kazuya</UserName>
              <StarIconContainer>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </StarIconContainer>
              <DividingLine />
              <Cotent>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Sapiente neque voluptate labore hic ratione beatae eligendi ipsa
                quia velit tempore.
              </Cotent>
            </CommentBox>
          </SwiperSlide>

          <SwiperSlide>
            <CommentBox>
              <UserName>Yamoto</UserName>
              <StarIconContainer>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </StarIconContainer>
              <DividingLine />
              <Cotent>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolorem, fugiat!
              </Cotent>
            </CommentBox>
          </SwiperSlide>
        </Swiper>
      </CommentContainer>
    </CommentBlock>
  );
};

export default Comment;
