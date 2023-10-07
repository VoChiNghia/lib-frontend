import React, { useState } from "react"
import { BiBookOpen, BiHome } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { HiOutlineDocumentDuplicate } from "react-icons/hi"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { Link } from "react-router-dom"
import { Tree } from 'primereact/tree';
import { changeComponent, setIsOpenCompoent } from "../../redux/reducer/modal";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import RequestBook from "../../component/form/formAddRequestBook/FormAddRequestBook";
const SideBar = () => {
  const dispatch: DispatchType = useDispatch()
  const { book } = useSelector((state: RootState) => state.book)
  const handleRequestBook = () => {
    dispatch(changeComponent(<RequestBook />))
    dispatch(setIsOpenCompoent(true))
  }

  return (
    <div>
      <h1 className="bg-[#FF9138] text-white p-2 font-bold rounded-t-lg">Danh mục</h1>
      <ul className="mt-4">
      <Link to='/'>
        <li className="mt-2 border-b-[1px] my-4 relative border-[#ccc] border-solid py-2 px-1 hover:bg-gray-100 transition-all flex align-center">
          <span className="absolute top-[50%] translate-y-[-50%]">
            <BiHome className="text-[#FF9138]"/>
          </span>{" "}
          <p className="leading-3  mx-6 cursor-pointer">Trang chủ</p>
        
        </li>
        </Link>
        <Link to='/show-all-book'>
        <li className="mt-2 border-b-[1px] relative my-4 border-[#ccc] border-solid py-2 px-1 hover:bg-gray-100 transition-all flex align-center">
          <span className="absolute top-[50%] translate-y-[-50%]">
            <BiBookOpen className="text-[#FF9138]"/>
          </span>{" "}
          <p className="leading-3  mx-6 cursor-pointer">Sách</p>
        
        </li>
        </Link>
        <Link to='/show-all-file'>
        <li className="mt-2 border-b-[1px] relative my-4 border-[#ccc] border-solid py-2 px-1 hover:bg-gray-100 transition-all flex align-center">
        <span className="absolute top-[50%] translate-y-[-50%]">
            <HiOutlineDocumentDuplicate className="text-[#FF9138]"/>
          </span>{" "}
          <p className="leading-3  mx-6 cursor-pointer">Tài liệu</p>
        </li>
        </Link>

        <Link to='/show-all-blog'>
        <li className="mt-2 border-b-[1px] relative my-4 border-[#ccc] border-solid py-2 px-1 hover:bg-gray-100 transition-all flex align-center">
        <span className="absolute top-[50%] translate-y-[-50%]">
            <HiOutlineDocumentDuplicate className="text-[#FF9138]"/>
          </span>{" "}
          <p className="leading-3  mx-6 cursor-pointer">Bài viết</p>
        </li>
        </Link>
        <Link to='/profile'>
        <li className="mt-2 border-b-[1px] relative my-4 border-[#ccc] border-solid py-2 px-1 hover:bg-gray-100 transition-all flex align-center">
        <span className="absolute top-[50%] translate-y-[-50%]">
            <CgProfile className="text-[#FF9138]"/>
          </span>{" "}
          <p className="leading-3  mx-6 cursor-pointer">Hồ sơ</p>
        </li>
        </Link>
        <li className="mt-2 border-b-[1px] relative my-4 border-[#ccc] border-solid py-2 px-1 hover:bg-gray-100 transition-all flex align-center" onClick={handleRequestBook}>
        <span className="absolute top-[50%] translate-y-[-50%]">
            <MdOutlineFavoriteBorder className="text-[#FF9138]"/>
          </span>{" "}
          <p className="leading-3  mx-6 cursor-pointer">Yêu cầu sách mới</p>
        </li>
      </ul>
        <h1 className="bg-sky-500 rounded-t-lg p-2 text-white relative bottom-[-10px]">sách xem nhiều</h1>
      <ul className="border-[1px] border-solid border-[#A0CED9] rounded-lg p-2">
        {
          book.slice(0,15).map((item: any) => (
          <Link key={item._id} to={`/${item._id}`}>
            <li className="text-sm py-2 hover:bg-slate-200 cursor-pointer" >
              {item.name}
             <p className="text-xs text text-green-500"> {item.author}</p>
              </li>
              </Link>
          ))
        }
      </ul>

      {/* <Tree value={itemData} selectionMode="single" selectionKeys={selectedKey} 
    onSelectionChange={(e:any) => setSelectedKey(e.value)} className="w-full md:w-30rem border-none p-0" /> */}
    </div>
  )
}

export default SideBar
