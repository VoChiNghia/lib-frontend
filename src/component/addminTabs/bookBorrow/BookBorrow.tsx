import React, { useEffect, useRef, useState } from "react"
import "./bookBorrow.scss"
import Select from "../../customSelect/Select"
import ButtonSolid from "../../button/ButtonSolid"
import Search from "../../search/Search"
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"
import { changeComponent, setIsOpenCompoent } from "../../../redux/reducer/modal"
import { useDispatch, useSelector } from "react-redux"
import AddBook from "../../form/formAddBook/AddBook"
import {
  deleteBook,
  deleteBookBorrow,
  getAllBook,
  getAllBorrowBook,
  getAllPenalty,
  updateStatusBorrowBook,
} from "../../../redux/reducer/book"
import { DispatchType, RootState } from "../../../redux/store"
import { getAllCategory } from "../../../redux/reducer/category"
import UploadCoverImage from "../../form/formUpdateCoverBook"
import Pagination from "../../pagination/Pagination"
import { LIMIT } from "../../../constant"
import moment from "moment"
import { useParams } from "react-router-dom"
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"
import { Toast } from "primereact/toast"
import Confirmation from "../../confirmation/Confirmation"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import FormPenalty from "../../form/formPenalty/FormApprove"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import FormApprove from "../../form/formAprove/FormApprove"
import { deleteRequestBook, getAllRequest } from "../../../redux/reducer/requestBook"

