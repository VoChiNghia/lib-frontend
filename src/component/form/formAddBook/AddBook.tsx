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
} from "../../../redux/reducer/book";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  author: Yup.string().required("Author is required"),
  publisher: Yup.string().required("Publisher is required"),
  summary: Yup.string().required("Summary is required"),
  quantity: Yup.number()
    .required("Quantity is required")
    .positive("Quantity must be a positive number"),
  file: Yup.mixed()
    .nullable()
    .test("fileType", "Only PNG files are allowed", (value: any) => {
      if (!value) return true; // Allow empty values
      return (
        (value && value.type === "image/png") ||
        (value && value.type === "image/jpg")
      );
    }),
  filePdf: Yup.mixed()
    .nullable()
    .test("fileType", "Only PNG files are allowed", (value: any) => {
      if (!value) return true; // Allow empty values
      return value && value.type === "application/pdf";
    }),
});

interface AddBookProps {
  value?: any;
}

const AddBook = (props: AddBookProps) => {
  const [formDataImage, setFormDataImage] = useState<FormData>();
  const dispatch: DispatchType = useDispatch();
  const year = new Date().getFullYear();
  const years = Array.from(new Array(40), (val, index) => year - index);
  const { category } = useSelector((state: RootState) => state.category);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const fromData = new FormData();
      fromData.append("image", file);
      setFormDataImage(fromData);
    }
  };

  const updateBookApi = async (values: BookType) => {
    await dispatch(updateBook(props.value._id, values));
    if (formDataImage)
      await dispatch(updateCoveredBook(props.value._id, formDataImage));
  };

  const createBookApi = async (values: BookType) => {
    await dispatch(createBook(values));
    if (formDataImage)
      await dispatch(updateCoveredBookByQuery(formDataImage, values));
  };

  const initialValues: BookType = props.value
    ? {
        name: props.value.name,
        author: props.value.author,
        publisher: props.value.publisher,
        publishingYear: props.value.publishingYear,
        category: props.value.category,
        language: props.value.language,
        summary: props.value.summary,
        quantity: props.value.quantity,
      }
    : {
        name: "",
        author: "",
        publisher: "",
        publishingYear: "",
        category: "",
        language: "0",
        summary: "",
        quantity: 0,
      };
  return (
    <>
      <div className="add-book__wrapper">
        <div className="add-book">
          <div className="add-book__body">
            <h1>{props.value ? 'Cập nhập thông tin sách' : 'Thêm sách'}</h1>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values: BookType) => {
                props.value
                  ? await updateBookApi(values)
                  : await createBookApi(values)
              }}
            >
              {({ values, errors, touched, dirty, handleSubmit, isValid }) => (
                <Form className="form">
                  <div className="form__container">
                    <div className="form__container__left">
                      <div className="form-group">
                        <p>Tên sách*</p>
                        <Field
                          className="form-control"
                          name="name"
                          placeholder="Tên sách ..."
                        />
                        <ErrorMessage
                          name="name"
                          component="p"
                          className="error"
                        />
                      </div>
                      <div className="form-group">
                        <p>Tác giả*</p>
                        <Field
                          className="form-control"
                          name="author"
                          placeholder="Tên tác giả ..."
                        />
                        <ErrorMessage
                          name="author"
                          component="p"
                          className="error"
                        />
                      </div>

                      <div className="form-group">
                        <p>Nhà xuất bản*</p>
                        <Field
                          className="form-control"
                          name="publisher"
                          placeholder="Nhà xuất bản ..."
                        />
                        <ErrorMessage
                          name="publisher"
                          component="p"
                          className="error"
                        />
                      </div>

                      <div className="form-group">
                        <p>Năm xuất bản*</p>
                        <Field
                          as="select"
                          className="form-control"
                          name="publishingYear"
                          placeholder="Năm xuất bản ..."
                        >
                          {years.map((year: number) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="publishingYear"
                          component="p"
                          className="error"
                        />
                      </div>

                      <div className="form-group">
                        <p>Ngôn ngữ</p>
                        <Field
                          as="select"
                          className="form-control"
                          name="language"
                          placeholder="Năm xuất bản ..."
                        >
                          <option value="en">tiếng anh</option>
                          <option value="vn">tiếng việt</option>
                        </Field>
                        <ErrorMessage
                          name="language"
                          component="p"
                          className="error"
                        />
                      </div>
                    </div>

                    <div className="form__container__right">
                      <div className="form-group">
                        <p>Thể loại*</p>
                        <Field
                          as="select"
                          className="form-control"
                          name="category"
                          placeholder="Năm xuất bản ..."
                        >
                          {category.map((item: Category) => (
                            <option key={item._id} value={item._id}>
                              {item.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="category"
                          component="p"
                          className="error"
                        />
                      </div>
                      <div className="form-group">
                        <p>Số lượng*</p>
                        <Field
                          className="form-control"
                          type="number"
                          name="quantity"
                          placeholder="Nhà xuất bản ..."
                        />
                        <ErrorMessage
                          name="quantity"
                          component="p"
                          className="error"
                        />
                      </div>

                      <div className="form-group">
                        <p>Mô tả*</p>
                        <Field
                          className="form-control "
                          as="textarea"
                          name="summary"
                          placeholder="Mô tả ..."
                          row="100"
                        />
                        <ErrorMessage
                          name="summary"
                          component="p"
                          className="error"
                        />
                      </div>

                      <div className="form-group">
                        <p>Ảnh bìa</p>
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

                      <div className="form-group">
                        <p>File pdf</p>
                        <Field type="file" name="filePdf" />
                        <ErrorMessage
                          name="filePdf"
                          component="p"
                          className="error"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-bottom">
                    <ButtonSolid
                      text={props.value ? 'Cập nhập' : 'Thêm sách'}
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

export default AddBook;
