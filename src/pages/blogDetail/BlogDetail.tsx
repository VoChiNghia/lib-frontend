import React, { useEffect } from 'react'
import { getAllBlog, getBlogDetail } from '../../redux/reducer/book';
import { DispatchType, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../componentClient/header/Header';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
    const dispatch: DispatchType = useDispatch()
  const { blogDetail } = useSelector((state: RootState) => state.book);
  const { id } = useParams()
  console.log(blogDetail)
  const getAllBookApi = () => {
    dispatch(getBlogDetail(id))
  };
  useEffect(() => {
    getAllBookApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-[1200px] mx-auto">
     <div>
      <Header/>
     </div>

     <div className='my-10'>
      <h1 className='font-bold text-4xl my-10'>{blogDetail?.title}</h1>
      <div dangerouslySetInnerHTML={{__html: blogDetail?.content}} />
     </div>
    </div>
  )
}

export default BlogDetail