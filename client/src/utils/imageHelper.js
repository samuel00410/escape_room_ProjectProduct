/**
 * 處理圖片 URL 的輔助函數
 * 如果圖片 URL 已經是完整的 Cloudinary URL，直接返回
 * 如果是舊的本地路徑，則加上伺服器前綴
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return "";

  // 如果已經是完整的 URL (http/https 開頭)，直接返回
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // 否則是舊的本地圖片路徑，加上伺服器前綴
  const serverURL =
    "https://escaperoomprojectproduct-production.up.railway.app";
  return `${serverURL}/${imageUrl}`;
};
