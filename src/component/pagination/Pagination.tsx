import React from 'react'
import './pagination.scss'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import Loading from '../loading/Loading';
interface PaginationProps {
  setCurrentPage: (num: number) => void;
  currentPage: number;
  totalPage: number
}
const Pagination = ({setCurrentPage, currentPage, totalPage}: PaginationProps) => {
    const handleNextPage = (controll: boolean) => {
      if(controll) {
        currentPage !== totalPage ? setCurrentPage(currentPage++) : setCurrentPage(1)    
      }
      currentPage === 1 ?  setCurrentPage(1) : setCurrentPage(currentPage--)
      
     }

     const handleClick = (page: number) => {
      setCurrentPage(page)
     }
  return (
    <div className="pagination">
      {totalPage 
      ? <ul className='pagination__list'>
        <div className="pagination__list__item" onClick={() => handleNextPage(false)}><FiChevronsLeft/></div>
        {Array(totalPage).fill(1).map((page:number, index: number) => (
         <li className={`pagination__list__item ${index + 1 === currentPage ? 'active' : ''}`} key={index} onClick={() => handleClick(index + 1)}>{index + 1}</li>
        ))}
        <div className="pagination__list__item" onClick={() => handleNextPage(true)}> <FiChevronsRight/></div>
       
      </ul>
      : <p>Loadding ...</p>
      }
    </div>
  )
}

export default Pagination