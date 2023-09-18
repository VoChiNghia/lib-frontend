import React, { useRef, useState, useTransition } from "react";
import "./homeAdmin.scss";
import ButtonSolid from "../../component/button/ButtonSolid";
import { CiLogout } from "react-icons/ci";
import { BsUiRadiosGrid, BsBook } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { PiKeyReturnLight, PiMicrosoftExcelLogo } from "react-icons/pi";
import Dashboard from "../../component/addminTabs/dashboard/Dashboard";
import { history } from "../../component/Layout";
import { TOKEN, USER } from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/store";
import { logout } from "../../redux/reducer/auth";
import BookManage from "../../component/addminTabs/bookManage/BookManage";
import Header from "../../component/header/Header";
import Loading from "../../component/loading/Loading";
import UserManage from "../../component/addminTabs/userManage/UserManage";
import AddBlog from "../../component/form/wyswyg/AddBlog";
import FormAddBlog from "../../component/form/formAddBlog/FormAddBlog";
import BookBorrow from "../../component/addminTabs/bookBorrow/BookBorrow";
import { changeComponent } from "../../redux/reducer/compoentGlobal";
import BlogManage from "../../component/addminTabs/blogManage/BlogManage";
const logo1 = require("../../assets/images/icon-3.webp");

interface StrategyType {
  dashboard:JSX.Element
  bookManage:JSX.Element
  userManage:JSX.Element
  createBlog:JSX.Element
  bookBorrow:JSX.Element
}
const strategy: StrategyType = {
  dashboard: <Dashboard />,
  bookManage: <BookManage />,
  userManage: <UserManage />,
  createBlog: <BlogManage />,
  bookBorrow:<BookBorrow/>
} 

const HomeAdmin = () => {
  const login = localStorage.getItem(USER)
  const [isPending, startTransition] = useTransition();
  const { component } = useSelector((state: RootState) => state.compoentGlobal)

  
  // const [component, setcomponent] = useState<JSX.Element>(strategy.dashboard)

  const ref = useRef<any[]>([]);

  const pushRef = (el: any) => ref.current.push(el!);

  const dispatch:DispatchType = useDispatch()

  const handleClickItem = (e: any, type: any) => {
    ref.current.forEach((el: any) => el?.classList?.remove("active"));
    e?.currentTarget?.classList?.add("active");
    dispatch(changeComponent(strategy[type as keyof  StrategyType]))

  };

  return (
    <div className="home bg-[#ccc]">
      <div className="home-container container">
        <div className="home-container__left-side">
          <div className="home-container__left-side__logo">
            <img src={logo1} alt="" />
          </div>
          <ul className="home-container__left-side__list">
            <li
              ref={pushRef}
              className="home-container__left-side__list-item active"
              onClick={(e) => handleClickItem(e,'dashboard')}
            >
              <div>
                <span>
                  <BsUiRadiosGrid />
                </span>{" "}
                DashBoard
              </div>
            </li>
            <li
              ref={pushRef}
              className="home-container__left-side__list-item"
              onClick={(e) => handleClickItem(e,'bookManage')}
            >
              <div>
                <span>
                  <BsBook />
                </span>{" "}
                Quản Lý Sách
              </div>
            </li>
            <li
              ref={pushRef}
              className="home-container__left-side__list-item "
              onClick={(e) => handleClickItem(e,'userManage')}
            >
              <div>
                <span>
                  <AiOutlineUsergroupAdd />
                </span>{" "}
                Quản Người Dùng
              </div>
            </li>
            <li
              ref={pushRef}
              className="home-container__left-side__list-item"
              onClick={(e) => handleClickItem(e,'bookBorrow')}
            >
              <div>
                <span>
                  <PiKeyReturnLight />
                </span>{" "}
                Quản Lý Mươn & Trả
              </div>
            </li>
            <li
              ref={pushRef}
              className="home-container__left-side__list-item"
              onClick={(e) => handleClickItem(e,'bookBorrow')}
            >
              <div>
                <span>
                  <PiMicrosoftExcelLogo />
                </span>{" "}
                Thống kê
              </div>
            </li>
            <li
              ref={pushRef}
              className="home-container__left-side__list-item"
              onClick={(e) => handleClickItem(e,'createBlog')}
            >
              <div>
                <span>
                  <PiMicrosoftExcelLogo />
                </span>{" "}
                Tạo bài viết
              </div>
            </li>
          </ul>
        </div>
        <div className="home-container__right-side">
          <div className="home-container__right-side__head">
            <Header/>
          </div>
       
          {isPending ? <Loading/> : component}
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
