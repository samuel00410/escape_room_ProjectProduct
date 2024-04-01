require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const Member = db.Member;
const flash = require("connect-flash");
const authRoutes = require("./routes").auth;
const memberRoutes = require("./routes").member;
const creatorRoutes = require("./routes").creator;
const escapeRoomThemeRoutes = require("./routes").escapeTheme;
const reserveRoutes = require("./routes").reserve;
const passport = require("passport");
require("./config/passport")(passport);
require("./config/googleStrategy");
require("./config/facebookStrategy");
const session = require("express-session");
const path = require("path");
const port = process.env.PORT || 8080;
const https = require("https");
const fs = require("fs");
const corsOptions = {
  origin: "http://localhost:3000", // 接受收到來自本地前端(React)那邊的請求
  credentials: true,
};

// Middleware
app.use("/uploadImages", express.static("uploadImages")); // 提供靜態文件訪問，這樣配置後，任何存儲在 uploadImages 目錄的圖片都可以通過 http://yourserver.com/uploadImages/your-image-name.jpg 訪問。 (這意味著這個目錄下的文件可以通過 HTTP 直接訪問。)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "build")));

// 為了前端能訪問後端server用
app.use(cors(corsOptions));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 創建自訂身分驗證的middleware(查看是透過 本地登入(JWT) 還是 Google 第三方登入(Session) )
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

// 設定routes
// ( 登入、註冊、登出 & Google、FB驗證相關 )
app.use("/api/auth", authRoutes); // 只要任何跟 /api/member 有關的這些route，我都要使用authRoutes裡面的這些routes
// ( 會員相關 )
// member route應該被 jwt 保護、還有 session 保護
// 如果request header內部沒有 jwt，則request就會被視為 unaurthorized(未授權)
app.use("/api/members", customAuthMiddleware, memberRoutes);
// ( 創建者 => 創建密室逃脫主題 )
// 密室遊戲創建者專用的route (需要被 jwt 保護)
// 如果request header內部沒有 jwt，則request就會被視為 unaurthorized(未授權)
app.use(
  "/api/creator/category",
  passport.authenticate("jwt", { session: false }),
  creatorRoutes
);

// 密室主題相關
app.use("/api/escapeThemeRoom", escapeRoomThemeRoutes);

// 預約密室相關
app.use("/api/reserve", reserveRoutes);

// 只要接收到 port:3000 /test的這個get Request 就執行callbackFn
app.get("/test", (req, res) => {
  res.send("測試成功，成功連接上頁面...");
});

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// HTTP 伺服器
app.listen(port, () => {
  console.log("伺服器正在聆聽port 8080...");
});
