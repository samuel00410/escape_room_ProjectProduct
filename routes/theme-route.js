const express = require("express");
const router = express.Router();
const db = require("../models");
const { Op, where } = require("sequelize");
const logger = require("../config/logger"); // 日誌
const Category = db.Category;
const EscapeRoomTheme = db.EscapeRoomTheme;

router.use((req, res, next) => {
  console.log("正在接受一個跟密室逃脫主題有關的請求...");
  next();
});

// 得到所有的密室主題
router.get("/", async (req, res) => {
  try {
    let foundTheme = await EscapeRoomTheme.findAll({
      include: [{ model: Category, as: "categories" }],
    });
    return res.send(foundTheme);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 得到指定的類型的所有密室主題
router.get("/category/:categoryname", async (req, res) => {
  try {
    let foundThemes = await Category.findAll({
      where: { name: req.params.categoryname },
      include: [{ model: EscapeRoomTheme, as: "escaperoomthemes" }],
    });

    // 如果沒找到無該類型的密室
    if (foundThemes.length == 0) {
      return res
        .status(400)
        .send("目前還沒有此相關類型的密室主題~也許未來將會新增，請敬請期待。");
    }

    return res.send(foundThemes);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 根據搜尋的結果(引擎輸入、特色分類、遊玩人數、每人預算)去顯示特定結果的密室主題
router.get("/searchResult", async (req, res) => {
  const { themeName, categoryName, players, price } = req.query;
  try {
    // 構建查詢條件
    const queryConditions = {};

    if (themeName) {
      queryConditions.name = { [Op.like]: `%${themeName}%` };
    }

    const includeConditions = [];

    if (categoryName) {
      includeConditions.push({
        model: Category,
        as: "categories",
        where: { name: categoryName },
      });
    }
    if (players) {
      queryConditions.minimumPlayers = { [Op.lte]: players }; // 搜尋的結果 至少玩家值 要小於<= players 的值
      queryConditions.maximumPlayers = { [Op.gte]: players }; // 搜尋的結果 最多玩家值 要大於>= players 的值
    }
    if (price) {
      // 如果價格為不限，則不需要添加條件
      if (price === "不限") {
      } else if (price === "$400以內") {
        queryConditions.price = { [Op.lte]: 400 }; // 搜尋小於等於400以內的值
      } else if (price === "$1000以上") {
        queryConditions.price = { [Op.gte]: 1000 }; // 搜尋大於等於1000以上的值
      } else {
        // ex:'$400~$600'的範圍
        const prices = price.split("~").map((p) => {
          return parseFloat(p.replace("$", "")); // 处理非纯数字的字符串，对于像 $400 这样的字符串，您可以使用 parseFloat() 来提取数字部分。
        });
        queryConditions.price = { [Op.gte]: prices[0], [Op.lte]: prices[1] };
      }
    }

    // 執行查詢
    const foundThemes = await EscapeRoomTheme.findAll({
      where: queryConditions,
      include: includeConditions,
    });

    if (foundThemes.length === 0) {
      return res.status(400).send("查無此密室，請重新查詢。");
    }

    return res.send({
      msg: "您所尋找的密室主題如下",
      data: foundThemes,
    });
  } catch (e) {
    logger.error(`搜尋過程中發生錯誤: ${e.message}`); // 使用 Winston 記錄錯誤訊息
    return res.status(500).send({ error: "伺服器錯誤，請稍後再試" });
  }
});

// 透過密室id得到指定密室主題的所有內容
router.get("/:id", async (req, res) => {
  try {
    const foundTheme = await EscapeRoomTheme.findOne({
      where: { id: req.params.id },
    });

    // 沒找到該密室
    if (!foundTheme) {
      return res.status(404).send("找不到該密室主題...");
    }

    return res.send({ msg: "以下為您所尋找的主題內容", data: foundTheme });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
