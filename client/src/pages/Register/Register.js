import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Image from "../../images/Login&Register_img.png";
import { ReactComponent as RunningManIcon } from "../../images/logo_man.svg";
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
const RegisBlock = styled.div`
  margin-top: 3.5rem;
  flex: 0 1 550px; // 最小寬度(至少寬度)
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);

  // 手機板
  @media screen and (max-width: 560px) {
    flex: 0 1 400px;
  }

  @media screen and (max-width: 400px) {
    flex: 0 1 300px;
  }
`;

// Icon&標題
const TopBlock = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
  padding: 0.25rem 2rem;

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

const Phone = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Username = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Email = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Password = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const RegisterButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;

  button {
    border-radius: 50px;
    border: 1px solid #f28927;
    background-color: #f28927;

    color: #fff;
    font-family: Inter;
    font-size: 1.25rem;
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

const Register = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // 錯誤訊息

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // 處理註冊
  const handleRegister = async () => {
    try {
      let response = await AuthService.register(
        phone,
        username,
        email,
        password
      );
      if (response) {
        setError(null); // 清除錯誤信息
        window.alert("註冊成功。您現在將被導向到登入頁面");
        navigate("/login");
      }
    } catch (e) {
      setError(e.response.data); // 設置錯誤信息
      toast.error("註冊失敗！");
    }
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
      <RegisBlock>
        <TopBlock>
          <RunningManIcon />
          <h1>會員註冊</h1>
        </TopBlock>
        <MiddleBlock>
          <form>
            <Phone>
              <label htmlFor="phone">連絡電話</label>
              <input
                type="text"
                placeholder="Phone Number"
                id="phone"
                value={phone}
                onChange={handlePhone}
                required
              />
            </Phone>

            <Username>
              <label htmlFor="username">使用者名稱</label>
              <input
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleUserName}
                required
              />
            </Username>

            <Email>
              <label htmlFor="email">電子郵件</label>
              <input
                type="text"
                placeholder="Email"
                id="email"
                onChange={handleEmail}
                required
              />
            </Email>

            <Password>
              <label htmlFor="password">密碼</label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={handlePassword}
                required
              />
            </Password>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <RegisterButton>
              <button type="button" onClick={handleRegister}>
                註冊
              </button>
            </RegisterButton>
          </form>
        </MiddleBlock>
      </RegisBlock>
    </Wrapper>
  );
};

export default Register;
