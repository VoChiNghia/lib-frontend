import React, { useState } from "react"
import { BiBookOpen } from "react-icons/bi"
import { Link } from "react-router-dom"
import { Tree } from 'primereact/tree';
const SideBar = () => {
  const [selectedKey, setSelectedKey] = useState('');
  const itemData = [
    {
      key: '0',
      label: 'Book',
      data: 'Documents Folder',
      icon: 'pi pi-fw pi-inbox',
      children: [
          {
              key: '0-0',
              label: 'Work',
              data: 'Work Folder',
              icon: 'pi pi-fw pi-cog',
              children: [
                  { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                  { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
              ]
          },
          {
              key: '0-1',
              label: 'Home',
              data: 'Home Folder',
              icon: 'pi pi-fw pi-home',
              children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
          }
      ]
  }
  ]

  console.log(selectedKey)
  return (
    <div>
      <h1 className="bg-[#FF9138] text-white p-2 font-bold">Category</h1>
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
      </ul>

      {/* <Tree value={itemData} selectionMode="single" selectionKeys={selectedKey} 
    onSelectionChange={(e:any) => setSelectedKey(e.value)} className="w-full md:w-30rem border-none p-0" /> */}
    </div>
  )
}

export default SideBar
