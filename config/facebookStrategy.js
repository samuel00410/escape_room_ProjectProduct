const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const db = require("../models");
const Member = db.Member;
const logger = require("../config/logger");

// done()執行時，將參數值放入 session 內部，並在用戶端設置 cookie
passport.serializeUser((user, done) => {
  console.log("Serilize使用者...");
  done(null, user.id); // 將資料庫的id，存在session
  // 並且將 id 簽名後，用 Cookie 的形式給使用者...
});

passport.deserializeUser(async (id, done) => {
  console.log(
    "Deserialize使用者...使用serializeUser儲存的id，去找到資料庫內的資料",
  );
  let foundMember = await Member.findOne({ where: { id } });
  done(null, foundMember); // 將 req.user 這個屬性設定為 foundMember
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: `https://escaperoomprojectproduct-production.up.railway.app/api/auth/facebook/redirect`,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      logger.info("進入Facebook Strategy的區域");
      logger.info(profile);
      logger.info("==========================");
      let foundMember = await Member.findOne({
        where: { facebookID: profile.id },
      });
      if (foundMember) {
        logger.info("使用者已經註冊過了，無須存入資料庫內。");
        done(null, foundMember);
      } else {
        logger.info("偵測到新用戶，需要將資料存入資料庫內。");
        let newMember = await Member.create({
          userName: profile.displayName,
          facebookID: profile.id,
          thumbnail: profile.photos[0].value,
          email: profile.emails[0].value,
        });

        logger.info("已成功儲存新會員。");
        done(null, newMember);
      }
    },
  ),
);
