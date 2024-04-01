const { google } = require("googleapis");

// 產生身份驗證 URL，若要請求使用者授予檢索存取權杖的權限，您可以將他們重新導向到同意頁面。
// 若要建立同意頁面 URL：
// 建立 OAuth2 客戶端
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_FOR_GMAIL_ID,
  process.env.GOOGLE_CLIENT_FOR_GMAIL_SECRET,
  process.env.GOOGLE_REDIRECT_FOR_GMAIL_URI
);

// 該tokens事件僅在第一次授權時發生，呼叫接收刷新token的方法時 需要設定access_typetoken。
// 如果您已經向應用程式授予了必要的權限，但沒有設定接收刷新令牌的適當限制，則需要重新授權應用程式才能接收新的刷新令牌。您可以在此撤銷您的應用程式對您帳戶的存取權。offlinegenerateAuthUrl
// 設定刷新令牌(refresh_token)
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// 獲取訪問令牌(accessToken )
const accessToken = oauth2Client.getAccessToken();

module.exports = { accessToken, oauth2Client };
