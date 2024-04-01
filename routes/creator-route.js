const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const db = require("../models");
const EscapeRoomTheme = db.EscapeRoomTheme;
const Category = db.Category;
const Member = db.Member;
const escapeThemeValidation = require("../validation").escapeThemeValidation;

// middleware
router.use((req, res, next) => {
  console.log("正在接收一個有關密室主題的請求...");
  next();
});

// 設置 multer 來指定文件的存儲位置和文件名 (設置 multer 將上傳的文件存儲在伺服器的 uploadImages/ 目錄下)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadImages/"); // 圖片儲存路徑
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname) //圖片名稱
    );
  },
});

const upload = multer({ storage: storage });
// 由于 multer 默认只处理一个文件，您需要稍微调整它以处理多个文件(可以使用 upload.fields([{ name: 'image', maxCount: 1 }, { name: 'slideImages', maxCount: 3 }]))
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
          "只有創建者才能發佈新密室逃脫主題。若你是創建者，請透過創建者帳號登入。"
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

    const uploadedImageURL =
      req.files["image"][0].destination + req.files["image"][0].filename;
    const slideImages = req.files["slideImages"].map((file) => {
      return file.destination + file.filename;
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
