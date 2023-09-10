import React, { useEffect, useState } from "react"
import Header from "../../componentClient/header/Header"
import { deleteBookBorrow, getAllBorrowBook } from "../../redux/reducer/book"
import { useDispatch, useSelector } from "react-redux"
import { DispatchType, RootState } from "../../redux/store"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import moment from "moment"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css"
import { useParams } from "react-router-dom"

const ListBookBorrow = () => {
  const { getListBorrowBook } = useSelector((state: RootState) => state.book)
  const { id } = useParams()

  const historyBorrow = null
  const dispatch: DispatchType = useDispatch()

  useEffect(() => {
    dispatch(getAllBorrowBook())
  }, [])

  const hanldeEdit = (item: any) => {}
  const hanldeDelete = async (id: any) => {
  await dispatch(deleteBookBorrow(id))
  await dispatch(getAllBorrowBook())
  }
  const handleSubmit = () => {}
  return (
    <div className="w-[1200px] mx-auto">
      <div>
        <Header />
      </div>

      <Tabs>
        <TabList>
          <Tab>Danh sách đã mượn</Tab>
          <Tab>Lịch sử sách đã mượn</Tab>
        </TabList>

        <TabPanel>
          {!getListBorrowBook?.filter((x: any) => x?.userId?._id === id)? (
            <p className="m-5 text-xl text-gray-400">Danh sách trống</p>
          ) : (
            <table className="book__manage__wrapper__list__book">
              <thead className="book__manage__wrapper__list__book-header">
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>Tên sách</th>
                  <th>Ngày mượn</th>
                  <th>Ngày trả</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="book__manage__wrapper__list__book-body">
                {getListBorrowBook?.filter((x: any) => x?.userId?._id === id)?.map((item: any, index: number) => (
                  <tr key={index} className="book__manage__wrapper__list__book-body__row text-center">
                    <td className="text-sm p-1">{index + 1}</td>
                    <td className="text-sm p-1">{item?.userId?.name}</td>
                    <td className="text-sm p-1">{item?.bookId?.name}</td>
                    <td className="text-sm p-1">{moment(item?.borrowedDate).format("DD-MM-YYYY")}</td>
                    <td className="text-sm p-1">{moment(item?.returnDate).format("DD-MM-YYYY")}</td>
                    <td className="text-sm p-1">
                    {item?.status === "due" ? (
                        <p className="bg-red-600 w-20 text-white text-center rounded-xl mx-auto">{item?.status}</p>
                      ) : item?.status === "approved" ?  <p className="bg-green-700 w-20 text-white text-center rounded-xl mx-auto">{item?.status}</p> : (
                        <p className="bg-yellow-600 w-20 text-white text-center rounded-xl mx-auto">{item?.status}</p>
                      )}
                    </td>

                    <td className="text-sm p-1">
                      <button onClick={() => hanldeEdit(item)} className="btn-edit">
                        <span>
                          <AiOutlineEdit />
                        </span>
                      </button>
                      <button onClick={() => hanldeDelete(item._id)} className="btn-delete">
                        <span>
                          <AiOutlineDelete />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TabPanel>
        <TabPanel>
          {!historyBorrow ? (
            <p className="m-5 text-xl text-gray-400">Danh sách trống</p>
          ) : (
            <table className="book__manage__wrapper__list__book">
              <thead className="book__manage__wrapper__list__book-header">
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>Tên sách</th>
                  <th>Ngày mượn</th>
                  <th>Ngày trả</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="book__manage__wrapper__list__book-body">
                {getListBorrowBook?.map((item: any, index: number) => (
                  <tr key={index} className="book__manage__wrapper__list__book-body__row text-center">
                    <td className="text-sm p-1">{index + 1}</td>
                    <td className="text-sm p-1">{item?.userId?.name}</td>
                    <td className="text-sm p-1">{item?.bookId?.name}</td>
                    <td className="text-sm p-1">{moment(item?.borrowedDate).format("DD-MM-YYYY")}</td>
                    <td className="text-sm p-1">{moment(item?.returnDate).format("DD-MM-YYYY")}</td>
                    <td className="text-sm p-1">
                      {item?.status === "due" ? (
                        <p className="bg-red-600 w-20 text-white text-center rounded-xl mx-auto">{item?.status}</p>
                      ) : (
                        <p className="bg-yellow-600 w-20 text-white text-center rounded-xl mx-auto">{item?.status}</p>
                      )}
                    </td>

                    <td className="text-sm p-1">
                      <button onClick={() => hanldeEdit(item)} className="btn-edit">
                        <span>
                          <AiOutlineEdit />
                        </span>
                      </button>
                      <button onClick={() => hanldeDelete(item._id)} className="btn-delete">
                        <span>
                          <AiOutlineDelete />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default ListBookBorrow
