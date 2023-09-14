import React, { useEffect, useState } from 'react'
import Header from '../../componentClient/header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/store';
import { getAllBook, getAllFile } from '../../redux/reducer/book';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

const ShowAllFile = () => {
    const { allFile } = useSelector((state: RootState) => state.book);
    const [selectedCity, setSelectedCity] = useState<any>(null)
    console.log(allFile)
  const dispatch: DispatchType = useDispatch()
console.log(allFile)

const Khoa = [
  {value:'cntt',name:'công nghệ thông tin'},
  {value:'kt',name:'Kinh tế'},
  {value:'dl',name:'Du lịch'},
  {value:'ck',name:'Cơ khí'},
  {value:'cdt',name:'Cơ Điện tử'},
]
    const getAllBookApi = () => {
        dispatch(getAllBook(''));
        dispatch(getAllFile())
      };
      useEffect(() => {
        getAllBookApi();
      }, []);

      const clearFilter = () => {
        setSelectedCity(null)
      }
  return (
    <div className="w-[1200px] mx-auto">
        <div><Header/></div>
        <div className="w-56">
        <div>
        <label className="font-bold">Lọc theo thể loại</label>
        <Dropdown
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.value)}
          options={Khoa}
          optionLabel="name"
          placeholder="Chọn thể loại"
          className="w-full md:w-14rem"
        />
        </div>
        <Button label="Xóa filter" severity="info" outlined onClick={clearFilter} className="my-2"/>
      </div>
        <div className='my-4 grid grid-cols-4 gap-4'>
        {
                allFile?.map((blog: any,index: any) => (
                  <div className="w-64 h-[400px] mx-2 flex flex-col justify-between">
                    <img className="w-64" src={blog.image} alt="" />
                    <p className="font-bold text-xl text-center">{blog.tenMonHoc.toUpperCase()}</p>
                    <a href={blog.filePdf} target="_blank" rel="noopener noreferrer" className='text-center'>
                    <Button label="Tải file" severity="info" outlined className=''/>
                    </a>
                  </div>
                  
                  ))
              }
        </div>
    </div>
  )
}

export default ShowAllFile