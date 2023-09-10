import React, { useState } from "react"
import { ErrorMessage, Field, Form, Formik } from "formik"
import ButtonSolid from "../../button/ButtonSolid"
import * as Yup from "yup"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux"
import { DispatchType, RootState } from "../../../redux/store"
import { BookType, Category } from "../../../type"
import { createBook, updateCoveredBookByQuery, updateBook, updateCoveredBook, createBlog, updateCoveredBlogByQuery } from "../../../redux/reducer/book"
import AddBlog from "../wyswyg/AddBlog"

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
})

interface AddBookProps {
  value?: any
}

const FormAddBlog = () => {
  const [formDataImage, setFormDataImage] = useState<FormData>()
  const [valueContent, setValueContent] = useState<string>('')
  const content: string = ''
  const dispatch: DispatchType = useDispatch()
  const year = new Date().getFullYear()
  const [text, setText] = useState('');

    const handleChange = (value: any) => { 
      setText(value)
    };
  
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const fromData = new FormData();
      fromData.append("image", file);
      setFormDataImage(fromData);
    }
  };
  const createBlogApi = async (values: any) => {
    const model = {
      title: values.title,
      content: text
    }
     await  dispatch(createBlog(model))
    if (formDataImage)
      await dispatch(updateCoveredBlogByQuery(formDataImage, values));
  };

  //   const handleFileChange = (event: any) => {
  //     const file = event.target.files[0];
  //     if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
  //       const fromData = new FormData();
  //       fromData.append("image", file);
  //       setFormDataImage(fromData);
  //     }
  //   };

  //   const updateBookApi = async (values: BookType) => {
  //     await dispatch(updateBook(props.value._id, values));
  //     if (formDataImage)
  //       await dispatch(updateCoveredBook(props.value._id, formDataImage));
  //   };

  //   const createBookApi = async (values: BookType) => {
  //     await dispatch(createBook(values));
  //     if (formDataImage)
  //       await dispatch(updateCoveredBookByQuery(formDataImage, values));
  //   };

  const initialValues: any = {
    title: "",
  }
  return (
    <>
      <div className="add-book__wrapper">
        <div className="add-book p-4">
          <div className="add-book__body">
            <h1 className="font-bold">Tạo mới blog</h1>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values: any) => {
                createBlogApi(values)
              }}
            >
              {({ values, errors, touched, dirty, handleSubmit, isValid }) => (
                <Form className="form">
                  <div className="form__container flex flex-col">
                    <div className="flex items-center">
                    <div className="form-group my-2">
                      <p className="font-bold ">Tiêu đề bài viết</p>
                      <Field
                        className="form-control border-[1px] border-gray-100 border-solid rounded py-1 px-3 outline-none"
                        name="title"
                      />
                      <ErrorMessage name="title" component="p" className="error text-sm text-red-700" />
                    </div>
                    <div className="form-group mx-3">
                        <p className="font-bold">Ảnh thumbnail</p>
                        <Field
                          type="file"
                          name="file"
                          onChange={handleFileChange}
                        />
                        <ErrorMessage
                          name="file"
                          component="p"
                          className="error"
                        />
                      </div>

                    </div>
                    <div className='h-[370px] overflow-auto'>
        <ReactQuill
          value={text}
          onChange={handleChange}
          modules={{
            toolbar: {
              container: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean'],
              ],
            },
          }}
        />
      </div>
                  </div>

                  <div className="form-bottom">
                    <ButtonSolid text="Tạo mới" onSubmit={handleSubmit} hover={false} />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormAddBlog
