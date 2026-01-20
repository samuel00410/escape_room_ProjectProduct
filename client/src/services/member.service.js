import axios from "axios";

const API_URL = `https://escaperoomprojectproduct-production.up.railway.app/api`;

class MemberService {
  // 檢查本機儲存空間是否有存放會員的token (有無登入過會員)
  getToken() {
    const membersToken = localStorage.getItem("member");
    return membersToken ? JSON.parse(membersToken).token : "";
  }

  // 創建 axios 請求的配置，根據是否有 JWT token 決定是否需要 withCredentials
  getRequestConfig() {
    const token = this.getToken();
    if (token) {
      return { headers: { Authorization: token } };
    } else {
      return { withCredentials: true };
    }
  }

  // 檢查會員收藏密室主題狀態
  checkFavorite(memberId, themeId) {
    const token = this.getToken();
    const config = this.getRequestConfig();

    return axios.get(
      API_URL + `/members/checkFavorite/${memberId}/${themeId}`,
      config,
    );
  }

  // 會員將密室主題加入收藏
  addFavorite(memberId, themeId) {
    const token = this.getToken();
    const config = this.getRequestConfig();

    return axios.post(
      API_URL + "/members/addFavorite",
      { memberId, themeId },
      config,
    );
  }

  // 會員已收藏的該密室主題取消收藏
  deleteFavorite(memberId, themeId) {
    const token = this.getToken();
    const config = this.getRequestConfig();

    return axios.delete(API_URL + "/members/deleteFavorite", {
      data: { memberId, themeId },
      ...config,
    });
  }

  // 顯示會員收藏的所有密室主題
  showFavorite(memberId) {
    const token = this.getToken();
    const config = this.getRequestConfig();

    return axios.get(
      API_URL + `/members/showCollectThemes/${memberId}`,
      config,
    );
  }

  // 顯示會員預約的所有密室主題
  showAllAppointments() {
    const config = this.getRequestConfig();

    return axios.post(API_URL + "/members/showReserveThemes", {}, config);
  }
}

export default new MemberService();