const BookBorrow = () => {
  const toast = useRef<any>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [type, setType] = useState<string>("")
  const [actionData, setActionData] = useState(null)
  const [message, setMessage] = useState("mesage");
  const { getListBorrowBook,allPenalty } = useSelector((state: RootState) => state.book)
  const { requestBook } = useSelector((state: RootState) => state.requestBook)

  const dispatch: DispatchType = useDispatch()

  useEffect(() => {
    dispatch(getAllBorrowBook())
    dispatch(getAllPenalty())
    dispatch(getAllRequest())
  }, [])
  const hanldeEdit = (item: any) => {}
  const hanldeDelete = (id: any) => {
    dispatch(deleteBookBorrow(id))
    dispatch(getAllBorrowBook())
   
   
  }

  
  const handleSubmit = () => {}
  const handleUpdateStatus = async (item: any) => {
    dispatch(changeComponent(<FormApprove id={item._id} />))
    dispatch(setIsOpenCompoent(true))
    
  }

  const accept = async () => {
    setVisible(false)
    if (type === "update") handleUpdateStatus(actionData)
    if (type === "delete") hanldeDelete(actionData)
  }

  const reject = () => {
    setVisible(false)
  }

  const representativeBodyTemplate = (item: any) => {
    return (
      <div onClick={() => handleUpdateStatus(item)}>
        {item?.status === "due" 
        ? (
          <p className="bg-red-600 w-20 text-white text-center rounded-xl mx-auto cursor-pointer">{item?.status}</p>
        ) 
        : item?.status === "approved" 
        ? (
          <p className="bg-green-700 w-20 text-white text-center rounded-xl mx-auto cursor-pointer">{item?.status}</p>
        )
        :  item?.status === "return" ?  <p className="bg-green-700 w-20 text-white text-center rounded-xl mx-auto cursor-pointer">{item?.status}</p>
        :  item?.status === "borrowed" ?  <p className="bg-blue-600 w-20 text-white text-center rounded-xl mx-auto cursor-pointer">{item?.status}</p>
        :
        (
          <p className="bg-yellow-600 w-20 text-white text-center rounded-xl mx-auto cursor-pointer">{item?.status}</p>
        )
       
        
        }
      </div>
    )
  }
  
  const representativeBodyTemplateRequest = (item: any) => {
    return (
      <div className="w-full">
        {/* <Button icon="pi  pi-file-edit" rounded text severity="success" aria-label="Cancel" onClick={() => hanldeEdit(item)}/> */}

          <Button
            icon="pi pi-times"
            rounded
            text
            severity="danger"
            aria-label="Cancel"
            onClick={() => {
              dispatch(deleteRequestBook(item._id))
              dispatch(getAllRequest())
            }}
          />
      </div>
    )
  }

  const representativeBodyTemplate4 = (item: any) => {
    return (
      <div className="w-full">
        <Button icon="pi  pi-file-edit" rounded text severity="success" aria-label="Cancel" onClick={() => hanldeEdit(item)}/>
        <Button icon="pi pi-times" rounded text severity="danger" aria-label="Cancel" onClick={() => {
            setType("delete")
            setVisible(true)
            setActionData(item._id)
          }} />
      </div>
    )
  }
  const representativePenalty = (item: any) => {
    return (
      <div>
         <Button icon="pi pi-bell" rounded severity="warning" aria-label="Notification" onClick={() => handlePenalty(item)}/>
      </div>
    )
  }

  const handlePenalty= (item: any) => {
    dispatch(changeComponent(<FormPenalty item={item} />))
    dispatch(setIsOpenCompoent(true))
  }
 
  const dateBodyTemplate = (rowData: any) => {
    const date: any = moment(rowData.borrowedDate).format("DD-MM-YYYY")
    return <div>{date}</div>
  }
  const dateBodyTemplate2 = (rowData: any) => {
    const date: any = moment(rowData.returnDate).format("DD-MM-YYYY")
    return <div>{date}</div>
  }

  return (
    <div className="book__manage">
       
      <ConfirmDialog
        visible={visible}
        onHide={reject}
        message="Bạn muốn thực hiện hành động này?"
        header="Xác nhận"
        icon="pi pi-info-circle"
        accept={accept}
        reject={reject}
      />
<Tabs>
    <TabList>
      <Tab>Sách mượn</Tab>
      <Tab>Phiếu phạt</Tab>
      <Tab>Danh sách yêu cầu</Tab>
    </TabList>

    <TabPanel>
    <DataTable
        scrollable
        value={getListBorrowBook}
        paginator
        rows={4}
        rowsPerPageOptions={[4, 5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        {/* <Column field="image" body={representativeBodyTemplate2} header="Hình ảnh" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column> */}
        <Column field="userId.name" header="Tên" filter sortable style={{ width: "15%", fontSize: "13px" }}></Column>
        <Column
          field="bookId.name"
          header="Tên Sách"
          filter
          sortable
          style={{ width: "25%", fontSize: "13px" }}
        ></Column>
        <Column
          field="borrowedDate"
          header="Ngày mượn"
          body={dateBodyTemplate}
          filter
          sortable
          filterField="date"
          dataType="date"
          style={{ width: "15%", fontSize: "13px" }}
        ></Column>
        <Column
          field="returnDate"
          header="Ngày trả"
          body={dateBodyTemplate2}
          filter
          sortable
          style={{ width: "15%", fontSize: "13px" }}
        ></Column>
        <Column
          field="borrowedBook"
          body={representativeBodyTemplate}
          header="Trạng thái"
          style={{ width: "10%", fontSize: "13px" }}
        ></Column>
        <Column
          field=""
          body={representativePenalty}
          header="Action"
          style={{ width: "15%", fontSize: "13px" }}
        ></Column>
        <Column
          field=""
          body={representativeBodyTemplate4}
          header="Actions"
          style={{ width: "25%", fontSize: "13px" }}
        ></Column>
        
      </DataTable>

    
    </TabPanel>
    <TabPanel>
    <DataTable scrollable  value={allPenalty} paginator rows={4} rowsPerPageOptions={[4,5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
    <Column field="bookId.name" header="Tên Sách" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column field="userId.name" header="Tên người dung" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column field="reason" header="Lý do" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column field="requireRecover" header="Hình thức xử lý"filter sortable  style={{ width: '10%',fontSize:'13px' }}></Column>
</DataTable>
    </TabPanel>
    <TabPanel>
    <DataTable scrollable  value={requestBook} paginator rows={4} rowsPerPageOptions={[4,5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
    <Column field="name" header="Tên Sách" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column field="author" header="Tác giả" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column field="description" header="Mô tả" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column
              field=""
              body={representativeBodyTemplateRequest}
              header="Actions"
              style={{ width: "25%", fontSize: "13px" }}
            ></Column>
</DataTable>
    </TabPanel>
  </Tabs>

  
    </div>
  )
}

export default BookBorrow
