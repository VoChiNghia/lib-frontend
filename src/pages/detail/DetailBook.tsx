import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import book, { createFavoriteBook, getBookById } from "../../redux/reducer/book"
import { DispatchType, RootState } from "../../redux/store"
import { AiTwotoneLike } from "react-icons/ai"
import { IoIosShareAlt } from "react-icons/io"
import ButtonSolid from "../../component/button/ButtonSolid"
import Header from "../../componentClient/header/Header"
import Loading from "../../component/loading/Loading"
import { changeComponent, setIsOpenCompoent } from "../../redux/reducer/modal"
import FormBorrowBook from "../../componentClient/formBorrowBook/FormBorrowBook"
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button"
import { USER } from "../../config/axios"

const DetailBook = () => {
  const toast = useRef<any>(null);
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem(USER) as string) ?? '');
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

  const showWarn = () => {
    toast.current.show({severity:'warn', summary: 'Thông báo', detail:'Không Tìm thấy file pdf', life: 3000});
}

const handleBookMark = () => {
  const data = {
    userId:user._id,
    bookId: id,
  }
  if(!user._id) toast.current.show({severity:'warn', summary: 'Thông báo', detail:'Có lỗi xãy ra', life: 3000});
  dispatch(createFavoriteBook(data))
  
}

  return (
    <div className="w-[1200px] mx-auto">
      <Toast ref={toast} />
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

              <p className="flex items-cente text-white w-20 px-2 rounded cursor-pointer mx-2">
                <span>
                
                <i className="pi pi-bookmark-fill text-xl" style={{ color: 'yellow' }}></i>
                </span>{" "}
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
            <Button label="Mượn" severity="success" raised onSubmit={openFormBorrow}/>
            </div>
           <div className="mx-2">
              <a href={bookDetail?.format[0]?.linkPdf? bookDetail?.format[0]?.linkPdf: null} onClick={bookDetail?.format[0]?.linkPdf ?? showWarn} target="_blank">
              <Button label="Primary" outlined/>
              </a>
          
           </div>
           <div>
           <Button label="Đánh đấu yêu thích" severity="info" outlined onClick={handleBookMark}/>
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
