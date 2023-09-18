import React, { useEffect, useState } from "react"
import Header from "../../componentClient/header/Header"
import { deleteBookBorrow, deleteFavorite, deleteItemFromListBooks, getAllBorrowBook, getAllListFavorite, getAllListFavoriteByUser } from "../../redux/reducer/book"
import { useDispatch, useSelector } from "react-redux"
import { DispatchType, RootState } from "../../redux/store"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import moment from "moment"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import { useParams } from "react-router-dom"
import { DataScroller } from 'primereact/datascroller';
import { Button } from "primereact/button"
import { history } from "../../component/Layout"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { deleteRequestBook, getAllRequest } from "../../redux/reducer/requestBook"
const ListFavoriteBook = () => {
  const { listFavoriteByUser } = useSelector((state: RootState) => state.book)
  const { requestBook } = useSelector((state: RootState) => state.requestBook)
  const { id } = useParams()
  const historyBorrow = null
  const dispatch: DispatchType = useDispatch()

  useEffect(() => {
    dispatch(getAllListFavoriteByUser(id))
    dispatch(getAllRequest())
  }, [])
  console.log(requestBook)
  const hanldeEdit = (item: any) => {}
  const hanldeDelete = async (bookId: any) => {
    const data = {
      _id: bookId,
      userId: id
    }
  await dispatch(deleteItemFromListBooks(data))
  await dispatch(getAllListFavoriteByUser(id))
  }
  const handleSubmit = () => {}

  const representativeBodyTemplate4 = (item: any) => {
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

  const itemTemplate = (data: any) => {
    return (
        <div className="flex w-full justify-between">
            <div className=" flex">
              <img className="w-32" src={data?.coverImage} alt="" />
              <div className="mx-10">
              <p className="font-bold text-xl">{data?.name}</p>
              <div className="mt-4">
              <p>Tác giả: {data?.author}</p>
              <p>Nhà xuất bản: {data?.publisher}</p>
               <p>Ngôn ngữ: {data?.language === 'vn' ? 'Tiếng việt' : 'English'}</p>
              </div>
            </div>
            </div>

            <div className="m-4 flex flex-col">
              <Button label="Xem Chi tiết" className="mb-2" onClick={() => history.push(`/${data._id}`)} raised />
              <Button label="Xóa" className="mt-2" raised severity="danger" onClick={() => hanldeDelete(data._id)}/>
            </div>
            
        </div>
    );
};
  return (
    <div className="w-[1200px] mx-auto">
      <div>
        <Header />
      </div>
      <Tabs>
    <TabList>
      <Tab>Yêu thích</Tab>
      <Tab>Danh sách yêu cầu</Tab>
    </TabList>

    <TabPanel>
    <DataScroller value={listFavoriteByUser?.listBooks} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
    </TabPanel>
    <TabPanel>
    <DataTable scrollable  value={requestBook?.filter((book: any) => book?.user?._id === id)} paginator rows={4} rowsPerPageOptions={[4,5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
    <Column field="name" header="Tên Sách" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column field="author" header="Tác giả" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column field="description" header="Mô tả" filter sortable  style={{ width: '25%',fontSize:'13px' }}></Column>
    <Column
              field=""
              body={representativeBodyTemplate4}
              header="Actions"
              style={{ width: "25%", fontSize: "13px" }}
            ></Column>
</DataTable>
    </TabPanel>
  </Tabs>
      
    </div>
  )
}

export default ListFavoriteBook
