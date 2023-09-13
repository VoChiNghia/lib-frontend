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
import ExportToExcel from "../../../utilities/exportExcel"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
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

  const [summary, ...other] = book
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

  
  const representativeBodyTemplate = (rowData: any) => {
    return (
        <div className="flex align-items-center gap-2">
            
            <button onClick={() => hanldeEdit(rowData)} className="btn-edit">
                            <span>
                              <AiOutlineEdit />
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              setType("delete")
                              setVisible(true)
                              setActionData(rowData._id)
                            }}
                            className="btn-delete"
                          >
                            <span>
                              <AiOutlineDelete />
                            </span>
                          </button>
        </div>
    );
};

const representativeBodyTemplate4 = (rowData: any) => {
  return (
      <div className="flex align-items-center gap-2">
                        <button
                          onClick={() => {
                            setType("delete")
                            setVisible(true)
                            setActionData(rowData._id)
                          }}
                          className="btn-delete"
                        >
                          <span>
                            <AiOutlineDelete />
                          </span>
                        </button>
      </div>
  );
};

const representativeBodyTemplate2 = (rowData: any) => {
  return (
    <div
    className="book__manage__wrapper__list__book-body__row-item"
    onClick={() => updateCoverBook(rowData._id)}
  >
    <img src={rowData.coverImage} alt="" />
  </div>
  );
};
const representativeBodyTemplate3 = (item: any) => {
  return (
    <div
                      className="book__manage__wrapper__list__book-body__row-item w-14"
                      onClick={() => updateCoverFile(item._id)}
                    >
                      <img src={item?.image} alt="" />
                    </div>
  );
};

const filePdf = (rowData: any) => {
  return (
    <div
  >
    {!rowData.filePdf ? (
                        <p
                          className="border-[1px] border-solid border-[#ccc] shadow-sm text-center hover:bg-orange-700 transition-all hover:text-white"
                          onClick={() => updateCoverFile(rowData._id)}
                        >
                          Thêm file
                        </p>
                      ) : (
                        <a href={rowData.filePdf} target="_blank" rel="noopener noreferrer">
                          <p className="border-[1px] border-solid border-[#ccc] shadow-sm text-center hover:bg-orange-700 transition-all hover:text-white ">
                            Mở file
                          </p>
                        </a>
                      )}
  </div>
  );
};

  const reject = () => {
    // Xử lý khi người dùng từ chối xác nhận hoặc đóng hộp thoại
    setVisible(false)
  }
  return (
    <div className="book__manage">
      <div className="">
      <div className="book__manage__control">
        <div className="book__manage__control-btn flex">
          <div>
            {
              tabsIndex === 0 ? <ExportToExcel dataList={other} /> : <ExportToExcel dataList={allFile} />
            }
          </div>
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
          <DataTable scrollable  value={book} paginator rows={4} rowsPerPageOptions={[4,5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
    <Column field="image" body={representativeBodyTemplate2} header="Hình ảnh" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column field="name" header="Tên Sách" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column field="author" header="Tác giả" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column field="publisher" header="Nhà xuất bản" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column field="publishingYear" header="Năm Xuất Bản"filter sortable  style={{ width: '10%',fontSize:'13px' }}></Column>
    <Column field="category.name" header="Thể loại" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column field="quantity" header="SL" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column field="borrowedBook" body={representativeBodyTemplate} header="sach mượn" sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
</DataTable>
          
          </TabPanel>
          <TabPanel>
          <DataTable scrollable  value={allFile} paginator rows={4} rowsPerPageOptions={[4,5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
    <Column field="image" body={representativeBodyTemplate3} header="Bìa" filter sortable  style={{ width: '15%',fontSize:'13px' }}></Column>
    <Column field="tenKhoa" header="Tên khoa" filter sortable  style={{ width: '30%',fontSize:'13px' }}></Column>
    <Column field="tenMonHoc" header="Môn Học" filter sortable  style={{ width: '30%',fontSize:'13px' }}></Column>
    <Column field="giaovien" header="Giáo viên"filter sortable  style={{ width: '10%',fontSize:'13px' }}></Column>
    <Column field="borrowedBook" body={filePdf} header="FilePdf" sortable  style={{ width: '15%',fontSize:'13px' }}></Column>
    <Column field="borrowedBook" body={representativeBodyTemplate4} header="Action" sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
</DataTable>
            {/* <table className="book__manage__wrapper__list__book">
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
                {tabsIndex === 1 ? allFile.filter((b: any) => {
                    if(selectedFile){
                      return b?.[selectedFile].toLowerCase().includes(search.toLowerCase())
                    }
                    return b
                  })?.map((item: any, index: number) => (
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
                ))
                :
                allFile?.map((item: any, index: number) => (
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
              ))
              }
              </tbody>
            </table> */}
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
