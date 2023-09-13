import { Button } from "primereact/button"
import { ListBox } from 'primereact/listbox';
import { useDispatch } from "react-redux"
import { DispatchType } from "../../../redux/store"
import { getAllBorrowBook, updateStatusBorrowBook } from "../../../redux/reducer/book"
import { useState } from "react";

const FormApprove = ({id}: any) => {
  const [selectedCity, setSelectedCity] = useState(null)
  const cities = [
    { value: "Approve", name: "Chấp nhận" },
    { value: "Due", name: "Quá hạn" },
    { value: "Pending", name: "Đang chờ" },
    { value: "Returned", name: "Đã trả" },
    { value: "Borrowed", name: "Đã mượn" },

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
    <div className="col-12 md:col-4 w-56">
        <ListBox value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" className="w-full md:w-14rem my-2" />
        <div className="text-center my-3">
        <Button label="Xác nhận" raised onClick={handleUpdateStatus}/>
        </div>
    </div>
  )
}

export default FormApprove
