const express = require("express");
const router = express.Router();
const registerValidation = require("../validation").registerValidation; // 引入 registerValidation function
const loginValidation = require("../validation").loginValidation; // 引入 loginValidation function
const db = require("../models");
const Member = db.Member;
const jwt = require("jsonwebtoken");
const passport = require("passport");
const logger = require("../config/logger");

router.use((req, res, next) => {
  console.log("正在接收一個跟auth有關的請求...");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("成功連結auth頁面");
});

// 註冊會員
router.post("/register", async (req, res) => {
  try {
    // 後端資料驗證 (確認數據是否符合規範)
    let { error } = registerValidation(req.body);
    if (error) {
      logger.warn("註冊失敗，註冊資料不符合規範:" + error.details[0].message);
      return res.status(400).send(error.details[0].message);
    }
    // 取得前端透過 post 方法送過來的資料
    let { phone, username, email, password } = req.body;

    // 檢查 電話號碼、電子信箱 是否重複
    const phoneExist = await Member.findOne({
      where: { phoneNumber: phone },
    });
    const emailExist = await Member.findOne({
      where: { email },
    });

    if (phoneExist) {
      logger.warn("註冊失敗，電話號碼已被註冊過");
      return res.status(400).send("此電話號碼已經被註冊過了...");
    } else if (emailExist) {
      logger.warn("註冊失敗，信箱已被註冊過");
      return res.status(400).send("此信箱已經被註冊過了...");
    }

    // 製作新會員
    let newMember = await Member.create({
      phoneNumber: phone,
      userName: username,
      email,
      password,
    });
    logger.info("註冊成功");
    return res.send({ msg: "會員新增成功", data: newMember });
  } catch (e) {
    logger.error("無法儲存使用者...伺服器異常:" + e);
    return res.status(500).send("無法儲存使用者...");
  }
});

// 登入會員
router.post("/login", async (req, res) => {
  try {
    // 後端資料驗證 (確認數據是否符合規範)
    let { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    // 取得前端透過 post 方法送過來的資料
    let { email, password } = req.body;

    // 從資料庫查看有無此信箱
    let foundMember = await Member.findOne({
      where: { email: email },
    });

    // 沒找到該信箱
    if (!foundMember) {
      return res.status(401).send("無法找到使用者，請確認信箱是否正確。");
    }

    // 找到會員
    foundMember.comparePassword(password, (err, isMatch) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (isMatch) {
        // 製作json web token
        const tokenObject = { id: foundMember.id, email: foundMember.email };
        const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
        return res.send({
          message: "成功登入",
          token: "JWT " + token,
          member: foundMember,
        });
      } else {
        return res.status(401).send("密碼錯誤");
      }
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 登出會員
router.get("/logout", (req, res) => {
  // 結束 Passport Session (Passport會自動刪除session)
  req.logOut((err) => {
    if (err) {
      return res.send(err);
    }

    res.clearCookie("connect.sid"); // 清除session Cookie （如果使用了 express-session）
    return res.send({ message: "已登出", method: "session" }); // 返回登出的方法
  });
});

// Google方式登入
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// Google的重新導向URI
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    return res.redirect("http://localhost:3000/");
  }
);

// Facebook方式登入
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: "email",
    prompt: "select_account",
  })
);

// Facebook的重新導向URI
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    // 登入成功，重定向到主頁面
    return res.redirect("http://localhost:3000/");
  }
);

// 檢查當前用戶狀態。這個 API 應該能夠識別用戶是通過 JWT 還是 Session登入的
router.get("/current_user", async (req, res) => {
  if (req.user) {
    // OAuth Session登入
    logger.info("此用戶以第三方登入透過(Google或FB)登入...");
    return res.send({ loggedIn: true, member: req.user, method: "session" });
  } else if (req.headers.authorization) {
    // 從請求Header提取JWT
    const token = req.headers.authorization.split(" ")[1]; // 假設格式是 'JWT token' (分割 'JWT token')

    try {
      // 驗證 JWT
      const jwtPayLoad = jwt.verify(token, process.env.PASSPORT_SECRET);

      // 使用 JWT 的 payload 去查找用戶
      const foundMember = await Member.findOne({
        where: { id: jwtPayLoad.id },
      });

      // 如果有找到帳戶 (JWT 驗證成功)
      if (foundMember) {
        logger.info("此用戶以JWT本地方式登入...");
        return res.send({ loggedIn: true, member: foundMember, method: "jwt" });
      } else {
        // 找不到用戶
        logger.warn("找不到用戶");
        return res.send({ loggedIn: false });
      }
    } catch (e) {
      // JWT 驗證失敗
      logger.warn("JWT 驗證失敗");
      return res.send({ loggedIn: false });
    }
  } else {
    // 未提供認證信息
    logger.error("使用者未登入! 未提供認證信息或Session不存在。");
    return res.send({ loggedIn: false });
  }
});

module.exports = router;
