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
} from "../../../redux/reducer/book";

const validationSchema = Yup.object().shape({
  tenKhoa: Yup.string().required("tenKhoa is required"),
  tenMonHoc: Yup.string().required("tenMonHoc is required"),
  giaovien: Yup.string().required("giaovien is required"),
});

interface AddBookProps {
  value?: any;
}

const AddFile = () => {
  const [formDataImage, setFormDataImage] = useState<FormData>();
  const dispatch: DispatchType = useDispatch();
  const year = new Date().getFullYear();
  const years = Array.from(new Array(40), (val, index) => year - index);
  const { category } = useSelector((state: RootState) => state.category);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && (file.type === "application/pdf")) {
      const fromData = new FormData();
      fromData.append("pdf", file);
      setFormDataImage(fromData);
    }
  };

  // const updateBookApi = async (values: BookType) => {
  //   await dispatch(updateBook(props.value._id, values));
  //   if (formDataImage)
  //     await dispatch(updateCoveredBook(props.value._id, formDataImage));
  // };

  const createBookApi = async (values: any) => {
   await  dispatch(createFile(values))
    if(formDataImage){
     await dispatch(updateFile(formDataImage,values))
    }
  };

  const initialValues: any = {
    tenKhoa: "",
    tenMonHoc: "",
    giaovien: "",
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
              onSubmit={(values: any) => {
                createBookApi(values)
              }}
            >
              {({ values, errors, touched, dirty, handleSubmit, isValid }) => (
                <Form className="form" >
                  <div className="form__container flex flex-col">
                  
                      <div className="form-group my-2">
                        <p className="font-bold">Tên Khoa *</p>
                        <Field
                          className="form-control border-[1px] border-solid border-[#ccc] outline-none p-2 w-96 rounded"
                          name="tenKhoa"
                          placeholder="Tên Khoa ..."
                        />
                        <ErrorMessage
                          name="tenKhoa"
                          component="p"
                          className="error text-sm text-red-500"
                        />
                      </div>
                      <div className="form-group my-2">
                        <p className="font-bold">Tên môn học *</p>
                        <Field
                          className="form-control border-[1px] border-solid border-[#ccc] outline-none p-2 w-96 rounded"
                          name="tenMonHoc"
                          placeholder="Tên môn học ..."
                        />
                        <ErrorMessage
                          name="tenMonHoc"
                          component="p"
                          className="error text-sm text-red-500"
                        />
                      </div>

                      <div className="form-group my-2">
                        <p className="font-bold">Giáo viên *</p>
                        <Field
                          className="form-control border-[1px] border-solid border-[#ccc] outline-none p-2 w-96 rounded"
                          name="giaovien"
                          placeholder="Giáo viên ..."
                        />
                        <ErrorMessage
                          name="giaovien"
                          component="p"
                          className="error text-sm text-red-500"
                        />
                      </div>

                      <div className="form-group">
                        <p className="font-bold">File pdf</p>
                        <Field type="file" name="filePdf" onChange={handleFileChange} accept=".pdf"/>
                        <ErrorMessage
                          name="filePdf"
                          component="p"
                          className="error"
                        />
                      </div>
                    

                    
                  </div>

                  <div className="form-bottom">
                    <ButtonSolid
                      // text={props.value ? 'Cập nhập' : 'Thêm sách'}
                      text="Thêm tài liệu"
                      onSubmit={handleSubmit}
                      hover={false}
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

export default AddFile;
