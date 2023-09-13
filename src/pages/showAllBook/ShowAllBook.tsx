import React, { useEffect, useState } from "react"
import Header from "../../componentClient/header/Header"
import { useDispatch, useSelector } from "react-redux"
import { DispatchType, RootState } from "../../redux/store"
import { getAllBook } from "../../redux/reducer/book"
import BookTicket from "../../componentClient/bookTicket/BookTicket"
import Loading from "../../component/loading/Loading"
import { Dropdown } from "primereact/dropdown"
import { getAllCategory } from "../../redux/reducer/category"
import { Button } from "primereact/button"

const ShowAllBook = () => {
  const { book, totalBooks, allBlog, allFile, loading } = useSelector((state: RootState) => state.book)
  const { category } = useSelector((state: RootState) => state.category)
  const [selectedCity, setSelectedCity] = useState<any>(null)

  const dispatch: DispatchType = useDispatch()
  const getAllBookApi = () => {
    dispatch(getAllBook(""))
    dispatch(getAllCategory())
  }
  useEffect(() => {
    getAllBookApi()
  }, [])

  const clearFilter = () => {
    setSelectedCity(null)
  }
  return (
    <div className="w-[1200px] mx-auto">
      <div>
        <Header />
      </div>
      <div className="w-56">
        <div>
        <label className="font-bold">Lọc theo thể loại</label>
        <Dropdown
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.value)}
          options={category}
          optionLabel="name"
          placeholder="Chọn thể loại"
          className="w-full md:w-14rem"
        />
        </div>
        <Button label="Xóa filter" severity="info" outlined onClick={clearFilter} className="my-2"/>
      </div>
      <div className="my-4 grid grid-cols-5 gap-4">
        {selectedCity
          ? book
              ?.filter((x: any) => x?.category?._id.includes(selectedCity?._id))
              ?.map((book: any, index: any) => <BookTicket key={index} book={book} />)
          : book
              ?.map((book: any, index: any) => <BookTicket key={index} book={book} />)}
      </div>
    </div>
  )
}

export default ShowAllBook
