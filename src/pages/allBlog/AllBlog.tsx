import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import book, { createFavoriteBook, getAllBlog, getBookById } from "../../redux/reducer/book"
import { DispatchType, RootState } from "../../redux/store"
import { AiTwotoneLike } from "react-icons/ai"
import { IoIosShareAlt } from "react-icons/io"
import ButtonSolid from "../../component/button/ButtonSolid"
import Header from "../../componentClient/header/Header"
import Loading from "../../component/loading/Loading"
import { changeComponent, setIsOpenCompoent } from "../../redux/reducer/modal"
import FormBorrowBook from "../../componentClient/formBorrowBook/FormBorrowBook"
import { Toast } from "primereact/toast"
import { Button } from "primereact/button"
import { USER } from "../../config/axios"
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from "react-share"
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"
import BookTicket from "../../componentClient/bookTicket/BookTicket"
import Footer from "../../componentClient/footer/Footer"
import CardBlog from "../../component/cardBlog/CardBlog"

const AllBlog = () => {
  const toast = useRef<any>(null)
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem(USER) as string) ?? "")
  const { allBlog } = useSelector((state: RootState) => state.book)
  const dispatch: DispatchType = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getAllBlog())
  }, [])

  const showWarn = () => {
    toast.current.show({ severity: "warn", summary: "Thông báo", detail: "Không Tìm thấy file pdf", life: 3000 })
  }


  return (
    <div>
      <div className="w-[1200px] mx-auto min-h-[100vh]">
      <Toast ref={toast} />
      <div>
        <Header />
      </div>
    
      <h1 className="m-6 font-bold text-orange-400 text-xl">Tất cả bài viết</h1>
        
      <div className="grid grid-cols-3">
                {allBlog?.slice(0, 3).map((blog: any, index: any) => (
                  <Link to={`/blog/${blog._id}`} className="m-4">
                    <CardBlog item={blog}/>
                  </Link>
                ))}
              </div>

    </div>
     <Footer/>
    </div>
  )
}

export default AllBlog
