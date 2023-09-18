import React, { useRef } from "react"
import Layout from "./component/Layout"
import Modal from "./component/modal/Modal"
import { ToastContainer } from "react-toastify"
import "./index.css"
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from "primereact/toast"
import { useSelector } from "react-redux"
import { RootState } from "./redux/store"
import ToastComponent from "./component/Toast"

function App() {

  return (
    <>
      <Layout />
      <Modal />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="light"
      />

    </>
  )
}
export default App
