import React from "react";
import "./login.scss";
import { Link } from "react-router-dom";
const logo1 = require("../../assets/images/icon-3.webp");
const logo2 = require("../../assets/images/logo2.jpg");

const Login = () => {
  return (
    <div className="login">
      <div className="selection-method-login">
        <div className="selection-method-login--left">
          <Link to="/login-form">
            <img src={logo1} alt="" />
          </Link>
          <h1>Dành cho thủ thư</h1>
        </div>
        <div className="selection-method-login--right">
          <img src={logo2} alt="" />
          <h1>Dành cho người dùng</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
