import React, { useEffect } from 'react'
import Header from '../../componentClient/header/Header'
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/store';
import { getAllBook, getAllFile } from '../../redux/reducer/book';
import { Button } from 'primereact/button';

const ShowAllFile = () => {
    const { allFile } = useSelector((state: RootState) => state.book);
  const dispatch: DispatchType = useDispatch()
console.log(allFile)
    const getAllBookApi = () => {
        dispatch(getAllBook(''));
        dispatch(getAllFile())
      };
      useEffect(() => {
        getAllBookApi();
      }, []);
  return (
    <div className="w-[1200px] mx-auto">
        <div><Header/></div>
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