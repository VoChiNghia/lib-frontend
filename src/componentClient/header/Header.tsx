import React, { useEffect, useRef, useState } from "react"
import "./index.scss"
import Search from "../../component/search/Search"
import ButtonSolid from "../../component/button/ButtonSolid"
import { Link } from "react-router-dom"
import { USER } from "../../config/axios"
import { AiOutlineMenu } from "react-icons/ai"
import { history } from "../../component/Layout"
import { Button } from "primereact/button"
import { changeComponent, setIsOpenCompoent } from "../../redux/reducer/modal"
import { DispatchType } from "../../redux/store"
import { useDispatch } from "react-redux"
import ChangePassword from "../../component/form/formChangePass/ChangePass"
const logo = require("../../assets/images/icon-3.webp")
const Header = () => {
  const [user, setUser] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch: DispatchType = useDispatch()
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
  };
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleChangePass = () => {
    dispatch(changeComponent(<ChangePassword />))
    dispatch(setIsOpenCompoent(true))
  }

  return (
    <div className={`headerClient w-[1280px] ${scrolling ? 'fixed-header' : ''}`}>
      <div className="headerClient__left">
        <div className="headerClient__left__logo">
          <Link to="/"><img src={logo} alt="" /></Link>
          <div className="headerClient__left__logo-info">
            <p>Hệ thống thư viện trường</p>
            <h2>Cao đẳng công nghệ cao đồng an</h2>
          </div>
        </div>
      </div>

      <div className="headerClient__center">
        <Search />
      </div>
      <div className="headerClient__right">
        {user ? (
          <div className="headerClient__right-btn ">
            <div className="flex items-center">
              <p className="font-bold mx-2"> Xin Chào: {user?.name}</p>
              <p><Button icon="pi pi-bell" rounded text severity="warning" aria-label="Notification" /></p>
              <div className="relative" ref={dropdownRef}>
              <p
                className="hover:scale-105 "
                onClick={toggleDropdown}
              >
                <span>
                <Button icon="pi pi-bars" rounded text raised severity="warning" aria-label="Notification" />
                </span>
              </p>
                {isOpen && (
                  <div className="absolute right-[-100%] mt-2 z-20 bg-white shadow-lg rounded w-64 drop-shadow">
                    <ul className="py-1">
                      <Link to={`/list-book-borrow/${user._id}`}><li className="px-4 py-2 hover:bg-gray-100">Danh sách sách đăng kí mượn</li></Link>
                      <Link to={`/list-book-favorite/${user._id}`}><li className="px-4 py-2 hover:bg-gray-100">Danh sách yêu thích</li></Link>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleChangePass}>Đổi mật khẩu</li>
                      <li className="px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>Đăng xuất</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="headerClient__right-btn">
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