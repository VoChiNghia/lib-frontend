import React, { useEffect, useState } from "react"
import Header from "../../componentClient/header/Header"
import { useDispatch, useSelector } from "react-redux"
import { DispatchType, RootState } from "../../redux/store"
import { getAllBook, getAllFile } from "../../redux/reducer/book"
import { Button } from "primereact/button"
import { Dropdown } from "primereact/dropdown"
import Footer from "../../componentClient/footer/Footer"
import { changeComponent, setIsOpenCompoent } from "../../redux/reducer/modal"
import FormInfo from "../../component/form/formInfo/FormInfo"
import { Tooltip } from "primereact/tooltip"
const ShowAllFile = () => {
  const { allFile } = useSelector((state: RootState) => state.book)
  const [selectedCity, setSelectedCity] = useState<any>(null)
  const dispatch: DispatchType = useDispatch()
console.log(selectedCity)
  const Khoa = [
    { value: "Công nghệ thông tin", name: "Công nghệ thông tin" },
    { value: "Kinh tế", name: "Kinh tế" },
    { value: "Du lịch", name: "Du lịch" },
    { value: "Cơ khí", name: "Cơ khí" },
    { value: "Cơ Điện tử", name: "Cơ Điện tử" },
  ]
  const getAllBookApi = () => {
    dispatch(getAllBook(""))
    dispatch(getAllFile())
  }
  useEffect(() => {
    getAllBookApi()
  }, [])

  const clearFilter = () => {
    setSelectedCity(null)
  }
  const handleClick = (item: any) => {
    dispatch(changeComponent(<FormInfo jsx={item} />))
    dispatch(setIsOpenCompoent(true))
  }
  return (
    <div>
      <div className="w-[1200px] mx-auto min-h-[90vh]">
        <div>
          <Header />
        </div>
        <div className="w-56">
          <div>
            <label className="font-bold">Lọc theo khoa</label>
            <Dropdown
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.value)}
              options={Khoa}
              optionLabel="name"
              placeholder="Chọn thể loại"
              className="w-full md:w-14rem"
            />
          </div>
          <Button label="Xóa filter" severity="info" outlined onClick={clearFilter} className="my-2" />
        </div>
        <div className="my-4 grid grid-cols-4 gap-4 gap-y-12">
          {selectedCity 
          ? allFile
              ?.filter((x: any) => x?.tenKhoa?.includes(selectedCity))
              ?.map((blog: any, index: any) => (
            <div className="w-64 h-[400px] mx-2 flex flex-col justify-between">
              {/* <img className="w-64" src={blog.image} alt="" />
                    <p className="font-bold text-xl text-center">{blog.tenMonHoc.toUpperCase()}</p>
                    <a href={blog.filePdf} target="_blank" rel="noopener noreferrer" className='text-center'>
                    <Button label="Tải file" severity="info" outlined className=''/>
                    </a> */}
              <div
                className="wrapper bg-gray-400 antialiased text-gray-900 shadow-2xl"
                onClick={() => handleClick(blog)}
              >
                <div>
                  <img
                    src={blog.image}
                    alt=" random imgee"
                    className="w-full object-cover object-center rounded-lg shadow-md"
                  />
                  <div className="relative px-4 -mt-16  ">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <Tooltip target=".custom-tooltip-btn">
                        <span >{blog.tenMonHoc.toUpperCase()}</span>
                      </Tooltip>
                      <h4
                        className="custom-tooltip-btn mt-1 text-xl font-semibold uppercase leading-tight truncate cursor-pointer"
                      >
                        {blog.tenMonHoc.toUpperCase()}
                      </h4>

                      <div className="mt-4">
                        <span className="text-teal-600 text-md font-semibold">4/5 ratings </span>
                        <span className="text-sm text-gray-600">(based on 234 ratings)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
          ) 
          :  allFile
          ?.map((blog: any, index: any) => (
        <div className="w-64 h-[400px] mx-2 flex flex-col justify-between">
          {/* <img className="w-64" src={blog.image} alt="" />
                <p className="font-bold text-xl text-center">{blog.tenMonHoc.toUpperCase()}</p>
                <a href={blog.filePdf} target="_blank" rel="noopener noreferrer" className='text-center'>
                <Button label="Tải file" severity="info" outlined className=''/>
                </a> */}
          <div
            className="wrapper bg-gray-400 antialiased text-gray-900 shadow-2xl"
            onClick={() => handleClick(blog)}
          >
            <div>
              <img
                src={blog.image}
                alt=" random imgee"
                className="w-full object-cover object-center rounded-lg shadow-md"
              />
              <div className="relative px-4 -mt-16  ">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <Tooltip target=".custom-tooltip-btn">
                    <span >{blog.tenMonHoc.toUpperCase()}</span>
                  </Tooltip>
                  <h4
                    className="custom-tooltip-btn mt-1 text-xl font-semibold uppercase leading-tight truncate cursor-pointer"
                  >
                    {blog.tenMonHoc.toUpperCase()}
                  </h4>

                  <div className="mt-4">
                    <span className="text-teal-600 text-md font-semibold">4/5 ratings </span>
                    <span className="text-sm text-gray-600">(based on 234 ratings)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      ) 
        }

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ShowAllFile
