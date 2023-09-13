import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { DispatchType } from "../../../redux/store"
import { createPenalty, getAllBorrowBook, updateStatusBorrowBook } from "../../../redux/reducer/book"
import { InputTextarea } from "primereact/inputtextarea";

const FormPenalty= ({item}: any) => {

  const [value, setValue] = useState('')
  const [value2, setValue2] = useState('')

  const dispatch:DispatchType = useDispatch()
  const handleSubmit = async () => {
    const action = {
      bookId: item?.bookId?._id,
      userId: item?.userId?._id,
      reason: value,
      requireRecover: value2
    }
   await dispatch(createPenalty(action))
  }
  return (
    <div className="col-12 md:col-4 flex flex-col">
        <label className="font-bold" htmlFor="">Lý do</label>
      <InputTextarea value={value} onChange={(e) => setValue(e.target.value)} rows={3} cols={50} />
      <label className="font-bold" htmlFor="">Hình thức xử lý</label>
      <InputTextarea value={value2} onChange={(e) => setValue2(e.target.value)} rows={3} cols={50} />
      <Button label="Xac nhận" className="my-4"severity="warning" outlined onClick={handleSubmit}/>

    </div>
  )
}

export default FormPenalty
