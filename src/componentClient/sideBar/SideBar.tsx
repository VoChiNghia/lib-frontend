import React, { useState } from "react"
import { BiBookOpen } from "react-icons/bi"
import { Link } from "react-router-dom"
import { Tree } from 'primereact/tree';
import { changeComponent, setIsOpenCompoent } from "../../redux/reducer/modal";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import RequestBook from "../../component/form/formAddRequestBook/FormAddRequestBook";
const SideBar = () => {
  const [selectedKey, setSelectedKey] = useState('');
  const dispatch: DispatchType = useDispatch()
  const { requestBook } = useSelector((state: RootState) => state.requestBook)
  
  const handleRequestBook = () => {
    dispatch(changeComponent(<RequestBook />))
    dispatch(setIsOpenCompoent(true))
  }


  return (
    <div>
      <h1 className="bg-[#FF9138] text-white p-2 font-bold">Danh mục</h1>
      <ul className="mt-4">
      <Link to='/'>
        <li className="mt-2 border-b-[1px] my-4 border-[#ccc] border-solid py-2 px-1 hover:bg-gray-100 transition-all flex align-center">
          <span>
            <BiBookOpen className="text-[#FF9138]"/>
          </span>{" "}
          <p className="leading-3 font-bold mx-2 cursor-pointer">Trang chủ</p>
        
        </li>
        </Link>
        <Link to='/show-all-book'>
        <li className="mt-2 border-b-[1px] my-4 border-[#ccc] border-solid py-2 px-1 hover:bg-gray-100 transition-all flex align-center">
          <span>
            <BiBookOpen className="text-[#FF9138]"/>
          </span>{" "}
          <p className="leading-3 font-bold mx-2 cursor-pointer">Sách</p>
        
        </li>
        </Link>
        <Link to='/show-all-file'>
        <li className="mt-2 border-b-[1px] my-4 border-[#ccc] border-solid py-2 px-1 hover:bg-gray-100 transition-all flex align-center">
        <span>
            <BiBookOpen className="text-[#FF9138]"/>
          </span>{" "}
          <p className="leading-3 font-bold mx-2 cursor-pointer">Tài liệu</p>
        </li>
        </Link>
        <Link to='/profile'>
        <li className="mt-2 border-b-[1px] my-4 border-[#ccc] border-solid py-2 px-1 hover:bg-gray-100 transition-all flex align-center">
        <span>
            <BiBookOpen className="text-[#FF9138]"/>
          </span>{" "}
          <p className="leading-3 font-bold mx-2 cursor-pointer">Hồ sơ</p>
        </li>
        </Link>
        <li className="mt-2 border-b-[1px] my-4 border-[#ccc] border-solid py-2 px-1 hover:bg-gray-100 transition-all flex align-center" onClick={handleRequestBook}>
        <span>
            <BiBookOpen className="text-[#FF9138]"/>
          </span>{" "}
          <p className="leading-3 font-bold mx-2 cursor-pointer">Yêu cầu sách mới</p>
        </li>
      </ul>

      {/* <Tree value={itemData} selectionMode="single" selectionKeys={selectedKey} 
    onSelectionChange={(e:any) => setSelectedKey(e.value)} className="w-full md:w-30rem border-none p-0" /> */}
    </div>
  )
}

export default SideBar
