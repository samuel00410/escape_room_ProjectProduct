import axios from "axios";

const API_URL = `https://escaperoom-project-6a9688f7a146.herokuapp.com/api/reserve`;

class Reserve {
  // 取得已登入的會員的JWT (從本地儲存空間取出)
  getToken() {
    const membersToken = localStorage.getItem("member");
    return membersToken ? JSON.parse(membersToken).token : ""; // 如果本地儲存空間沒有member這個key值，就為空字串
  }

  // 創建請求的配置，根據是否有 JWT token 決定是否需要 withCredentials(Session登入)
  getRequestConfig() {
    const token = this.getToken();
    // 如果請求中包含有token
    if (token) {
      // 將token包在標頭裡面發送請求
      return {
        headers: {
          Authorization: token,
        },
      };
    } else {
      // 否則，將連同session一起發送請求
      return { withCredentials: true };
    }
  }

  // 訪客預約密室主題
  reserveByQuest(
    name,
    email,
    phone,
    escapeRoomThemeId,
    reservationDate,
    people,
    totalPrice
  ) {
    return axios.post(API_URL + "/reserveByQuest", {
      name,
      email,
      phone,
      escapeRoomThemeId,
      reservationDate,
      people,
      totalPrice,
    });
  }

  // 會員預約密室主題 (請求需要咐上該會員的JWT，不然會顯示未授權)
  reserveByMember(
    memberId,
    escapeRoomThemeId,
    reservationDate,
    people,
    totalPrice
  ) {
    const config = this.getRequestConfig();

    return axios.post(
      API_URL + "/reserveByMember",
      {
        memberId,
        escapeRoomThemeId,
        reservationDate,
        people,
        totalPrice,
      },
      config
    );
  }
}

export default new Reserve();
