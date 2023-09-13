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
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tooltip } from 'primereact/tooltip';
import { Button } from "primereact/button";
import { exportToExcel } from "../../../utilities/u";
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

  const representativeBodyTemplate = (rowData: any) => {
    return (
        <div className="flex align-items-center gap-2">
            
            <button onClick={() => hanldeEdit(rowData)} className="btn-edit">
                    <span>
                      <AiOutlineEdit />
                    </span>
                  </button>
                  <button onClick={() => {
                    setType('delete')
                    setVisible(true)
                    setActionData(rowData._id)
                  }} className="btn-delete">
                    <span>
                      <AiOutlineDelete />
                    </span>
                  </button>
        </div>
    );
};

  const reject = () => {
    // Xử lý khi người dùng từ chối xác nhận hoặc đóng hộp thoại
    setVisible(false);
  };
  return (
    <div className="book__manage">
      <div className="flex justify-between">
      <h1 className="font-bold">Danh sách hiện có</h1>
      <Button className="mx-4 my-2" label="Export" icon='pi pi-file-excel' severity="info" onClick={() => exportToExcel(user)} rounded />
      </div>
      <div className="book__manage__wrapper">
      <DataTable value={user} scrollable  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
    <Column field="name" header="Tên"  sortable  style={{ width: '25%',fontSize:'14px' }}></Column>
    <Column field="email" header="Mail" sortable  style={{ width: '25%',fontSize:'14px' }}></Column>
    <Column field="address" header="Địa chỉ" sortable  style={{ width: '25%',fontSize:'14px' }}></Column>
    <Column field="phoneNumber" header="Sdt" sortable  style={{ width: '25%',fontSize:'14px' }}></Column>
    <Column field="role" header="Phân quyền" sortable  style={{ width: '25%',fontSize:'14px' }}></Column>
    <Column field="borrowedBook" body={representativeBodyTemplate} header="sach mượn" sortable  style={{ width: '25%',fontSize:'14px' }}></Column>
</DataTable>

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
