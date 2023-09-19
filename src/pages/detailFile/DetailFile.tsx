import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import book, { createFavoriteBook, getAllFile, getBookById, getFileById } from "../../redux/reducer/book"
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

const DetailFile = () => {
  const toast = useRef<any>(null)
  const [randomBooks, setRandomBooks] = useState([])
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem(USER) as string) ?? "")
  const { fileDetail,allFile } = useSelector((state: RootState) => state.book)
  const { id } = useParams()
  const dispatch: DispatchType = useDispatch()
  const currentURL = window.location.href
  const loading = false
  useEffect(() => {
    dispatch(getFileById(String(id)))
    dispatch(getAllFile())
    window.scrollTo(0, 0)
  }, [])

  const openFormBorrow = () => {
    dispatch(changeComponent(<FormBorrowBook id={id} />))
    dispatch(setIsOpenCompoent(true))
  }

  const showWarn = () => {
    toast.current.show({ severity: "warn", summary: "Thông báo", detail: "Không Tìm thấy file pdf", life: 3000 })
  }

  const handleBookMark = () => {
    const data = {
      userId: user._id,
      bookId: id,
    }
    if (!user._id) toast.current.show({ severity: "warn", summary: "Thông báo", detail: "Có lỗi xãy ra", life: 3000 })
    dispatch(createFavoriteBook(data))
  }

  useEffect(() => {
    // Logic để chọn 5 phần tử ngẫu nhiên từ danh sách book
    const getRandomItems = () => {
      const randomIndices: any = []
      while (randomIndices.length < 5) {
        const randomIndex = Math.floor(Math.random() * book.length)
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex)
        }
      }
      return randomIndices.map((index: any) => allFile[index])
    }

    const randomBooks = getRandomItems()
    setRandomBooks(randomBooks)
  }, [book])

  return (
    <div>
      <div className="w-[1200px] mx-auto">
      <Toast ref={toast} />
      <div>
        <Header />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex ">
          <div className="m-4">
            <img src={fileDetail?.image} alt="" width="90%" />
          </div>
          <div>
            <div>
              <h1 className="font-bold text-4xl my-4">{fileDetail?.tenMonHoc}</h1>
              <div className="flex">
                <FacebookShareButton url={currentURL}>
                  <p className="flex items-center bg-blue-950 text-white w-18 px-2 rounded cursor-pointer mx-2">
                    <span>
                      <FaFacebook className="mx-1" />
                    </span>{" "}
                    Chia sẻ
                  </p>
                </FacebookShareButton>

                <TwitterShareButton url={currentURL}>
                  <p className="flex items-center bg-blue-950 text-white w-18 px-2 rounded cursor-pointer mx-2">
                    <span>
                      <FaTwitter className="mx-1" />
                    </span>{" "}
                    Chia sẻ
                  </p>
                </TwitterShareButton>
              </div>
            </div>
            <div className="my-4">
              <p>Giáo viên: {fileDetail?.giaovien}</p>
            </div>

            <div className="flex">
              <div>
                <Button label="Mượn" severity="success" raised onClick={openFormBorrow} />
              </div>
              <div className="mx-2">
                <div
                  onClick={(e) => {
                    e.preventDefault() // Prevent the default link behavior
                    const pdfLink = fileDetail?.filePdf
                    if (pdfLink) {
                      window.open(pdfLink, "_blank") // Open the PDF link in a new tab
                    } else {
                      showWarn() // Call the showWarn function if linkPdf is not available
                    }
                  }}
                >
                  <Button label="Pdf" outlined />
                </div>
              </div>
              <div>
                <Button label="Đánh đấu yêu thích" severity="info" outlined onClick={handleBookMark} />
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <h3 className="font-bold bg-orange-600 text-white rounded p-2 my-2">Mô tả</h3>
        <p>Không có mô tả chi tiết</p>
      </div>

      <div className="mt-6">
        <div className="text-center font-bold text-4xl my-10">------------File gợi ý-----------</div>
        <div className="my-2 grid grid-cols-5 gap-4">
          {randomBooks?.slice(0, 5).map((book: any, index: any) => (
            <BookTicket key={index} book={book} />
          ))}
        </div>
      </div>
     
    </div>
     <Footer/>
    </div>
  )
}

export default DetailFile
