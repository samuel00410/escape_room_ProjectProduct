const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../models");
const EscapeRoomTheme = db.EscapeRoomTheme;
const Category = db.Category;
const Member = db.Member;
const escapeThemeValidation = require("../validation").escapeThemeValidation;

// Cloudinary 配置
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// middleware
router.use((req, res, next) => {
  console.log("正在接收一個有關密室主題的請求...");
  next();
});

// 設置 Cloudinary 存儲配置
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "escape-room-themes", // Cloudinary 上的資料夾名稱
    allowed_formats: ["jpg", "jpeg", "png", "webp"], // 允許的圖片格式
    transformation: [{ quality: "auto" }], // 自動優化圖片品質
  },
});

const upload = multer({ storage: storage });
// 處理多個文件上傳
const uploadMutiple = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "slideImages", maxCount: 3 },
]);

// 獲得所有密室的資料
router.get("/escapethemes", async (req, res) => {
  let Rooms = await EscapeRoomTheme.findAll();
  return res.send(Rooms);
});

// 新增一個密室類別並為該類別新增密室主題 (並且使用 middleware 來處理圖片上傳)
router.post("/escapetheme", uploadMutiple, async (req, res) => {
  const {
    categoryName,
    themeName,
    storyContent,
    description,
    difficultyLevel,
    minimumPlayers,
    maximumPlayers,
    duration,
    price,
    isActive,
  } = req.body;

  const details = JSON.parse(req.body.details);
  const slideImages = JSON.parse(req.body.details);

  try {
    // 確認登入者的身分是否為創建者
    if (req.user.isPlayer()) {
      return res
        .status(400)
        .send(
          "只有創建者才能發佈新密室逃脫主題。若你是創建者，請透過創建者帳號登入。",
        );
    }

    // 驗證資料(非圖片以外的資料)是否符合規範
    let { error } = escapeThemeValidation(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // 驗證是否有接收到封面圖片和滑動圖片
    if (!req.files["image"] || !req.files["slideImages"]) {
      return res.status(400).send("圖片必須上傳，請選擇上傳一張圖片。");
    }

    // 查詢密室類別 (查看有無相同的類別名稱)
    let catgoryFound = await Category.findOne({
      where: { name: categoryName },
    });

    // 如果類別不存在，則創建它
    if (!catgoryFound) {
      catgoryFound = await Category.create({ name: categoryName });
    }

    // 從 Cloudinary 取得上傳後的圖片 URL
    const uploadedImageURL = req.files["image"][0].path; // Cloudinary 回傳的完整 URL
    const slideImages = req.files["slideImages"].map((file) => {
      return file.path; // Cloudinary 回傳的完整 URL
    });

    // 為該類別新增密室主題
    let newTheme = await EscapeRoomTheme.create({
      categoryID: catgoryFound.id,
      name: themeName,
      storyContent,
      description,
      difficultyLevel,
      minimumPlayers,
      maximumPlayers,
      duration,
      price,
      imageURL: uploadedImageURL, // 使用上傳的圖片路徑進資料庫
      slideImageUrls: slideImages, // 使用上传的滑动图片路径数组
      isActive,
      details,
    });
    return res.send({
      msg: "新增密室類別及主題成功",
      category: catgoryFound,
      escapeRoomTheme: newTheme,
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
