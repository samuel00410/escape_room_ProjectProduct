import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { v4 as uuidv4 } from "uuid";
// image
// import Image1 from "../../../images/智慧獵人_紅衣小女孩_01.webp";
// import Image2 from "../../../images/1535875648-1634489867_n.jpg";
// import Image3 from "../../../images/maxresdefault.jpg";

const SlidePicture = ({ themeData }) => {
  const serverURL =
    "https://escaperoomprojectproduct-production.up.railway.app";
  const slideImgs = themeData.slideImageUrls.map((slideImg) => {
    return `${serverURL}/${slideImg}`;
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    let newIndex = currentIndex;
    if (newIndex <= 0) {
      newIndex = slideImgs.length - 1;
    } else {
      newIndex--;
    }
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    let newIndex = currentIndex;
    if (newIndex >= slideImgs.length - 1) {
      newIndex = 0;
    } else {
      newIndex++;
    }
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);

    return () => clearInterval(intervalId); // 在組件卸載時清除定時器
  }, [currentIndex]); // 依賴於 currentIndex，當 currentIndex 改變時，重新執行 useEffect

  return (
    <div className="max-w-[1000px] h-[600px] w-full m-auto py-16 px-4 relative">
      <div
        style={{ backgroundImage: `url(${slideImgs[currentIndex]})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>
      {/*左邊箭頭*/}
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/*右邊箭頭*/}
      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-2 justify-center py-2 text-white">
        {slideImgs.map((slide) => {
          let key = uuidv4();
          return (
            <div key={key}>
              <RxDotFilled />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SlidePicture;
