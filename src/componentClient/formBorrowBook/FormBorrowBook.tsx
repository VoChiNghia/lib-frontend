import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';
import { DispatchType } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { borrowBook } from '../../redux/reducer/book';
import { setIsOpenCompoent } from '../../redux/reducer/modal';
import { toast } from 'react-toastify';

const FormBorrowBook = ({id}: any) => {
    const [borrowDate, setBorrowDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const dispatch: DispatchType = useDispatch()
    const handleBorrowDateChange = (date: any) => {
      setBorrowDate(date);
    };
  
    const handleReturnDateChange = (date: any) => {
      setReturnDate(date);
    };
  
    const handleSubmit = (e: any) => {
      e.preventDefault();

      if(borrowDate >= returnDate){
      toast.error("Ngày mượn phải bé hơn ngày trả");
      return
      }

      if(borrowDate < new Date()){
        toast.error("Ngày mượn phải là những ngày trong tương lai");
        return
      }

      const model: any = {
            bookId: id,
            borrowedDate: borrowDate,
            returnDate: returnDate
      }
      dispatch(borrowBook(model))
      dispatch(setIsOpenCompoent(false))
    };

  
    return (
        <div className="w-96 pb-40">
        <h2 className="font-bold text-2xl">Mượn Sách</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Ngày Mượn:</label>
            <DatePicker
              selected={borrowDate}
              onChange={handleBorrowDateChange}
              className="w-full border-[1px] border-solid  border-gray-300 p-2 rounded"
              placeholderText="Chọn ngày mượn"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Ngày Trả:</label>
            <DatePicker
              selected={returnDate}
              onChange={handleReturnDateChange}
              className="w-full border-[1px] border-solid  border-gray-300 p-2 rounded"
              placeholderText="Chọn ngày trả"
            />
          </div>
          <div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Mượn
            </button>
          </div>
        </form>
      </div>
    );
  }
export default FormBorrowBook