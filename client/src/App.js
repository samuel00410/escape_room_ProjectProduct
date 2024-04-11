import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext"; // 密室主題狀態
import { ReservationProvider } from "./ReservationContext"; // 預訂資料狀態(日期、場次時間、價格)
import AuthService from "./services/auth.service";
import Loading from "./components/Loading";
import Layout from "./components/Layout";
// import Home from "./pages/Home/Home";
// import EscapeGame from "./pages/EscapeGame/EscapeGame";
// import AboutEscape from "./pages/AboutEscape/AboutEscape";
// import EscapeTheme from "./pages/EscapeTheme/EscapeTheme";
// import ThemeIntro from "./pages/ThemeIntro/ThemeIntro";
// import OnlineAppointment from "./pages/OnlineAppointment/OnlineAppointment";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Member from "./pages/Member/Member";
import ReserveArea from "./pages/ReserveArea/ReserveArea";
import ChooseDate from "./pages/ReserveArea/components/ChooseDate";
import Information from "./pages/ReserveArea/Information";
import Checkout from "./pages/ReserveArea/Checkout";
import OrderConfirm from "./pages/ReserveArea/OrderConfirm";
import ReservationProcess from "./pages/ReserveArea/ReservationProcess";
import AddNewTheme from "./pages/CreatorOnly/AddNewTheme";
import CollectionPage from "./pages/Member/CollectionPage";
import ReservePage from "./pages/Member/ReservePage";

// Lazy loading components
const Home = lazy(() => import("./pages/Home/Home"));
const EscapeGame = lazy(() => import("./pages/EscapeGame/EscapeGame"));
const AboutEscape = lazy(() => import("./pages/AboutEscape/AboutEscape"));
const EscapeTheme = lazy(() => import("./pages/EscapeTheme/EscapeTheme"));
const ThemeIntro = lazy(() => import("./pages/ThemeIntro/ThemeIntro"));
const OnlineAppointment = lazy(() =>
  import("./pages/OnlineAppointment/OnlineAppointment")
);

function App() {
  // 一開始就會去追蹤存放在 localStorage 裡面的使用者是誰
  const [currentMember, setCurrentMember] = useState(
    AuthService.getCurrentMember()
  );

  // 當任何頁面一渲染完成，就會去檢查 (檢查當前用戶狀態。識別用戶是通過 JWT 還是 Session登入的)
  useEffect(() => {
    const checkUser = async () => {
      const storedMember = AuthService.getCurrentMember();
      let loggedIn = false;
      let memberData = null;
      let method = null;
      try {
        if (storedMember && storedMember.token) {
          // 如果有 JWT，嘗試驗證 JWT
          const response = await AuthService.checkUser();
          loggedIn = response.data.loggedIn;
          memberData = response.data.member;
          method = response.data.method;
        } else {
          // 沒有JWT，檢查 Session
          const response = await AuthService.checkUser();
          loggedIn =
            response.data.loggedIn && response.data.method === "session";
          memberData = response.data.member;
          method = "session";
        }

        if (loggedIn) {
          setCurrentMember({ member: memberData, method: method });
        } else {
          setCurrentMember(null);
        }
      } catch (error) {
        console.error("使用者登入錯誤", error);
        setCurrentMember(null);
      }
    };

    checkUser();
  }, []);

  console.log(currentMember);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <ReservationProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout
                    currentMember={currentMember}
                    setCurrentMember={setCurrentMember}
                  />
                }
              >
                <Route index element={<Home />} />
                <Route path="/escape_game" element={<EscapeGame />} />
                <Route path="/aboutEscape" element={<AboutEscape />} />
                {/* 顯示密室主題頁面 */}
                <Route
                  path="/theme"
                  element={<EscapeTheme currentMember={currentMember} />}
                />
                {/* 密室主題內容介紹頁面 */}
                <Route path="/themeintro/:id" element={<ThemeIntro />} />
                {/* 預約密室主題頁面 */}
                <Route path="/appointment" element={<OnlineAppointment />} />
                <Route
                  path="/login"
                  element={
                    <Login
                      currentMember={currentMember}
                      setCurrentMember={setCurrentMember}
                    />
                  }
                />
                <Route path="/register" element={<Register />} />
                {/* 預約密室內容的頁面 */}
                <Route path="/reserve" element={<ReserveArea />} />
                <Route path="/choosedate" element={<ChooseDate />} />
                {/* <Route path="/information" element={<Information />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orderconfirm" element={<OrderConfirm />} /> */}
                <Route
                  path="/reservationprocess"
                  element={<ReservationProcess currentMember={currentMember} />}
                />
                {/* 會員專區 */}
                <Route
                  path="/member"
                  element={
                    <Member
                      currentMember={currentMember}
                      setCurrentMember={setCurrentMember}
                    />
                  }
                />
                {/* 我的收藏 */}
                <Route
                  path="/collectionRooms"
                  element={
                    <CollectionPage
                      currentMember={currentMember}
                      setCurrentMember={setCurrentMember}
                    />
                  }
                />
                {/* 預約密室 */}
                <Route
                  path="/reserveRooms"
                  element={
                    <ReservePage
                      currentMember={currentMember}
                      setCurrentMember={setCurrentMember}
                    />
                  }
                />
                {/* 創建者專用 */}
                <Route
                  path="/addnewtheme"
                  element={<AddNewTheme currentMember={currentMember} />}
                />
              </Route>
            </Routes>
          </Suspense>
        </ReservationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
