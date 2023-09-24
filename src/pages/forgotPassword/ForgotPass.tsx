import React, { useState } from "react";
import "./forgotPass.scss";
import { Formik, Form, Field } from "formik";
import ButtonSolid from "../../component/button/ButtonSolid";
import * as yup from "yup";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import {useDispatch, useSelector} from 'react-redux'
import { forgotPassword, login } from "../../redux/reducer/auth";
import { DispatchType, RootState } from "../../redux/store";
import Loading from "../../component/loading/Loading";
import { Link } from "react-router-dom";
const logo1 = require("../../assets/images/icon-3.webp");
const ForgotPassword = () => {
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
          }}
          validationSchema={yup.object({
            email: yup
              .string()
              .email("Invalid email")
              .required("Email is required"),
          })}
          onSubmit={(values: any) => {
            dispatch(forgotPassword(values))
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
                  <label htmlFor="email">Email*</label>
                  <div className="form-control">
                    <Field
                      type="text"
                      name="email"
                      className={errors.email ? "error" : ""}
                    />
                  </div>
                </div>
              </Form>
            </div>
            <Link to='/login-form'><span className="text-blue-500 cursor-pointer my-2 text-blue-500">Đăng nhập</span></Link>
            <div className="btn-login">
              <ButtonSolid submit={true} onSubmit={handleSubmit} text="Gửi" disabled={!dirty || !isValid}/>
            </div>
          </div>
          }}
        </Formik>
      </div>
      <div className="login-form-background"></div>
    </div>
  );
};

export default ForgotPassword;
