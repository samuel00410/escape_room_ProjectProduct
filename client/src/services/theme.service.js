import axios from "axios";

const API_URL = `https://escaperoom-project-6a9688f7a146.herokuapp.com/api`;

class ThemeService {
  // 新增新的密室主題
  addNewTheme(formData) {
    let token;
    // 查看登入者有無登入過，並檢查身分
    if (localStorage.getItem("member")) {
      token = JSON.parse(localStorage.getItem("member")).token;
    } else {
      token = "";
    }

    return axios.post(API_URL + "/creator/category/escapetheme", formData, {
      headers: { "Content-Type": "multipart/form-data", Authorization: token },
    });
  }

  // 抓到所有密室主題
  getAllTheme() {
    return axios.get(API_URL + "/escapeThemeRoom");
  }

  // 查找指定的類型的密室
  searchTheme(categoryName) {
    return axios.get(API_URL + `/escapeThemeRoom/category/${categoryName}`);
  }

  // 透過id來尋找指定密室
  findTheme(id) {
    return axios.get(API_URL + `/escapeThemeRoom/${id}`);
  }

  // 透過篩選條件搜尋密室主題
  filterSearch(themeName, categoryName, players, price) {
    const queryParams = new URLSearchParams({
      themeName,
      categoryName,
      players,
      price,
    });

    return axios.get(API_URL + `/escapeThemeRoom/searchResult/?${queryParams}`);
  }
}

export default new ThemeService();
