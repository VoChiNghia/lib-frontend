import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import book, { getBookById } from "../../redux/reducer/book"
import { DispatchType, RootState } from "../../redux/store"
import { AiTwotoneLike } from "react-icons/ai"
import { IoIosShareAlt } from "react-icons/io"
import ButtonSolid from "../../component/button/ButtonSolid"
import Header from "../../componentClient/header/Header"
import Loading from "../../component/loading/Loading"
import { changeComponent, setIsOpenCompoent } from "../../redux/reducer/modal"
import FormBorrowBook from "../../componentClient/formBorrowBook/FormBorrowBook"

const DetailBook = () => {
  const { bookDetail,loading } = useSelector((state: RootState) => state.book)
  const { id } = useParams()
  const dispatch: DispatchType = useDispatch()

  useEffect(() => {
    dispatch(getBookById(String(id)))
  }, [])

  const openFormBorrow = () => {

    dispatch(changeComponent(<FormBorrowBook id={id}/>))
    dispatch(setIsOpenCompoent(true))
  }

  return (
    <div className="w-[1200px] mx-auto">
      <div>
        <Header/>
      </div>
      {
        loading 
        ? <Loading/>
        : <div className="flex ">
        <div className="m-4">
          <img src={bookDetail?.coverImage} alt="" width="90%" />
        </div>
        <div>
          <div>
            <h1 className="font-bold text-4xl my-4">{bookDetail?.name}</h1>
            <div className="flex">
              <p className="flex items-center bg-blue-950 text-white w-18 px-2 rounded cursor-pointer mx-2">
                <span>
                  <AiTwotoneLike />
                </span>{" "}
                Thich
              </p>
              <p className="flex items-center bg-blue-950 text-white w-20 px-2 rounded cursor-pointer mx-2">
                <span>
                  <IoIosShareAlt />
                </span>{" "}
                chia se
              </p>
            </div>
          </div>
          <div className="my-4">
            <p>Tác giả: {bookDetail?.author}</p>
            <p>Nhà xuất bản: {bookDetail?.publisher}</p>
            <p>Số lượng sách còn lại: {bookDetail?.quantity}</p>
            <p>Ngôn ngữ: {bookDetail?.language === 'vn' ? 'Tiếng việt' : 'English'}</p>
            
          </div>

          <div className="flex">
            <div>
            <ButtonSolid text='Mượn' onSubmit={openFormBorrow}/>
            </div>
           <div className="mx-2">
              <a href={bookDetail?.format[0]?.linkPdf} target="_blank">
              <ButtonSolid outline={true} text='Tải bản pdf' onSubmit={() => {}}/>
              </a>
          
           </div>
          </div>
        </div>
      </div>
      }
      <div>
        <h3 className="font-bold bg-orange-600 text-white rounded p-2 my-2">Mô tả</h3>
        <p>{bookDetail?.summary}</p>
      </div>
    </div>
  )
}

export default DetailBook
