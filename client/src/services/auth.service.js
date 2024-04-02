import axios from "axios";

const API_URL = `https://escaperoom-project-6a9688f7a146.herokuapp.com/api/auth`;

// 創建名為 AuthService 的 Constructor function
class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }

  logout() {
    localStorage.removeItem("member"); // 移除 JWT
    return axios.get(API_URL + "/logout", { withCredentials: true }); // 清除 Cookie 裡面的 Session id
  }

  register(phone, username, email, password) {
    return axios.post(API_URL + "/register", {
      phone,
      username,
      email,
      password,
    });
  }

  // 抓取存放在 localStorage(本機儲存空間) 裡的會員資訊
  getCurrentMember() {
    return JSON.parse(localStorage.getItem("member"));
  }

  // 透過Google登入功能
  loginWithGoogle() {
    window.location = API_URL + "/google";
  }

  // 透過Facebook登入功能
  loginWithFacebook() {
    window.location = API_URL + "/facebook";
  }

  // 呼叫檢查使用者是透過 JWT 還是 Session 方式的API
  checkUser() {
    const token = this.getToken();
    if (token) {
      return axios.get(API_URL + "/current_user", {
        headers: { Authorization: token },
      });
    } else {
      return axios.get(API_URL + "/current_user", { withCredentials: true });
    }
  }

  // 提取 JWT
  getToken() {
    const memberData = localStorage.getItem("member");
    return memberData ? JSON.parse(memberData).token : null;
  }
}

export default new AuthService();
