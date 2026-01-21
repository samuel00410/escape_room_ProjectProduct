const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const db = require("../models");
const Member = db.Member;
const logger = require("../config/logger");

// done()執行時，將參數值放入 session 內部，並在用戶端設置 cookie
passport.serializeUser((user, done) => {
  logger.info("Serilize使用者...");
  done(null, user.id); // 將資料庫的id，存在session
  // 並且將 id 簽名後，用 Cookie 的形式給使用者...
});

passport.deserializeUser(async (id, done) => {
  logger.info(
    "Deserialize使用者...使用serializeUser儲存的id，去找到資料庫內的資料",
  );
  let foundMember = await Member.findOne({ where: { id } });
  done(null, foundMember); // 將 req.user 這個屬性設定為 foundMember
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `https://escaperoomprojectproduct-production.up.railway.app/api/auth/google/redirect`, // (因為passport她會自動把ID跟 secret自動帶去做OAuth，最後會得到token和從使用者那得到的資料)如果所有的驗證都完成了，就會重新導向到這個URL
    },
    // function
    async (accessToken, refreshToken, profile, done) => {
      // 驗證Google用戶
      logger.info("進入Google Strategy的區域");
      logger.info(profile);
      logger.info("==========================");
      let foundMember = await Member.findOne({
        where: { googleID: profile.id },
      });
      if (foundMember) {
        logger.info("使用者已經註冊過了，無須存入資料庫內。");
        done(null, foundMember);
      } else {
        logger.info("偵測到新用戶，需要將資料存入資料庫內。");
        let newMember = await Member.create({
          userName: profile.displayName,
          googleID: profile.id,
          thumbnail: profile.photos[0].value,
          email: profile.emails[0].value,
        });
        logger.info("成功創建新會員。");
        done(null, newMember);
      }
    },
  ),
);
