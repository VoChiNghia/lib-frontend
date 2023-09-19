import * as ReactDOM from "react-dom"
import * as React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import './bookTicket.scss'
import FormBorrowBook from "../formBorrowBook/FormBorrowBook"
import { changeComponent, setIsOpenCompoent } from "../../redux/reducer/modal"
import { useDispatch } from "react-redux"
const BookTicket = ({book}: any) => {
const dispatch= useDispatch()
  const openFormBorrow = (id: string) => {
    dispatch(changeComponent(<FormBorrowBook id={id} />))
    dispatch(setIsOpenCompoent(true))
  }
  return (

    <Link to={`/${book._id}`}>
    <div className="max-w-md mx-auto h-[310px] flex flex-col justify-between transition-all bg-white rounded-md overflow-hidden shadow-md hover:border-[1px] hover:border-[#fb5a1c] hover:border-solid hover:shadow-lg p-2">
      <div className="relative overlay-bookticket">
      <i className="pi pi-book icon" style={{ color: 'green' }}></i>
      <img className="w-full h-48 object-cover" src={book.coverImage} alt="Book cover" />
      <p className="font-bold">{ book.name.length > 30 ? `${book?.name?.slice(0,30)} ...` : book.name}</p>
      <div className="bookMark"></div>
      </div>
      <button
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
          onClick={() => openFormBorrow(book._id)}
        >
          Mượn
        </button>
    </div>
    </Link>
    
  )
}
export default BookTicket
