// models/member.js
const bcrypt = require("bcrypt");

("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      // define association here
      Member.belongsToMany(models.EscapeRoomTheme, {
        through: models.MemberFavoriteTheme,
        foreignKey: "memberId", // 這表示在 Memberfavoritetheme 表中會有一個 memberId 列指向 Member 表的主鍵。
        as: "favoritedThemes", // as 用於在 Sequelize 查詢中引用這些關聯。例如，如果您想獲得一個會員收藏的所有密室主題，您可以在查詢 Member 模型時使用 favoritedThemes 這個別名。
      });

      // 新增對MemberReservations的關聯
      Member.hasMany(models.MemberReservation, {
        foreignKey: "memberId",
        as: "reservations",
      });
    }

    // 新增 Instance Method
    // 比對密碼
    async comparePassword(password, cb) {
      let result;
      try {
        result = await bcrypt.compare(password, this.password);
        return cb(null, result);
      } catch (e) {
        return cb(e, result);
      }
    }

    // 驗證是否為預約密室的玩家
    isPlayer() {
      return this.role == "player";
    }

    // 驗證是否為密室逃脫遊戲的創建者
    isCreator() {
      return this.role == "creator";
    }
  }
  Member.init(
    {
      googleID: { type: DataTypes.STRING, allowNull: true, unique: true },
      facebookID: { type: DataTypes.STRING, allowNull: true, unique: true },
      date: { type: DataTypes.DATE },
      thumbnail: { type: DataTypes.STRING },
      phoneNumber: { type: DataTypes.STRING },
      userName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING },
      role: {
        type: DataTypes.ENUM("player", "creator"),
        allowNull: false,
        defaultValue: "player",
      },
    },
    {
      sequelize,
      modelName: "Member",
      tableName: "members",
      hooks: {
        beforeSave: async (member, options) => {
          // 若使用者為新用戶或密碼有變更，則將密碼進行雜湊處理
          if (
            (member.isNewRecord || member.changed("password")) &&
            member.password
          ) {
            const hashedPassword = await bcrypt.hash(member.password, 10);
            member.password = hashedPassword;
          }
        },
      },
    }
  );
  return Member;
};
