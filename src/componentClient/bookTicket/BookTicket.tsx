import * as ReactDOM from "react-dom"
import * as React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import './bookTicket.scss'
const BookTicket = ({book}: any) => {
  return (

    <Link to={`/${book._id}`}>
    <div className="max-w-md mx-auto h-[310px] flex flex-col justify-between bg-white rounded-md overflow-hidden shadow-md hover:shadow-lg p-2">
      <div className="relative">
      <img className="w-full h-48 object-cover" src={book.coverImage} alt="Book cover" />
      <p className="font-bold">{ book.name.length > 30 ? `${book?.name?.slice(0,30)} ...` : book.name}</p>
      <div className="bookMark"></div>
      </div>
      <button
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
        >
          Mượn
        </button>
    </div>
    </Link>
    
  )
}
export default BookTicket
