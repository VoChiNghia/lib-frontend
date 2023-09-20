import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../../redux/store'
import { getAllBook, getAllBorrowBook, getAllPenalty } from '../../../redux/reducer/book'
import { getAllRequest } from '../../../redux/reducer/requestBook'
import { getAllUser } from '../../../redux/reducer/user'

const ThongKe = () => {
    const dispatch: DispatchType = useDispatch()
    const { getListBorrowBook,allPenalty,totalBooks } = useSelector((state: RootState) => state.book)
    const { user } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(getAllBook(''))
        dispatch(getAllBorrowBook())
        dispatch(getAllPenalty())
        dispatch(getAllRequest())
        dispatch(getAllUser());
      }, [])
  return (
    <div className='bg-white rounded-xl'> 
        <div className='p-4'>
        <p className='font-bold text-xl my-3'>Tổng số sách: {totalBooks}</p>
        <p className='font-bold text-xl my-3'>Tổng số người dùng: {user?.length ?? 0}</p>
        <p className='font-bold text-xl my-3'>Tổng số sách mượn: {getListBorrowBook?.length ?? 0}</p>
        <p className='font-bold text-xl my-3'>Tổng số phiếu phạt: {allPenalty?.length ?? 0}</p>
        </div>

    </div>
  )
}

export default ThongKe