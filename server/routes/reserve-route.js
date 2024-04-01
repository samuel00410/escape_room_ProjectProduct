const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../config/passport")(passport);
const db = require("../models");
const MemberReservation = db.MemberReservation;
const QuestReservation = db.QuestReservation;
const EscapeRoomTheme = db.EscapeRoomTheme;
const Member = db.Member;
const moment = require("moment");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { accessToken, oauth2Client } = require("../config/googleAPI");

// middleware
router.use((req, res, next) => {
  console.log("正在接收一個有關預約的請求...");
  next();
});

// 驗證使用者有無登入 (檢查會員的 JWT 或 Session) 的 Middleware (檢查該會員身分)
const customAuthMiddleware = (req, res, next) => {
  if (
    // 如果有找到 JWT，將使用 JWT策略
    req.headers.authorization &&
    req.headers.authorization.startsWith("JWT ")
  ) {
    passport.authenticate("jwt", { session: false })(req, res, next);
  } else {
    // 如果沒有JWT令牌，則檢查是否已經通過Session（如OAuth登入）
    if (req.isAuthenticated()) {
      next();
    } else {
      return res.status(401).send("此用戶未授權!");
    }
  }
};

// 訪客預定密室主題
router.post("/reserveByQuest", async (req, res) => {
  // 客戶端請求送來的資料(訪客名稱、訪客信箱、訪客電話、密室主題id、預訂時間、人數、總價格)
  const {
    name,
    email,
    phone,
    escapeRoomThemeId,
    reservationDate,
    people,
    totalPrice,
  } = req.body;

  // 解析請求得到的時間格式去轉變成資料庫時間格式
  // 假設日期時間的輸入格式是 'YYYY年MM月DD日 HH:mm'
  const formattedDate = moment(reservationDate, "YYYY年MM月DD日 HH:mm").format(
    "YYYY-MM-DD HH:mm:ss"
  );

  try {
    // 找出該密室主題id所對應的密室主題名稱
    const roomThemeName = await EscapeRoomTheme.findOne({
      where: { id: escapeRoomThemeId },
      attributes: ["name"],
    });
    if (!roomThemeName) {
      return res.status(404).send("找不到該密室主題!");
    }
    // 儲存預約資料到資料庫
    const reserveResult = await QuestReservation.create({
      name,
      email,
      phone,
      escapeRoomThemeId,
      reservationDate: formattedDate,
      people,
      totalPrice,
    });

    // 設定郵件傳輸器
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_SENDER,
        clientId: process.env.GOOGLE_CLIENT_FOR_GMAIL_ID,
        clientSecret: process.env.GOOGLE_CLIENT_FOR_GMAIL_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // 設定郵件選項
    const mailOptions = {
      from: process.env.GMAIL_SENDER,
      to: email,
      subject: "預約確認",
      html: `
        <div>
          <h1>預約資訊</h1>
          <p><strong>訂單編號：</strong>#${reserveResult.id}</p>
          <p><strong>活動名稱：</strong>${roomThemeName.name}</p>
          <p><strong>場次時間：</strong>${reservationDate}</p>
          <p><strong>人數：</strong>${people}</p>
          <p><strong>繳費金額：</strong>$${totalPrice}</p>
        </div>
      `,
    };

    // 發送郵件
    const result = await transporter.sendMail(mailOptions);
    console.log("信箱發送:" + result.response);

    return res.send({
      msg: "訪客預約成功且郵件已發送!!",
      reserveData: reserveResult,
      themeData: roomThemeName,
    });
  } catch (e) {
    console.log(`預約或發送郵件失敗:${e}`);
    return res.status(500).send("預約或發送郵件失敗!伺服器發生未知錯誤。");
  }
});

// 會員預訂密室主題 (需要被 JWT 或 Google OAuth 保護)
router.post("/reserveByMember", customAuthMiddleware, async (req, res) => {
  // 客戶端請求送來的資料(會員id、密室主題id、預訂時間、總價格)
  const { memberId, escapeRoomThemeId, reservationDate, people, totalPrice } =
    req.body;

  // 解析請求得到的時間格式去轉變成資料庫時間格式
  // 假設日期時間的輸入格式是 'YYYY年MM月DD日 HH:mm'  (轉換成)=>  '年-月-日 時:分' 格式
  const formattedDate = moment(reservationDate, "YYYY-MM-DD HH:mm").format(
    "YYYY-MM-DD HH:mm"
  );

  try {
    // 找出該密室主題id所對應的密室主題名稱
    const roomThemeName = await EscapeRoomTheme.findOne({
      where: { id: escapeRoomThemeId },
      attributes: ["name"],
    });
    if (!roomThemeName) {
      return res.status(404).send("找不到該密室主題!");
    }

    // 將請求送來的資料存入資料庫，並且找到預訂該密室主題的會員資訊
    const orderResult = await MemberReservation.create({
      memberId,
      escapeRoomThemeId,
      reservationDate: formattedDate,
      people,
      totalPrice,
    });

    // 找到預訂該密室主題的會員資訊
    const foundMember = await Member.findOne({
      where: { id: orderResult.memberId },
    });

    // -- 發送email給該會員 --
    // 設定 nodemailer 郵件傳輸器
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_SENDER,
        clientId: process.env.GOOGLE_CLIENT_FOR_GMAIL_ID,
        clientSecret: process.env.GOOGLE_CLIENT_FOR_GMAIL_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // 設定郵件選項配置
    const mailOptions = {
      from: process.env.GMAIL_SENDER,
      to: foundMember.email,
      subject: "預約確認",
      html: `
        <div>
          <h1>預約資訊</h1>
          <p><strong>訂單編號：</strong>#${orderResult.id}</p>
          <p><strong>活動名稱：</strong>${roomThemeName.name}</p>
          <p><strong>場次時間：</strong>${reservationDate}</p>
          <p><strong>人數：</strong>${people}</p>
          <p><strong>繳費金額：</strong>$${totalPrice}</p>
        </div>
      `,
    };

    // 發送郵件
    const result = await transporter.sendMail(mailOptions);
    console.log("信箱發送:" + result.response);

    return res.send({
      msg: "會員預約密室主題成功且郵件已發送!!",
      reserveData: orderResult,
      themeData: roomThemeName,
    });
  } catch (e) {
    console.log(`預約或發送郵件失敗:${e}`);
    return res.status(500).send("預約或發送郵件失敗!伺服器發生未知錯誤。");
  }
});

module.exports = router;
