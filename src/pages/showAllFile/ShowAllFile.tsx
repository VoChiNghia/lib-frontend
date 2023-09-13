import React, { useEffect } from 'react'
import Header from '../../componentClient/header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/store';
import { getAllBook, getAllFile } from '../../redux/reducer/book';
import BookTicket from '../../componentClient/bookTicket/BookTicket';
import { Link } from 'react-router-dom';

const ShowAllFile = () => {
    const { book, totalBooks, allBlog, allFile } = useSelector((state: RootState) => state.book);
  const dispatch: DispatchType = useDispatch()

    const getAllBookApi = () => {
        dispatch(getAllBook(''));
        dispatch(getAllFile())
      };
      useEffect(() => {
        getAllBookApi();
      }, []);
  return (
    <div className="w-[1200px] mx-auto">
        <div><Header/></div>
        <div className='my-4 grid grid-cols-5 gap-4'>
        {
                allFile?.map((blog: any,index: any) => (
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
  )
}

export default ShowAllFile