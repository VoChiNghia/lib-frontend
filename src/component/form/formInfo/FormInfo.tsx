import { Button } from "primereact/button"
import { Toast } from "primereact/toast"
import React, { useRef } from "react"

const FormInfo = ({ jsx }: any) => {
  const toast = useRef<any>(null)

  const showWarn = () => {
    toast.current.show({ severity: "warn", summary: "Thông báo", detail: "Không Tìm thấy file pdf", life: 3000 })
  }
  return (
    <div className="flex ">
      <Toast ref={toast} />
      <img className="w-32 mx-4" src={jsx.image} alt="" />
      <div className="">
        <h1 className="text-xl">
          <span className="font-bold">Tên môn học:</span> {jsx.tenMonHoc}
        </h1>
        <h1 className="text-xl">
          <span className="font-bold">Tên khoa:</span> {jsx.tenKhoa}
        </h1>
        <h1 className="text-xl">
          <span className="font-bold">Giáo viên:</span> {jsx.giaovien}
        </h1>
        <div
          className="w-full my-4"
          onClick={(e) => {
            e.preventDefault()
            const pdfLink = jsx?.filePdf
            if (pdfLink) {
              window.open(pdfLink, "_blank")
            } else {
              showWarn()
            }
          }}
        >
          <Button className="w-full" label="Pdf" outlined />
        </div>
      </div>
    </div>
  )
}

export default FormInfo
