import React, { useEffect } from 'react'
import Header from '../../componentClient/header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/store';
import { getAllBook } from '../../redux/reducer/book';
import BookTicket from '../../componentClient/bookTicket/BookTicket';
import Loading from '../../component/loading/Loading';

const ShowAllBook = () => {
    const { book, totalBooks, allBlog, allFile,loading } = useSelector((state: RootState) => state.book);
  const dispatch: DispatchType = useDispatch()

    const getAllBookApi = () => {
        dispatch(getAllBook(''));
    
      };
      useEffect(() => {
        getAllBookApi();
      }, []);
  return (
    <div className="w-[1200px] mx-auto">
        <div><Header/></div>
        <div className='my-4 grid grid-cols-5 gap-4'>
        {
            loading ? <Loading/>
               : book?.map((book: any,index: any) => (
                 
                    <BookTicket key={index} book={book}/>
                  
                ))
              }
        </div>
    </div>
  )
}

export default ShowAllBook