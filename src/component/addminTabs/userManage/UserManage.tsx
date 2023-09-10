import React, { useEffect,useState } from "react";
import "./bookManage.scss";
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
import { deleteBook } from "../../../redux/reducer/book";
import { DispatchType, RootState } from "../../../redux/store";
import { getAllCategory } from "../../../redux/reducer/category";
import UploadCoverImage from "../../form/formUpdateCoverBook";
import { LIMIT } from "../../../constant";
import { deleteUser, getAllUser } from "../../../redux/reducer/user";
import UpdateUser from "../../form/formAddUpdateUser/updateUser";
import { ConfirmDialog } from "primereact/confirmdialog";
import Confirmation from "../../confirmation/Confirmation";
const UserManage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [visible, setVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [actionData, setActionData] = useState(null);
  const query = {
    limit: LIMIT,
    page: currentPage,
  }
  console.log(user)
  //const totalPage = Math.floor(totalBooks / LIMIT)
  const dispatch: DispatchType = useDispatch();
  
  const getAllUserApi = () => {
    dispatch(getAllUser());
  };
  useEffect(() => {
    getAllUserApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const hanldeEdit = (item: any) => {
    dispatch(changeComponent(<UpdateUser value={item} />));
    dispatch(setIsOpenCompoent(true));
  };
  const hanldeDelete = (id: any) => {
    dispatch(deleteUser(id))
  };

  const accept = async () => {
    setVisible(false);
    if(type === 'delete') hanldeDelete(actionData)
    

  };

  const reject = () => {
    // Xử lý khi người dùng từ chối xác nhận hoặc đóng hộp thoại
    setVisible(false);
  };

  return (
    <div className="book__manage">
      <h1>Danh sách hiện có</h1>
      <div className="book__manage__control">
        <div className="book__manage__control-btn">
          {/* <ButtonSolid text="Thêm sách" onSubmit={handleSubmit} outline /> */}
        </div>
        <div className="book__manage__control-field">
          <Select
            options={[{ value: 1, label: "2" }]}
            selectedOption="1"
            onSelect={() => {}}
          />
          <Search />
        </div>
      </div>
      
      <div className="book__manage__wrapper">
        <table className="book__manage__wrapper__list__book">
          <thead className="book__manage__wrapper__list__book-header">
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Mail</th>
              <th>Address</th>
              <th>Số điện thoại</th>
              <th>Phân quyền</th>
              <th>Sách mượn</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="book__manage__wrapper__list__book-body">
            {user?.map((item: any,index: number) => (
              <tr key={index} className="book__manage__wrapper__list__book-body__row">
                <td className="book__manage__wrapper__list__book-body__row-item">
                  {index + 1}
                </td>
                <td className="book__manage__wrapper__list__book-body__row-item">
                  {item.name}
                </td>
                <td className="book__manage__wrapper__list__book-body__row-item">
                  {item.email}
                </td>
                <td className="book__manage__wrapper__list__book-body__row-item">
                  {item.address}
                </td>
                <td className="book__manage__wrapper__list__book-body__row-item">
                  {item.phoneNumber}
                </td>
                <td className="book__manage__wrapper__list__book-body__row-item">
                  {item.role}
                </td>
                <td className="book__manage__wrapper__list__book-body__row-item">
                  {item.borrowedBook}
                </td>
                
                <td className="book__manage__wrapper__list__book-body__row-item">
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
              {/* {totalPage === 0 ? null : <Pagination totalPage={totalPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />} */}
      </div>
      <ConfirmDialog
        visible={visible}
        onHide={reject}
        message="Bạn muốn thực hiện hành động Xóa?"
        header="Xác nhận Xóa"
        icon="pi pi-info-circle"
        accept={accept}
        reject={reject}
      />
    </div>
  );
};

export default UserManage;
