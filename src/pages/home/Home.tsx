import React, { useEffect } from "react"
import "./home.scss"
import Header from "../../componentClient/header/Header"
import BookTicket from "../../componentClient/bookTicket/BookTicket"
import SideBar from "../../componentClient/sideBar/SideBar"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/scrollbar"
import "swiper/css/pagination"
import { useDispatch, useSelector } from "react-redux"
import { DispatchType, RootState } from "../../redux/store"
import { getAllBlog, getAllBook, getAllFile } from "../../redux/reducer/book"
import { getAllCategory } from "../../redux/reducer/category"
import { Link } from "react-router-dom"
const Home = () => {
  const dispatch: DispatchType = useDispatch()
  const { book, totalBooks, allBlog, allFile } = useSelector((state: RootState) => state.book);
  console.log(allBlog)
  const getAllBookApi = () => {
    dispatch(getAllBook(''));
    dispatch(getAllCategory())
    dispatch(getAllBlog())
    dispatch(getAllFile())

  };
  useEffect(() => {
    getAllBookApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home bg-white">
      <div className="home__container container ">
        <Header />
        {/* <BookTicket/> */}
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
                    src="https://307a0e78.vws.vegacdn.vn/view/v2/image/img.banner/0/0/0/2419_new.jpg?v=1&w=1580&h=400"
                    alt=""
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="mt-6">
              <h1 className="bg-[#FF9138] p-2 font-bold rounded text-white">Book</h1>
            <div className="my-2 grid grid-cols-5 gap-4">
              {
                book?.slice(0,10).map((book: any,index: any) => (
                 
                    <BookTicket key={index} book={book}/>
                  
                ))
              }
            </div>
            </div>


            <div>
            <h1 className="bg-[#FF9138] my-3 p-2 font-bold rounded text-white">Tài liệu</h1>
              <div className="flex">
              {
            allFile?.slice(0,4).map((blog: any,index: any) => (
              <Link to={`/file/${blog._id}`}>
              <div className="w-64 h-96 mx-2 flex flex-col justify-between">
                <img className="w-64" src={blog.image} alt="" />
                <p className="font-bold text-xl text-center">{blog.tenMonHoc.toUpperCase()}</p>
              </div>
              </Link>
              ))
          }
              </div>
        </div>

            <div>
            <h1 className="bg-[#FF9138] my-3 p-2 font-bold rounded text-white">Bài viết mới</h1>
              <div className="flex">
              {
            allBlog?.slice(0,4).map((blog: any,index: any) => (
              <Link to={`/blog/${blog._id}`}>
              <div className="w-64 mx-2">
                <img className="w-64" src={blog.thumbnail} alt="" />
                <p className="font-bold text-xl text-center">{blog.title}</p>
              </div>
              </Link>
              ))
          }
              </div>
        </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Home
