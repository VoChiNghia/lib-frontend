import React, { useState } from "react";
import "./registerForm.scss";
import { Formik, Form, Field } from "formik";
import ButtonSolid from "../../component/button/ButtonSolid";
import * as yup from "yup";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import {useDispatch, useSelector} from 'react-redux'
import { login, register } from "../../redux/reducer/auth";
import { DispatchType, RootState } from "../../redux/store";
import Loading from "../../component/loading/Loading";
import { Link } from "react-router-dom";
const logo1 = require("../../assets/images/icon-3.webp");
const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {loading} = useSelector((state:RootState) => state.authSlice)
  const dispatch:DispatchType = useDispatch()
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  return (
    <div className="login-form">
      {loading ? <Loading/>: ''}
      <div className="login-form-wrapper">
        <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
            phoneNumber: "",
          }}
          validationSchema={yup.object({
            name: yup
              .string()
              .required("Name is required"),
            email: yup
              .string()
              .email("Invalid email")
              .required("Email is required"),
            password: yup
              .string()
              .min(6, "Password must be at least 6 characters")
              .required("password is required"),
            phoneNumber: yup
              .string()
              .required("Phone is required"),
          })}
          onSubmit={(values: any) => {
            dispatch(register(values))
          }}
        >
          {({ handleSubmit, errors,isValid,dirty }) => {
            return <div className="form-wrapper">
            <div className="logo">
              <img src={logo1} alt="" />
            </div>
            <div className="form">
              <Form  onSubmit={handleSubmit} onKeyDown={(e: React.KeyboardEvent<HTMLFormElement>) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}>
                 <div>
                  <label htmlFor="email">Name *</label>
                  <div className="form-control">
                    <Field
                      type="text"
                      name="name"
                      className={errors.name ? "error" : ""}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email">Phone *</label>
                  <div className="form-control">
                    <Field
                      type="text"
                      name="phoneNumber"
                      className={errors.phoneNumber ? "error" : ""}
                    />
                  </div>
                </div>
                <div></div>
                <div>
                  <label htmlFor="email">Email *</label>
                  <div className="form-control">
                    <Field
                      type="text"
                      name="email"
                      className={errors.email ? "error" : ""}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password">Mật khẩu *</label>
                  <div className="form-control">
                    <Field type={showPassword ? 'text' : 'password'} name="password"  className={errors.password ? "error" : ""}/>
                    <span className="eye-icon" onClick={handleShowPassword}>
                      {showPassword ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </span>
                  </div>
                </div>
              </Form>
              <span>Quên mật khẩu?</span>
            </div>

              <Link to='/login-form'><span className="text-blue-500 cursor-pointer my-2 text-blue-500">Đăng nhập</span></Link>
            <div className="btn-login text-center">

              <ButtonSolid submit={true} onSubmit={handleSubmit} text="Đăng Ký" disabled={!dirty || !isValid}/>
            </div>
          </div>
          }}
        </Formik>
      </div>
      <div className="login-form-background"></div>
    </div>
  );
};

export default RegisterForm;
