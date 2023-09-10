import React from "react"
import { BiBookOpen } from "react-icons/bi"
const SideBar = () => {
  return (
    <div>
      <h1 className="bg-[#FF9138] text-white p-2 font-bold">Category</h1>
      <ul className="mt-4">
        <li className="mt-2 border-b-[1px] border-[#ccc] border-solid py-2 px-1 hover:bg-gray-100 transition-all flex align-center">
          <span>
            <BiBookOpen className="text-[#FF9138]"/>
          </span>{" "}
          <p className="leading-3 font-bold mx-2 cursor-pointer">Book</p>
        </li>
        <li className="mt-2 border-b-[1px] border-[#ccc] border-solid py-2 px-1 hover:bg-gray-100 transition-all flex align-center">
        <span>
            <BiBookOpen className="text-[#FF9138]"/>
          </span>{" "}
          <p className="leading-3 font-bold mx-2 cursor-pointer">File</p>
        </li>
      </ul>
    </div>
  )
}

export default SideBar
