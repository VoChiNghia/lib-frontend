import { Button } from "primereact/button"
import { ListBox } from 'primereact/listbox';
import { useDispatch } from "react-redux"
import { DispatchType } from "../../../redux/store"
import { getAllBorrowBook, updateStatusBorrowBook } from "../../../redux/reducer/book"
import { useState } from "react";

const FormApprove = ({id}: any) => {
  const [selectedCity, setSelectedCity] = useState<any>(null)
  const cities = [
    { value: "approve", name: "Chấp nhận" },
    { value: "due", name: "Quá hạn" },
    { value: "pending", name: "Đang chờ" },
    { value: "return", name: "Đã trả" },
    { value: "borrowed", name: "Đã mượn" },

  ]
  const dispatch:DispatchType = useDispatch()
  const handleUpdateStatus = async () => {
    const action = {
      id: id,
      status: selectedCity
    }
    if(selectedCity){

      await dispatch(updateStatusBorrowBook(action))
      await dispatch(getAllBorrowBook())
    }
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
