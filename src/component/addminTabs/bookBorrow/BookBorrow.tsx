import React, { useEffect,useRef, useState } from "react";
import "./bookBorrow.scss";
import Select from "../../customSelect/Select";
import ButtonSolid from "../../button/ButtonSolid";
import Search from "../../search/Search";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import {
  changeComponent,
  setIsOpenCompoent,
} from "../../../redux/reducer/modal";
import { useDispatch, useSelector } from "react-redux";
import AddBook from "../../form/formAddBook/AddBook";
import { deleteBook, deleteBookBorrow, getAllBook, getAllBorrowBook, updateStatusBorrowBook } from "../../../redux/reducer/book";
import { DispatchType, RootState } from "../../../redux/store";
import { getAllCategory } from "../../../redux/reducer/category";
import UploadCoverImage from "../../form/formUpdateCoverBook";
import Pagination from "../../pagination/Pagination";
import { LIMIT } from "../../../constant";
import moment from "moment";
import { useParams } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import Confirmation from "../../confirmation/Confirmation";
const BookBorrow = () => {
  const toast = useRef<any>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [actionData, setActionData] = useState(null);
  // const { book, totalBooks } = useSelector((state: RootState) => state.book);
  // const { getListBorrowBook } = useSelector((state: RootState) => state.book)
  // const [currentPage, setCurrentPage] = useState<number>(1)
  // const query = {
  //   limit: LIMIT,
  //   page: currentPage,
  // }
  // console.log(getListBorrowBook)
  // const totalPage = Math.floor(totalBooks / LIMIT)
  // const dispatch: DispatchType = useDispatch();
  
  // const getAllBookApi = () => {
  //   dispatch(getAllBook(query));
  //   dispatch(getAllCategory())
  //   dispatch(getAllBorrowBook())
  // };

  // useEffect(() => {
  //   getAllBookApi()
  // },[])
  


  // const handleSubmit = () => {
  //   dispatch(changeComponent(<AddBook />));
  //   dispatch(setIsOpenCompoent(true));
  // };

  // const hanldeEdit = (item: any) => {
  //   dispatch(changeComponent(<AddBook value={item} />));
  //   dispatch(setIsOpenCompoent(true));
  // };
  // const hanldeDelete = (id: string) => {
  //   dispatch(deleteBook(id))
  // };
  // const updateCoverBook = (id: string) => {
  //   dispatch(changeComponent(<UploadCoverImage idUpdate={id}/>));
  //   dispatch(setIsOpenCompoent(true));
  // }

  const { getListBorrowBook } = useSelector((state: RootState) => state.book)
  const dispatch: DispatchType = useDispatch()

  useEffect(() => {
    dispatch(getAllBorrowBook())
  }, [])

  const hanldeEdit = (item: any) => {}
  const hanldeDelete = (id: any) => {
    dispatch(deleteBookBorrow(id))
    dispatch(getAllBorrowBook())
  }
  const handleSubmit = () => {}
  const handleUpdateStatus = async (item:any) => {
    const action = {
      id: item._id,
      status: 'approved'
    }
   await dispatch(updateStatusBorrowBook(action))
   await dispatch(getAllBorrowBook())
  }

  const accept = async () => {
    setVisible(false);
    if(type === 'update') handleUpdateStatus(actionData)
    if(type === 'delete') hanldeDelete(actionData)
    

  };

  const reject = () => {
    setVisible(false);
  };
  return (
    <div className="book__manage">
      <ConfirmDialog
        visible={visible}
        onHide={reject}
        message="Bạn muốn thực hiện hành động này?"
        header="Xác nhận"
        icon="pi pi-info-circle"
        accept={accept}
        reject={reject}
      />
      <table className="book__manage__wrapper__list__book">
              <thead className="book__manage__wrapper__list__book-header">
                <tr>
                  <th>STT</th>
                  <th>Tên</th>
                  <th>Tên sách</th>
                  <th>Ngày mượn</th>
                  <th>Ngày trả</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="book__manage__wrapper__list__book-body">
                {getListBorrowBook?.map((item: any, index: number) => (
                  <tr key={index} className="book__manage__wrapper__list__book-body__row text-center" >
                    <td className="text-sm p-1">{index + 1}</td>
                    <td className="text-sm p-1">{item?.userId?.name}</td>
                    <td className="text-sm p-1">{item?.bookId?.name}</td>
                    <td className="text-sm p-1">{moment(item?.borrowedDate).format("DD-MM-YYYY")}</td>
                    <td className="text-sm p-1">{moment(item?.returnDate).format("DD-MM-YYYY")}</td>
                    <td className="text-sm p-1">
                     <div className="hover:scale-110" onClick={() =>  {
                      setType('update')
                      setVisible(true)
                      setActionData(item)
                     }}>
                     {item?.status === "due" ? (
                        <p className="bg-red-600 w-20 text-white text-center rounded-xl mx-auto">{item?.status}</p>
                      ) : item?.status === "approved" ?  <p className="bg-green-700 w-20 text-white text-center rounded-xl mx-auto">{item?.status}</p> : (
                        <p className="bg-yellow-600 w-20 text-white text-center rounded-xl mx-auto">{item?.status}</p>
                      )}
                     </div>
                    </td>

                    <td className="text-sm p-1">
                      <button onClick={() => hanldeEdit(item)} className="btn-edit">
                        <span>
                          <AiOutlineEdit />
                        </span>
                      </button>
                      <button onClick={() => {
                        setType('delete')
                      setVisible(true)
                      setActionData(item._id)
                     }} className="btn-delete">
                        <span>
                          <AiOutlineDelete />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
    </div>
  );
};

export default BookBorrow;
