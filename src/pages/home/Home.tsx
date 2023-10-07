import React, { useEffect, useRef, useState } from "react"
import "./home.scss"
import Header from "../../componentClient/header/Header"
import BookTicket from "../../componentClient/bookTicket/BookTicket"
import SideBar from "../../componentClient/sideBar/SideBar"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Toast } from "primereact/toast"
import "swiper/css/scrollbar"
import "swiper/css/pagination"
import { useDispatch, useSelector } from "react-redux"
import { DispatchType, RootState } from "../../redux/store"
import { getAllBlog, getAllBook, getAllFile } from "../../redux/reducer/book"
import { getAllCategory } from "../../redux/reducer/category"
import { Link } from "react-router-dom"
import { Button } from "primereact/button"
import { Carousel } from "primereact/carousel"
import Footer from "../../componentClient/footer/Footer"
import FormBorrowBook from "../../componentClient/formBorrowBook/FormBorrowBook"
import { changeComponent, setIsOpenCompoent } from "../../redux/reducer/modal"
import Loading2 from "../../component/loading2/Loading2"
import FormInfo from "../../component/form/formInfo/FormInfo"
import CardBlog from "../../component/cardBlog/CardBlog"
const Home = () => {
  const dispatch: DispatchType = useDispatch()
  const toast = useRef<any>(null)
  const { book, totalBooks, allBlog, allFile, loading2 } = useSelector((state: RootState) => state.book)
  const getAllBookApi = () => {
    dispatch(getAllBook(""))
    dispatch(getAllCategory())
    dispatch(getAllBlog())
    dispatch(getAllFile())
  }
  useEffect(() => {
    getAllBookApi()
  }, [])
  const [products, setProducts] = useState([
    {
      title: "Nhớ rằng đôi khi không quan trọng nơi bạn đang đi, chỉ là bạn đang đi cùng ai.",
      author: "Mahatma Gandhi",
    },
    {
      title:
        "Tôi không có quyền quyết định điều gì sẽ xảy ra với tôi, nhưng tôi có quyền quyết định làm gì với những gì xảy ra.",
      author: "Mary Engelbreit",
    },
    {
      title: "Cuộc sống không phải là việc bạn sống trong bao lâu, mà là bạn sống như thế nào.",
      author: "Tara Westover",
    },
    {
      title: "Không có người đàn ông nào đứng ở đỉnh núi mà không phải bắt đầu từ dưới đáy.",
      author: "Richard C. Miller",
    },
  ])
  const responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ]

  const showWarn = () => {
    toast.current.show({ severity: "warn", summary: "Thông báo", detail: "Không Tìm thấy file pdf", life: 3000 })
  }

  const productTemplate = (product: any) => {
    return (
      <div className=" blockquote-wrapper border-1 surface-border border-round rounded m-2 text-center py-5 px-3">
        <div className="quote--container">
          <p className="quote text-xl bold">{product.title}</p>
          <p className="quote--author">&ndash; {product.author}</p>
        </div>
      </div>
    )
  }

  const handleClick = (item: any) => {
    dispatch(changeComponent(<FormInfo jsx={item} />))
    dispatch(setIsOpenCompoent(true))
  }
  return (
    <div className="home bg-white">
      <Toast ref={toast} />
      {loading2 ? <Loading2 /> : null}
      <div className="home__container container ">
        <Header />
        {/* <BookTicket/> */}
        <div className="overflow-hidden bg-gray-200 py-2">
          <div className="running-text w-[1280] ">
            <p className="text-orange-500">
              Chào mừng các bạn đên với phần mềm quản lý thư viên trường cao đẳng công nghệ cao đồng an {"        "}Chào
              mừng các bạn đên với phần mềm quản lý thư viên trường cao đẳng công nghệ cao đồng an
            </p>
          </div>
        </div>
        <div className="flex mt-6">
          <div className="w-60">
            <SideBar />
          </div>
          <div className="w-full ml-6 overflow-hidden">
            <div>
              <Swiper className="mySwiper w-screen">
                <SwiperSlide className="w-[80%]">
                  <img
                    className="w-full"
                    src="https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner/0/0/0/2413_new.jpg?v=1&w=1580&h=400"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                   className="w-full"
                    src="https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner/0/0/0/2419_new.jpg?v=1&w=1580&h=400"
                    alt=""
                  />
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="bg-gray-200 m-0 p-0">
              <Carousel
                value={products}
                numVisible={1}
                numScroll={1}
                showIndicators={false}
                className="custom-carousel m-0 p-0 "
                autoplayInterval={10000}
                itemTemplate={productTemplate}
              />
            </div>
            <div className="mt-6">
              <h1 className="bg-[#FF9138] p-2 font-bold rounded text-white">Sách</h1>
              <div className="my-2 grid grid-cols-5 gap-4">
                {book?.slice(0, 10).map((book: any, index: any) => (
                  <BookTicket key={index} book={book} />
                ))}
              </div>
            </div>

            <div>
              <h1 className="bg-[#FF9138] my-3 p-2 font-bold rounded text-white">Tài liệu</h1>
              <div className=" grid grid-cols-5">
                {allFile?.slice(0, 5).map((blog: any, index: any) => (
                  <div
                    className="w-48 h-96 mx-2 flex flex-col justify-between hover:shadow-lg"
                    onClick={() => handleClick(blog)}
                  >
                    <img className="w-full" src={blog.image} alt="" />
                    <div>
                      <p className="font-bold text-xl text-center">
                        {blog.tenMonHoc.length > 30 ? `${blog?.tenMonHoc?.slice(0, 20)} ...` : blog.tenMonHoc}
                      </p>
                      <div
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault()
                          const pdfLink = blog?.filePdf
                          if (pdfLink) {
                            window.open(pdfLink, "_blank")
                          } else {
                            showWarn()
                          }
                        }}
                      >
                        <Button className="w-full" label="Pdf" outlined />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h1 className="bg-[#FF9138] my-3 p-2 font-bold rounded text-white">Bài viết mới</h1>
              <div className="grid grid-cols-3">
                {allBlog?.slice(0, 3).map((blog: any, index: any) => (
                  <Link to={`/blog/${blog._id}`} className="m-4">
                    <CardBlog item={blog}/>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
