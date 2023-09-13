import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import { InputText } from "primereact/inputtext"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { DispatchType } from "../../../redux/store"
import { getAllBorrowBook, updateStatusBorrowBook } from "../../../redux/reducer/book"

const FormApprove = ({id}: any) => {
  const [selectedCity, setSelectedCity] = useState(null)
  const cities = [
    { name: "Approve", value: "approve" },
    { name: "Due", value: "due" },
    { name: "Pending", value: "pending" },
    { name: "Returned", value: "returned" },
    { name: "Borrowed", value: "borrowed" },

  ]
  const dispatch:DispatchType = useDispatch()
  const handleUpdateStatus = async () => {
    const action = {
      id: id,
      status: selectedCity
    }
   await dispatch(updateStatusBorrowBook(action))
   await dispatch(getAllBorrowBook())
  }
  return (
    <div className="col-12 md:col-4">
      <div className="p-inputgroup">
        <Dropdown
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.value)}
          options={cities}
          optionLabel="name"
          placeholder="Tìm kiếm theo"
          className="w-full md:w-14rem"
        />
        <Button icon="pi pi-search" className="p-button-warning" onClick={handleUpdateStatus} />
      </div>
    </div>
  )
}

export default FormApprove
