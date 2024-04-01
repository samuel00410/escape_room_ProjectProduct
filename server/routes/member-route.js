const express = require("express");
const router = express.Router();
const db = require("../models");
const Member = db.Member;
const EscapeRoomTheme = db.EscapeRoomTheme;
const MemberFavoriteTheme = db.MemberFavoriteTheme;
const MemberReservation = db.MemberReservation;

// middleware
router.use((req, res, next) => {
  console.log("正在接收一個跟member有關的請求...");
  next();
});

// 檢查使用者是否有登入的 middleware
// const authCheck = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     return res.redirect("http://localhost:3000/login");
//   }
// };

// 檢查密室主題是否已被收藏
router.get("/checkFavorite/:memberId/:themeId", async (req, res) => {
  const { memberId, themeId } = req.params;
  try {
    // 檢查該會員有無儲存該密室
    let themeFavoriteExist = await MemberFavoriteTheme.findOne({
      where: { memberId, escapeRoomThemeId: themeId },
    });

    // 返回一個 boolean值來表示主題是否被該會員收藏 (true=>有收藏，false=>無收藏)
    return res.status(200).json({ isFavorited: !!themeFavoriteExist });
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 找到該密室主題，並加入該會員的最愛(納入收藏)
router.post("/addFavorite", async (req, res) => {
  const { memberId, themeId } = req.body; // 抓到從前端透過axios請求送過來的 JSON數據(物件裡面包含的 member_id、theme_id 屬性)
  try {
    let foundMember = await Member.findOne({ where: { id: memberId } });
    if (!foundMember) {
      return res.status(400).send("找不到此會員");
    }

    let foundTheme = await EscapeRoomTheme.findOne({ where: { id: themeId } });
    if (!foundTheme) {
      return res.status(400).send("找不到此密室主題");
    }

    // 把該會員的id和其會員所選擇的密室主題id存到關聯式資料表裡
    let newFavorite = await MemberFavoriteTheme.create({
      memberId: memberId,
      escapeRoomThemeId: themeId,
    });

    return res.send({ msg: "會員收藏密室成功", data: newFavorite });
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 取消收藏，刪除該會員裡面的密室主題
router.delete("/deleteFavorite", async (req, res) => {
  const { memberId, themeId } = req.body; // 抓到從前端透過axios請求送過來的 JSON數據(物件裡面包含的 member_id、theme_id 屬性)
  try {
    let foundMember = await Member.findOne({ where: { id: memberId } });
    if (!foundMember) {
      return res.status(400).send("找不到此會員");
    }

    let foundTheme = await EscapeRoomTheme.findOne({ where: { id: themeId } });
    if (!foundTheme) {
      return res.status(400).send("找不到此密室主題");
    }

    await MemberFavoriteTheme.destroy({
      where: { memberId: memberId, escapeRoomThemeId: themeId },
    });

    return res.send("收藏已取消");
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 顯示該會員收藏的密室
router.get("/showCollectThemes/:memberId", async (req, res) => {
  const { memberId } = req.params;
  try {
    let foundThemes = await MemberFavoriteTheme.findAll({
      where: { memberId },
      include: [
        {
          model: EscapeRoomTheme,
        },
      ],
    });
    // 沒有找到該會員
    if (!foundThemes || foundThemes.length === 0) {
      return res.status(400).send("找不到此會員的收藏");
    }

    // 有找到該會員，顯示該會員所收藏的所有密室
    return res.send(foundThemes);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 顯示該會員預約的所有密室
router.post("/showReserveThemes", async (req, res) => {
  try {
    const memberId = req.user.id; // 經過(JWT or Session)驗證完後會去自動取出該會員資訊丟入req.user這物件裡
    console.log(" --- 會員資訊 ---");
    console.log(req.user.toJSON());

    // 找出該會員所預訂的所有密室主題
    const findAllOrders = await MemberReservation.findAll({
      where: { memberId },
      include: [EscapeRoomTheme],
    });

    if (findAllOrders.length === 0) {
      return res.status(400).send("找不到此會員的預訂的資訊");
    }

    const orders = findAllOrders.map((item) => item.toJSON());
    console.log("--- 該會員預訂密室的所有訂單 ---");
    console.log(orders); // 顯示該會員預訂密室的所有訂單

    return res.send(findAllOrders);
  } catch (err) {
    return res.status(500).send("尋找訂單失敗，伺服器發生錯誤。" + err);
  }
});

module.exports = router;
