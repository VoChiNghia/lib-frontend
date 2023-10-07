import React, { useRef, useState } from "react";
import "./addBook.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ButtonSolid from "../../button/ButtonSolid";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../redux/store";
import { BookType, Category, UserType } from "../../../type";
import {
  createBook,
  updateCoveredBookByQuery,
  updateBook,
  updateCoveredBook,
} from "../../../redux/reducer/book";
import { getAllUser, updateUser } from "../../../redux/reducer/user";
import { Button } from "primereact/button";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Author is required"),
  phoneNumber: Yup.string().required("Số điện thoại không được để trống"),
  role: Yup.string().required("vai trò không được để trống"),
  address: Yup.string().required("Địa chỉ không được để trống"),

});

interface AddBookProps {
  value?: any;
}

const UpdateUser = (props: AddBookProps) => {
  const dispatch: DispatchType = useDispatch();
  const initialValues: UserType = {
        name: props.value.name,
        email: props.value.email,
        phoneNumber: props.value.phoneNumber,
        address: props.value.address,
        studentCode: props?.value?.studentCode,
        role: props.value.role,
      }
  return (
    <>
      <div className="add-book__wrapper">
        <div className="add-book">
          <div className="add-book__body">
            <h1 className="font-bold">{props?.value?._id ? 'Cập nhập người dùng' : 'Thêm mới người dùng'}</h1>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values: UserType) => {
               await dispatch(updateUser(props.value._id,values));
                await dispatch(getAllUser());
              }}
            >
              {({ values, errors, touched, dirty, handleSubmit, isValid }) => (
                <Form className="form">
                  <div className="form__container">
                    <div className="form__container__left">
                      <div className="form-group">
                        <p>Tên người dùng</p>
                        <Field
                          className="form-control"
                          name="name"
                          placeholder="tên người dùng ..."
                        />
                        <ErrorMessage
                          name="name"
                          component="p"
                          className="error"
                        />
                      </div>
                      <div className="form-group">
                        <p>Địa chỉ gmail</p>
                        <Field
                          className="form-control"
                          name="email"
                          placeholder="Địa chỉ gmail ..."
                        />
                        <ErrorMessage
                          name="email"
                          component="p"
                          className="error"
                        />
                      </div>

                      <div className="form-group">
                        <p>Địa chỉ nhà</p>
                        <Field
                          className="form-control"
                          name="address"
                          placeholder="Địa chỉ nhà ..."
                        />
                        <ErrorMessage
                          name="address"
                          component="p"
                          className="error"
                        />
                      </div>
                    </div>

                    <div className="form__container__right">
                    <div className="form-group">
                        <p>Vai trò</p>
                        <Field
                          as="select"
                          className="form-control"
                          name="role"
                        >
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </Field>
                        <ErrorMessage
                          name="role"
                          component="p"
                          className="error"
                        />
                      </div>

                      <div className="form-group">
                        <p>Mã số sinh viên</p>
                        <Field
                          className="form-control"
                          name="studentCode"
                          placeholder="Mã số sinh viên ..."
                        />
                        <ErrorMessage
                          name="studentCode"
                          component="p"
                          className="error"
                        />
                      </div>

                      <div className="form-group">
                        <p>Số điện thoại</p>
                        <Field
                          className="form-control"
                          name="phoneNumber"
                          placeholder="Số điện thoại ..."
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="p"
                          className="error"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-bottom">
                    <Button label={props?.value?._id ? 'Cập nhập' : 'Thêm mới'} raised onSubmit={() => handleSubmit()}/>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
