import React, { useEffect, useRef, useState } from "react"
import "./header.scss"
import Search from "../../component/search/Search"
import ButtonSolid from "../../component/button/ButtonSolid"
import { Link } from "react-router-dom"
import { USER } from "../../config/axios"
import { AiOutlineMenu } from "react-icons/ai"
import { history } from "../../component/Layout"
const logo = require("../../assets/images/icon-3.webp")
const Header = () => {
  const [user, setUser] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null);

  function useClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void) {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
  
    useEffect(() => {
      document.addEventListener('click', handleClick);
  
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, []);
  }

  useEffect(() => {
   
    const storedUser = localStorage.getItem(USER)
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
    }
  }, []);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
   localStorage.clear();
   history.push('/login-form')
   window.location.reload()
  };

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__left__logo">
          <Link to="/"><img src={logo} alt="" /></Link>
          <div className="header__left__logo-info">
            <p>Hệ thống thư viện trường</p>
            <h2>Cao đẳng công nghệ cao đồng an</h2>
          </div>
        </div>
      </div>

      <div className="header__center">
        <Search />
      </div>
      <div className="header__right">
        {user ? (
          <div className="header__right-btn ">
            <div className="flex items-center">
              <p className="font-bold mx-2"> Xin Chào: {user?.name}</p>
              
              <div className="relative" ref={dropdownRef}>
              <p
                className="hover:scale-105 border-solid border-[1px] border-gray-500 transition-all rounded-lg px-2 py-1 drop-shadow"
                onClick={toggleDropdown}
              >
                <span>
                  <AiOutlineMenu />
                </span>
              </p>
                {isOpen && (
                  <div className="absolute mt-2 bg-white shadow-lg rounded z-20 w-64 drop-shadow">
                    <ul className="py-1">
                      <Link to={`/list-book-borrow/${user._id}`}><li className="px-4 py-2 hover:bg-gray-100">Danh sách sách đăng kí mượn</li></Link>
                      <li className="px-4 py-2 hover:bg-gray-100">Danh sách yêu thích</li>
                      <li className="px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>Đăng xuất</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="header__right-btn">
            <Link to="/login">
              <div>
                <ButtonSolid text="Đăng nhập" onSubmit={() => {}} />
              </div>
            </Link>
            <div>
              <ButtonSolid text="Đăng kí" onSubmit={() => {}} outline />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Header