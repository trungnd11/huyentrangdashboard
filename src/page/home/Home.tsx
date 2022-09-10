/* eslint-disable jsx-a11y/anchor-is-valid */
import { useCallback, useState } from "react";
import logo from "../../statics/logo/logo.png";
import Login from "./login/Login";
export default function Home() {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = useCallback(() => {
    setIsLogin(true);
  }, []);

  return (
    <div className="home-container">
      <div className="home-page">
        <div className="box">
          <div className="wave -one"></div>
          <div className="wave -two"></div>
          <div className="wave -three"></div>
        </div>
      </div>
      <div>
        {!isLogin ? (
          <div className="home-content">
            <div className="title">
              <div className="logo text-center">
                <img src={logo} alt="" />
              </div>
              <h3 className="text-center">
                Huyen Trang Tran Beauty Center Admin
              </h3>
              <h1 className="text-center">Welcom!</h1>
            </div>
            <div className="btn-login">
              <a
                className="btn-shine"
                target="_blank"
                rel="noreferrer"
                onClick={handleLogin}
              >
                Đăng nhập ngay
                <i className="fa-solid fa-angles-right ms-2" />
              </a>
            </div>
          </div>
        ) : (
          <div className="login-content">
            <Login />
          </div>
        )}
      </div>
    </div>
  );
}
