import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import Image from "../../images/Login&Register_img.png";
import { ReactComponent as RunningManIcon } from "../../images/logo_man.svg";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 背景
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  background-image: url(${Image});
  background-size: cover;
  background-position: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;
  width: 100%;
  height: 100vh;
`;

// 登入外框區塊
const LoginBlock = styled.section`
  margin-top: 3.5rem;
  flex: 0 1 550px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  // 手機板
  @media screen and (max-width: 560px) {
    flex: 0 1 400px;
  }

  @media screen and (max-width: 400px) {
    flex: 0 1 250px;
  }
`;

// Icon&標題
const TopBlock = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0;

  svg {
    width: 8rem;
    height: 8rem;
  }

  h1 {
    font-size: var(--font-size-xl);
    color: #f99b1c;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  @media screen and (max-width: 560px) {
    margin: 0.5rem 0;
    svg {
      width: 6rem;
      height: 6rem;
    }
    h1 {
      font-size: var(--font-size-large);
    }
  }

  @media screen and (max-width: 400px) {
    margin: 0;
    svg {
      width: 5rem;
      height: 5rem;
    }
    h1 {
      font-size: var(--font-size-medium);
    }
  }
`;

// 表單區塊
const MiddleBlock = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2rem;

  label {
    color: #000;
    font-family: Inter;
    font-size: var(--font-size-large);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  input {
    margin: 1rem 0;
    padding: 0 0.75rem;
    border-radius: 8px;
    border: 1px solid #868686;
    background-color: #f4f4f4;
    height: 2rem;
    width: 90%;
  }

  @media screen and (max-width: 560px) {
    label {
      font-size: var(--font-size-medium);
    }
  }

  @media screen and (max-width: 400px) {
    padding: 0.75rem 1.5rem;
    label {
      font-size: var(--font-size-base);
    }
  }
`;

const Email = styled.div`
  display: flex;
  flex-direction: column;
`;

const Password = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const ForgetPassword = styled.div`
  a {
    color: #f99b1c;
    font-family: Inter;
    font-size: var(--font-size-medium);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  @media screen and (max-width: 560px) {
    a {
      font-size: var(--font-size-base);
    }
  }

  @media screen and (max-width: 400px) {
    a {
      font-size: var(--font-size-small);
    }
  }
`;

const LoginButton = styled.div`
  display: flex;
  justify-content: center;
  button {
    border-radius: 50px;
    border: 1px solid #f28927;
    background-color: #f28927;

    color: #fff;
    font-family: Inter;
    font-size: var(--font-size-medium);
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    padding: 0.5rem 1.25rem;

    transition: all 0.25s normal;
    &:hover {
      opacity: 0.85;
    }
  }

  @media screen and (max-width: 560px) {
    button {
      padding: 0.25rem 1.25rem;
      font-size: var(--font-size-base);
    }
  }

  @media screen and (max-width: 400px) {
    button {
      padding: 0.125rem 1.25rem;
      font-size: var(--font-size-small);
    }
  }
`;

const GoRegist = styled.div`
  display: flex;
  justify-content: flex-end;
  a {
    color: #f99b1c;
    font-family: Inter;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  @media screen and (max-width: 560px) {
    a {
      font-size: var(--font-size-base);
    }
  }

  @media screen and (max-width: 400px) {
    a {
      font-size: var(--font-size-small);
    }
  }
`;

const BottomBlock = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  width: 100%;
`;

// FB、Google登入
const OtherLogin = styled.div`
  margin: 6px 0;
  button {
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #8b7c7c;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    p {
      padding: 5px 8px;
      font-size: 0.75rem;
    }
  }
`;

const Login = ({ currentMember, setCurrentMember }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation(); // 抓取來自 FillInfoStep組件的<Link>裡面state物件的from屬性

  // 如果有state裡面有from的資訊(ex: 當使用者點擊 已經是會員? 請登入 的登入的話)，則使用它作為導向目的地，如果沒有，則默認導向首頁("/")
  const directToWhere = () => {
    // 使用可选链操作符安全访问 state.from
    // 如果 state 为 null，则 state?.from 评估为 undefined
    // 然后使用 || 操作符提供默认跳转路径 '/'
    const directTo = state?.from || "/";
    navigate(directTo);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // 處理登入按鈕
  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);

      // ---- 如果登入成功，將畫面導向到 /member 頁面 ----
      if (response.data) {
        toast.success("登入成功！", {
          onClose: () => {
            // 使用 setTimeout 在 toast 關閉後延遲一段時間再導航
            setTimeout(() => {
              // navigate("/");
              directToWhere();
            }, 750); // 這裡的延遲時間（750 毫秒）可以根據需求調整
          },
          autoClose: 1000, // Toast 訊息顯示的持續時間
        });

        localStorage.setItem("member", JSON.stringify(response.data)); // 將 使用者資訊(包含JWT) 存放在localStorage裡
        setCurrentMember(AuthService.getCurrentMember()); // 將 存放在localStorage裡的使用者資訊拉出來放到 currentMember 的狀態
      }
    } catch (e) {
      // ----如果登入失敗----
      let errorMsg = "登入失敗!";
      // 抓到任何錯誤訊息或回應
      if (e.response && e.response.data) {
        errorMsg = e.response.data;
      }
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  // 處理Google登入
  const handleGoogleLogin = async () => {
    AuthService.loginWithGoogle();
  };
  // 處理Facebook登入
  const handleFacebookLogin = async () => {
    AuthService.loginWithFacebook();
  };

  return (
    <Wrapper>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Background />
      <LoginBlock>
        <TopBlock>
          <RunningManIcon />
          <h1>會員登入</h1>
        </TopBlock>
        <MiddleBlock>
          <form>
            <Email>
              <label htmlFor="email">電子郵件</label>
              <input
                type="text"
                placeholder="Email"
                id="email"
                value={email}
                onChange={handleEmail}
              />
            </Email>

            <Password>
              <label htmlFor="password">密碼</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={handlePassword}
              />
            </Password>

            <ForgetPassword>
              <a href="#">忘記您的密碼?</a>
            </ForgetPassword>

            <LoginButton>
              <button type="button" onClick={handleLogin}>
                登入
              </button>
            </LoginButton>
            <GoRegist>
              <Link to="/register">還不是會員? (點我註冊)</Link>
            </GoRegist>
          </form>
        </MiddleBlock>
        <BottomBlock>
          <OtherLogin>
            <button onClick={handleGoogleLogin}>
              <FcGoogle size={25} />
              <p>Google 帳號登入</p>
            </button>
          </OtherLogin>
          <OtherLogin>
            <button onClick={handleFacebookLogin}>
              <BiLogoFacebookCircle size={25} color="blue" />
              <p>Facebook 快速登入</p>
            </button>
          </OtherLogin>
        </BottomBlock>
      </LoginBlock>
    </Wrapper>
  );
};

export default Login;
