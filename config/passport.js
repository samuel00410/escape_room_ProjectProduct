let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt; // 功能: 將客戶端送來的JWT內容拉出來
const db = require("../models");
const Member = db.Member;
const logger = require("./logger");

module.exports = (passport) => {
  // 製作 options (給定從 HTTP Request header 中提取 token 的方法和設定 secret)
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.PASSPORT_SECRET;

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      // 驗證 JWT
      logger.info("檢測到使用者的資料: ");
      logger.info(jwt_payload);
      try {
        let foundMember = await Member.findOne({
          where: { id: jwt_payload.id },
        });
        if (foundMember) {
          return done(null, foundMember); // 把 req.user <= foundMember
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e, false);
      }
    })
  );
};
