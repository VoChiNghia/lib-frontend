import React, { useEffect, useState } from "react"
import "./bookManage.scss"
import Select from "../../customSelect/Select"
import ButtonSolid from "../../button/ButtonSolid"
import Search from "../../search/Search"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { changeComponent, setIsOpenCompoent } from "../../../redux/reducer/modal"
import { useDispatch, useSelector } from "react-redux"
import AddBook from "../../form/formAddBook/AddBook"
import { deleteBook, getAllBook, getAllFile } from "../../../redux/reducer/book"
import { DispatchType, RootState } from "../../../redux/store"
import { getAllCategory } from "../../../redux/reducer/category"
import UploadCoverImage from "../../form/formUpdateCoverBook"
import Pagination from "../../pagination/Pagination"
import { LIMIT } from "../../../constant"
import AddFile from "../../form/formAddFile/AddFile"
import { ConfirmDialog } from "primereact/confirmdialog"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import UploadCoverImageFile from "../../form/formUpdateCoverBook copy"
const BookManage = () => {
  const { book, totalBooks, allFile } = useSelector((state: RootState) => state.book)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [visible, setVisible] = useState<boolean>(false)
  const [type, setType] = useState<string>("")
  const [actionData, setActionData] = useState(null)
  const query = {
    // limit: LIMIT,
    // page: currentPage,
  }

  console.log(allFile)
  const totalPage = Math.floor(totalBooks / LIMIT)
  const dispatch: DispatchType = useDispatch()

  const getAllBookApi = () => {
    dispatch(getAllBook(query))
    dispatch(getAllCategory())
    dispatch(getAllFile())
  }
  useEffect(() => {
    getAllBookApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const handleSubmit = () => {
    dispatch(changeComponent(<AddFile />))
    dispatch(setIsOpenCompoent(true))
  }
  const handleSubmitAddBook = () => {
    dispatch(changeComponent(<AddBook />))
    dispatch(setIsOpenCompoent(true))
  }

  const hanldeEdit = (item: any) => {
    dispatch(changeComponent(<AddBook value={item} />))
    dispatch(setIsOpenCompoent(true))
  }
  const hanldeDelete = (id: any) => {
    dispatch(deleteBook(id))
  }
  const updateCoverBook = (id: string) => {
    dispatch(changeComponent(<UploadCoverImage idUpdate={id} />))
    dispatch(setIsOpenCompoent(true))
  }

  const updateCoverFile = (id: string) => {
    dispatch(changeComponent(<UploadCoverImageFile idUpdate={id} />))
    dispatch(setIsOpenCompoent(true))
  }
  const accept = async () => {
    setVisible(false)
    if (type === "delete") hanldeDelete(actionData)
  }

  const reject = () => {
    // Xử lý khi người dùng từ chối xác nhận hoặc đóng hộp thoại
    setVisible(false)
  }
  return (
    <div className="book__manage">
      <h1 className="font-bold">Danh sách hiện có</h1>
      <div className="book__manage__control">
        <div className="book__manage__control-btn flex">
          <div className="mx-1">
            <ButtonSolid text="Thêm sách" onSubmit={handleSubmitAddBook} outline />
          </div>
          <div className="mx-1">
            <ButtonSolid text="Thêm Tài liệu" onSubmit={handleSubmit} outline />
          </div>
        </div>
        <div className="book__manage__control-field">
          <Select options={[{ value: 1, label: "2" }]} selectedOption="1" onSelect={() => {}} />
          <Search />
        </div>
      </div>
      <div className="book__manage__wrapper">
        <Tabs>
          <TabList>
            <Tab>Sách</Tab>
            <Tab>Tài liệu</Tab>
          </TabList>

          <TabPanel>
            <table className="book__manage__wrapper__list__book">
              <thead className="book__manage__wrapper__list__book-header">
                <tr>
                  <th>STT</th>
                  <th>Bìa</th>
                  <th>Tên Sách</th>
                  <th>Tác giả </th>
                  <th>Nhà xuất bản</th>
                  <th>Năm Xuất Bản</th>
                  <th>Thể loại</th>
                  <th>SL</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="book__manage__wrapper__list__book-body">
                {book?.map((item: any, index: number) => (
                  <tr key={index} className="book__manage__wrapper__list__book-body__row">
                    <td className="book__manage__wrapper__list__book-body__row-item">{index + 1}</td>
                    <td
                      className="book__manage__wrapper__list__book-body__row-item"
                      onClick={() => updateCoverBook(item._id)}
                    >
                      <img src={item.coverImage} alt="" />
                    </td>
                    <td className="book__manage__wrapper__list__book-body__row-item">{item.name}</td>
                    <td className="book__manage__wrapper__list__book-body__row-item">{item.author}</td>
                    <td className="book__manage__wrapper__list__book-body__row-item">{item.publisher}</td>
                    <td className="book__manage__wrapper__list__book-body__row-item">{item.publishingYear}</td>
                    <td className="book__manage__wrapper__list__book-body__row-item">{item.category.name}</td>
                    <td className="book__manage__wrapper__list__book-body__row-item">{item.quantity}</td>

                    <td className="book__manage__wrapper__list__book-body__row-item">
                      <button onClick={() => hanldeEdit(item)} className="btn-edit">
                        <span>
                          <AiOutlineEdit />
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setType("delete")
                          setVisible(true)
                          setActionData(item._id)
                        }}
                        className="btn-delete"
                      >
                        <span>
                          <AiOutlineDelete />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPage === 0 ? null : (
              <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}
          </TabPanel>
          <TabPanel>
            <table className="book__manage__wrapper__list__book">
              <thead className="book__manage__wrapper__list__book-header">
                <tr>
                  <th>STT</th>
                  <th>Bìa</th>
                  <th>Tên khoa</th>
                  <th>Môn Học</th>
                  <th>Giáo viên </th>
                  <th>File pdf</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="book__manage__wrapper__list__book-body">
                {allFile?.map((item: any, index: number) => (
                  <tr key={index} className="book__manage__wrapper__list__book-body__row text-center">
                    <td className="book__manage__wrapper__list__book-body__row-item">{index + 1}</td>
                    <td
                      className="book__manage__wrapper__list__book-body__row-item w-14"
                      onClick={() => updateCoverFile(item._id)}
                    >
                      <img src={item?.image} alt="" />
                    </td>
                    <td className="book__manage__wrapper__list__book-body__row-item">{item.tenKhoa}</td>
                    <td className="book__manage__wrapper__list__book-body__row-item">{item.tenMonHoc}</td>
                    <td className="book__manage__wrapper__list__book-body__row-item">{item.giaovien}</td>
                    <td className="book__manage__wrapper__list__book-body__row-item">
                      {!item.filePdf ? (
                        <p
                          className="border-[1px] border-solid border-[#ccc] shadow-sm text-center hover:bg-orange-700 transition-all hover:text-white"
                          onClick={() => updateCoverFile(item._id)}
                        >
                          Thêm file
                        </p>
                      ) : (
                        <a href={item.filePdf} target="_blank" rel="noopener noreferrer">
                          <p className="border-[1px] border-solid border-[#ccc] shadow-sm text-center hover:bg-orange-700 transition-all hover:text-white ">
                            Mở file
                          </p>
                        </a>
                      )}
                    </td>
                    <td className="book__manage__wrapper__list__book-body__row-item">
                      <button onClick={() => hanldeEdit(item)} className="btn-edit">
                        <span>
                          <AiOutlineEdit />
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setType("delete")
                          setVisible(true)
                          setActionData(item._id)
                        }}
                        className="btn-delete"
                      >
                        <span>
                          <AiOutlineDelete />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPanel>
        </Tabs>
      </div>
      <ConfirmDialog
        visible={visible}
        onHide={reject}
        message="Bạn muốn thực hiện hành động Xóa?"
        header="Xác nhận Xóa"
        icon="pi pi-info-circle"
        accept={accept}
        reject={reject}
      />
    </div>
  )
}

export default BookManage
