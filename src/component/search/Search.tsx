import React, { useState } from "react"
import "./search.scss"
import { CiSearch } from "react-icons/ci"
import { AiOutlineSearch } from "react-icons/ai"
import { Button } from "primereact/button"
import { getAllBook } from "../../redux/reducer/book"
import { useDispatch, useSelector } from "react-redux"
import { DispatchType, RootState } from "../../redux/store"
import { DataScroller } from "primereact/datascroller"
import { history } from "../Layout"
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [active, setActive] = useState(false)
  const dispatch: DispatchType = useDispatch()
  const { book } = useSelector((state: RootState) => state.book)



  const handleSearch = async () => {
    if (searchQuery.length !== 0) {
     await dispatch(getAllBook(''))
      setActive(true)
    }
  }

  const itemTemplate = (data: any) => {
    return (
      <div className="flex w-[700px] justify-between">
        <div className=" flex">
          <img className="w-32" src={data?.coverImage} alt="" />
          <div className="mx-10">
            <p className="font-bold text-xl">{data?.name}</p>
            <div className="mt-4">
              <p>Tác giả: {data?.author}</p>
              <p>Nhà xuất bản: {data?.publisher}</p>
              <p>Ngôn ngữ: {data?.language === "vn" ? "Tiếng việt" : "English"}</p>
            </div>
          </div>
        </div>

        <div className="m-4 flex flex-col">
          <Button label="Xem Chi tiết" onClick={() => history.push(`/${data._id}`)} className="mb-2" raised />
          {/* <Button label="Xóa" className="mt-2" raised severity="danger" onClick={() => hanldeDelete(data._id)}/> */}
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="relative flex items-center justify-between space-x-2  border-solid border-[1px] border-gray-300 rounded-lg overflow-hidden">

        <input
          type="text"
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            console.log(searchQuery.length)
            if(searchQuery.length === 0 || searchQuery.length === 1 ) setActive(false)
          }}
        />
        <Button icon="pi pi-search"  onClick={handleSearch} severity="warning" aria-label="Search" />
    </div>
    <div className="absolute z-10">
    {
      active ?
      <DataScroller
        value={book.filter((book:any) =>
          String(book?.name).toLowerCase().includes(String(searchQuery).toLowerCase())
         )}
        itemTemplate={itemTemplate}
        rows={5}
        inline
        scrollHeight="500px"
        header="Scroll Down to Load More"
        
      />
      : null
    }
    </div>
    </div>
  )
}
export default Search
