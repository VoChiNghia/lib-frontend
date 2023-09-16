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
const ListFavoriteBook = () => {
  const { listFavoriteByUser } = useSelector((state: RootState) => state.book)
  const { id } = useParams()
  console.log(listFavoriteByUser)

  const historyBorrow = null
  const dispatch: DispatchType = useDispatch()

  useEffect(() => {
    dispatch(getAllListFavoriteByUser(id))
  }, [])

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
              <Button label="Xem Chi tiết" className="mb-2" raised />
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

      <DataScroller value={listFavoriteByUser?.listBooks} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Scroll Down to Load More" />
    </div>
  )
}

export default ListFavoriteBook
