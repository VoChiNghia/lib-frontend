import React, { useEffect, useState } from "react"
import "./bookManage.scss"
import Select from "../../customSelect/Select"
import ButtonSolid from "../../button/ButtonSolid"
import Search from "../../search/Search"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { changeComponent, setIsOpenCompoent } from "../../../redux/reducer/modal"
import { useDispatch, useSelector } from "react-redux"
import AddBook from "../../form/formAddBook/AddBook"
import { deleteBook, deleteFile, getAllBook, getAllFile } from "../../../redux/reducer/book"
import { DispatchType, RootState } from "../../../redux/store"
import { getAllCategory } from "../../../redux/reducer/category"
import UploadCoverImage from "../../form/formUpdateCoverBook"
import Pagination from "../../pagination/Pagination"
import { LIMIT } from "../../../constant"
import AddFile from "../../form/formAddFile/AddFile"
import { ConfirmDialog } from "primereact/confirmdialog"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import UploadCoverImageFile from "../../form/formUpdateFilePdf"
import ExportToExcel from "../../../utilities/exportExcel"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import UploadFilepdf from "../../form/formUpdateFilePdf"
const BookManage = () => {
  const { book, totalBooks, allFile } = useSelector((state: RootState) => state.book)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [visible, setVisible] = useState<boolean>(false)
  const [type, setType] = useState<string>("")
  const [actionData, setActionData] = useState(null)
  const [tabsIndex, setTabsIndex] = useState(0)
  const [search, setSearch] = useState("")

  const [selectedCity, setSelectedCity] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const [image, summary, format, ...other] = book
  const query = {
    // limit: LIMIT,
    // page: currentPage,
  }
  const cities = [
    { name: "Tên sách", value: "name" },
    { name: "Tác giả", value: "author" },
    { name: "Nhà xuất bản", value: "publisher" },
    { name: "Năm xuất bản", value: "publishingYear" },
    { name: "Thể loại", value: "category.name" },
  ]
  const dmFile = [
    { name: "Tên khoa", value: "tenKhoa" },
    { name: "Môn học", value: "monHoc" },
    { name: "Giáo viên", value: "giaovien" },
  ]
  const totalPage = Math.floor(totalBooks / LIMIT)
  const dispatch: DispatchType = useDispatch()
  const [progress, setProgress] = useState()
  const getAllBookApi = () => {
    dispatch(getAllBook(""))
    dispatch(getAllCategory())
    dispatch(getAllFile())
  }
  useEffect(() => {
    getAllBookApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    getAllBookApi()
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

  const handleUpdateFileBookPdf = async (id: string) => {
    dispatch(changeComponent(<UploadFilepdf idUpdate={id} type="book" />))
    dispatch(setIsOpenCompoent(true))
  }

  const handleUpdateFilePdf = async (id: string) => {
    dispatch(changeComponent(<UploadFilepdf idUpdate={id} type="file" />))
    dispatch(setIsOpenCompoent(true))
  }

  const representativeBodyTemplate = (rowData: any) => {
    return (
      <div>
        <Button
          icon="pi  pi-file-pdf"
          rounded
          text
          severity="warning"
          aria-label="Cancel"
          onClick={() => handleUpdateFileBookPdf(rowData._id)}
        />
        <Button
          icon="pi  pi-file-edit"
          rounded
          text
          severity="success"
          aria-label="Cancel"
          onClick={() => hanldeEdit(rowData)}
        />
        <Button
          icon="pi pi-times"
          rounded
          text
          severity="danger"
          aria-label="Cancel"
          onClick={() => {
            setType("delete")
            setVisible(true)
            setActionData(rowData._id)
          }}
        />
      </div>
    )
  }

  const representativeBodyTemplate4 = (rowData: any) => {
    return (
      <div className="flex align-items-center gap-2">
        <Button
          icon="pi pi-times"
          rounded
          text
          severity="danger"
          aria-label="Cancel"
          onClick={() => {
            dispatch(deleteFile(rowData._id))
            dispatch(getAllFile())
          }}
        />
      </div>
    )
  }

  const representativeBodyTemplate2 = (rowData: any) => {
    return (
      <div className="book__manage__wrapper__list__book-body__row-item" onClick={() => updateCoverBook(rowData._id)}>
        <img src={rowData.coverImage} alt="" />
      </div>
    )
  }
  const representativeBodyTemplate3 = (item: any) => {
    return (
      <div className="book__manage__wrapper__list__book-body__row-item w-14" onClick={() => updateCoverFile(item._id)}>
        <img src={item?.image} alt="" />
      </div>
    )
  }

  const filePdf = (rowData: any) => {
    return (
      <div>
        {!rowData.filePdf ? (
          <Button
            label="Thêm file"
            className="py-0"
            severity="secondary"
            outlined
            onClick={() => handleUpdateFilePdf(rowData._id)}
          ></Button>
        ) : (
          <Button
            label="Mở file"
            severity="secondary"
            className="py-0"
            outlined
            onClick={() => window.open(rowData.filePdf, "_blank")}
          ></Button>
        )}
      </div>
    )
  }

  const reject = () => {
    // Xử lý khi người dùng từ chối xác nhận hoặc đóng hộp thoại
    setVisible(false)
  }
  return (
    <div className="book__manage">
      <div className="">
        <div className="book__manage__control">
          <div className="book__manage__control-btn flex">
            <div>{tabsIndex === 0 ? <ExportToExcel dataList={other} /> : <ExportToExcel dataList={allFile} />}</div>
          </div>
        </div>
      </div>
      <div className="book__manage__wrapper">
        <Tabs defaultIndex={tabsIndex} onSelect={(index) => setTabsIndex(index)}>
          <TabList>
            <Tab>Sách</Tab>
            <Tab>Tài liệu</Tab>
          </TabList>

          <TabPanel>
            <DataTable
              scrollable
              value={book}
              paginator
              rows={3}
              rowsPerPageOptions={[1,2,3,4, 5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="image"
                body={representativeBodyTemplate2}
                header="Bìa"
                filter
                sortable
                style={{ width: "5%", fontSize: "13px" }}
              ></Column>
              <Column
                field="name"
                header="Tên Sách"
                filter
                sortable
                style={{ width: "25%", fontSize: "13px" }}
              ></Column>
              <Column
                field="author"
                header="Tác giả"
                filter
                sortable
                style={{ width: "25%", fontSize: "13px" }}
              ></Column>
              <Column
                field="publisher"
                header="Nhà xuất bản"
                filter
                sortable
                style={{ width: "25%", fontSize: "13px" }}
              ></Column>
              <Column
                field="publishingYear"
                header="Năm Xuất Bản"
                filter
                sortable
                style={{ width: "10%", fontSize: "13px" }}
              ></Column>
              <Column
                field="category.name"
                header="Thể loại"
                filter
                sortable
                style={{ width: "25%", fontSize: "13px" }}
              ></Column>
              <Column field="quantity" header="SL" filter sortable style={{ width: "25%", fontSize: "13px" }}></Column>
              <Column
                field="borrowedBook"
                body={representativeBodyTemplate}
                header=""
                style={{ width: "35%", fontSize: "13px", padding: "0" }}
              ></Column>
            </DataTable>
          </TabPanel>
          <TabPanel>
            <DataTable
              scrollable
              value={allFile}
              paginator
              rows={4}
              rowsPerPageOptions={[4, 5, 10, 25, 50]}
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column
                field="image"
                body={representativeBodyTemplate3}
                header="Bìa"
                filter
                sortable
                style={{ width: "15%", fontSize: "13px" }}
              ></Column>
              <Column
                field="tenKhoa"
                header="Tên khoa"
                filter
                sortable
                style={{ width: "30%", fontSize: "13px" }}
              ></Column>
              <Column
                field="tenMonHoc"
                header="Môn Học"
                filter
                sortable
                style={{ width: "30%", fontSize: "13px" }}
              ></Column>
              <Column
                field="giaovien"
                header="Giáo viên"
                filter
                sortable
                style={{ width: "10%", fontSize: "13px" }}
              ></Column>
              <Column
                field="borrowedBook"
                body={filePdf}
                header="FilePdf"
                sortable
                style={{ width: "15%", fontSize: "13px" }}
              ></Column>
              <Column
                field="borrowedBook"
                body={representativeBodyTemplate4}
                header="Action"
                sortable
                style={{ width: "25%", fontSize: "13px" }}
              ></Column>
            </DataTable>
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
