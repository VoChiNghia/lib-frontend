import React, { useEffect, useState } from "react"
import LoginForm from "../pages/loginForm/LoginForm"
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from "react-router-dom"
import HomeAdmin from "../pages/homeAdmin/HomeAdmin"
import Home from "../pages/home/Home"
import { createBrowserHistory } from "@remix-run/router"
import DetailBook from "../pages/detail/DetailBook"
import { USER } from "../config/axios"
import ListBookBorrow from "../pages/listBookBorrow/ListBookBorrow"
import BlogDetail from "../pages/blogDetail/BlogDetail"
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import RegisterForm from "../pages/registerForm/RegisterForm"
import 'primeicons/primeicons.css';
import ConfirmationLink from "../pages/confirmation/Confirmation"
import VerifyTocken from "../pages/verify/VerifyTocken"
import ShowAllBook from "../pages/showAllBook/ShowAllBook"
import ShowAllFile from "../pages/showAllFile/ShowAllFile"
import Profile from "../pages/profile/Profile"

export const history = createBrowserHistory({ v5Compat: true })
const Layout = () => {
  const {user} = useSelector((state: RootState) => state.authSlice)
  const [userRole, setUserRole] = useState<any>(JSON.parse(localStorage.getItem(USER) as string) ?? '');
  console.log(userRole)
  useEffect(() => {
    const handleStorageChange = (e: any) => {
      if (e.key === USER) {
        // Cập nhật state userRole khi localStorage thay đổi
        setUserRole(localStorage.getItem(USER));
      }
    };

    // Đăng ký sự kiện khi component được gắn lên DOM
    window.addEventListener('storage', handleStorageChange);

    // Hủy đăng ký sự kiện khi component bị unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  return (
    <HistoryRouter history={history}>
      <Routes>
        {/* login as user account */}
        <Route path="/register-form" element={!userRole?.role ? <RegisterForm /> : <Navigate to="/" replace={true} />}></Route>
        <Route path="/login-form" element={!userRole?.role ? <LoginForm /> : <Navigate to="/" replace={true} />}></Route>
        <Route path="/login" element={!userRole?.role ? <LoginForm /> : <Navigate to="/" replace={true} />}></Route>
        <Route path="/confirmation" element={<ConfirmationLink/>}></Route>
        <Route path="/show-all-book" element={<ShowAllBook/>}></Route>
        <Route path="/show-all-file" element={<ShowAllFile/>}></Route>
        <Route index path="/:id" element={userRole?.role || user?.role === "user" ? <DetailBook /> : <Navigate to="/login-form" replace={true} />}></Route>
        <Route index path="/list-book-borrow/:id" element={userRole?.role || user?.role === "user" ? <ListBookBorrow /> : <Navigate to="/login-form" replace={true} />}></Route>
        <Route index path="/blog/:id" element={<BlogDetail/>}></Route>
        <Route index path="/file/:id" element={<BlogDetail/>}></Route>
        <Route index path="/profile" element={<Profile/>}></Route>
        <Route index path="/auth/:token" element={<VerifyTocken/>}></Route>
        <Route index path="/admin" element={userRole?.role || user?.role === "admin" ? <HomeAdmin /> :   <Navigate to="/login-form" replace={true} />}></Route>
        <Route index path="/" element={userRole?.role || user?.role === "user" ? <Home /> : <Navigate to="/login-form" replace={true} />}></Route>
      </Routes>
    </HistoryRouter>
  )
}

export default Layout
