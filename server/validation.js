const Joi = require("joi");

// 註冊驗證
const registerValidation = (data) => {
  const schema = Joi.object({
    phone: Joi.string()
      .pattern(/^[0-9]+$/)
      .min(10)
      .max(10)
      .required()
      .messages({
        "string.pattern.base": `"連絡電話" 必須是有效的數字串!`,
        "string.min": `"連絡電話" 必須有 {#limit} 個數字!`,
        "string.max": `"連絡電話" 必須有 {#limit} 個數字!`,
        "string.empty": `"連絡電話"不能為空，請輸入 "手機號碼" !`, // 當手機號碼為空字符串時顯示的錯誤消息
        "any.required": `請輸入 "連絡電話" !`, // 欄位未被提供時的錯誤消息
      }),
    username: Joi.string().alphanum().min(3).max(50).required().messages({
      "string.min": `"帳號名稱" 至少需要 {#limit} 個字!`,
      "string.max": `"帳號名稱" 不能超過 {#limit} 個字!`,
      "string.alphanum": `"帳號名稱" 只能包含字母和數字!`,
      "string.empty": `"帳號名稱"不能為空，請輸入 "帳號名稱" !`, // 當手機號碼為空字符串時顯示的錯誤消息
      "any.required": `請輸入 "帳號名稱" !`, // 欄位未被提供時的錯誤消息
    }),
    email: Joi.string().min(6).max(50).required().email().messages({
      "string.email": `"信箱" 必須是有效的信箱!`,
      "string.min": `"信箱" 至少需要 {#limit} 個字!`,
      "string.max": `"信箱" 不能超過 {#limit} 個字!`,
      "string.empty": `"信箱"不能為空，請輸入"信箱"!`,
      "any.required": `請輸入"信箱"`,
    }),
    password: Joi.string().required().messages({
      "string.empty": `"密碼"不能為空，請輸入"密碼"!`,
      "any.required": `請輸入"密碼"!`,
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

// 登入驗證
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email().messages({
      "string.min": `"帳號名稱" 至少需要 {#limit} 個字!`,
      "string.max": `"帳號名稱" 不能超過 {#limit} 個字!`,
      "string.email": `"信箱" 必須是有效的信箱!`,
      "string.empty": `請輸入 "帳號名稱" !`, // 當手機號碼為空字符串時顯示的錯誤消息
    }),
    password: Joi.string().required().messages({
      "string.empty": `請輸入"密碼"!`,
    }),
  });

  return schema.validate(data, { abortEarly: false });
};

// 密室類別及密室內容驗證
const escapeThemeValidation = (data) => {
  const schema = Joi.object({
    categoryName: Joi.string().required(),
    themeName: Joi.string().required(),
    storyContent: Joi.string().required(),
    description: Joi.string().required(),
    difficultyLevel: Joi.number().integer(),
    minimumPlayers: Joi.number().integer().required(),
    maximumPlayers: Joi.number().integer().required(),
    duration: Joi.number().integer().required(),
    price: Joi.number().positive().precision(2).required(), // positive() 方法確保價格是一個正數，precision(2) 方法來處理小數點後的數字
    details: Joi.string().required(), // details 是一个 JSON 字符串
    // imageURL: Joi.string().required(),
    isActive: Joi.boolean().required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.escapeThemeValidation = escapeThemeValidation;
