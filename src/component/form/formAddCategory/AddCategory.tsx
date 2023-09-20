import React, { useRef, useState } from "react";
import "./addBook.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ButtonSolid from "../../button/ButtonSolid";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../../redux/store";
import { BookType, Category } from "../../../type";
import {
  createBook,
  updateCoveredBookByQuery,
  updateBook,
  updateCoveredBook,
  createFile,
  updateFile,
  getAllFile,
  createCatetogy,
} from "../../../redux/reducer/book";
import { Button } from "primereact/button";
import { updatePassword } from "../../../redux/reducer/user";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Mật khẩu hiện tại là bắt buộc"),
});

const AddCategory = () => {
  const [formDataImage, setFormDataImage] = useState<FormData>();
  const dispatch: DispatchType = useDispatch();
  const year = new Date().getFullYear();
  const years = Array.from(new Array(40), (val, index) => year - index);
  const { category } = useSelector((state: RootState) => state.category);

  const createBookApi = async (values: any) => {
   await  dispatch(createFile(values))
    if(formDataImage){
     await dispatch(updateFile(formDataImage,values))
    }
  };

  const initialValues: any = {
    name: "",
    }
  return (
    <>
      <div className="add-book__wrapper">
        <div className="add-book">
          <div className="add-book__body">
            {/* <h1>{props.value ? 'Cập nhập thông tin sách' : 'Thêm sách'}</h1> */}
            
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values: any) => {
                dispatch(createCatetogy(values))
              }}
            >
              {({ values, errors, touched, dirty, handleSubmit, isValid }) => (
                <Form className="form" >
                  <div className="form__container flex flex-col">
                  
                      <div className="form-group my-2">
                        <p className="font-bold">Thể loại *</p>
                        <Field
                          className="form-control border-[1px] border-solid border-[#ccc] outline-none p-2 w-96 rounded"
                          name="name"
                          placeholder="Thể loại ..."
                        />
                        <ErrorMessage
                          name="name"
                          component="p"
                          className="error text-sm text-red-500"
                        />
                      </div>         
                  </div>

                  <div className="form-bottom">
                    <Button
                      // text={props.value ? 'Cập nhập' : 'Thêm sách'}

                      label="Thêm"
                      onSubmit={() => handleSubmit()}
                    />
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

export default AddCategory;
