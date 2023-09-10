import React from "react";
import Layout from "./component/Layout";
import Modal from "./component/modal/Modal";
import { ToastContainer } from "react-toastify";
import './index.css'
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Layout />
      <Modal />
      <ToastContainer
        position="top-center"
        autoClose={1000}
      />
    </>
  );
}
export default App;
