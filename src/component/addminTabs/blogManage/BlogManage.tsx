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
import { deleteBlog, deleteBook, getAllBlog } from "../../../redux/reducer/book";
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
import moment from "moment";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import FormAddBlog from "../../form/formAddBlog/FormAddBlog";
const BlogManage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { allBlog } = useSelector((state: RootState) => state.book);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [visible, setVisible] = useState<boolean>(false);
  const [type, setType] = useState<string>('');
  const [actionData, setActionData] = useState(null);
  const query = {
    limit: LIMIT,
    page: currentPage,
  }

  console.log(allBlog)
  //const totalPage = Math.floor(totalBooks / LIMIT)
  const dispatch: DispatchType = useDispatch();
  
  const getAllUserApi = () => {
    dispatch(getAllUser());
    dispatch(getAllBlog());
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
    dispatch(deleteBlog(id))
    dispatch(getAllBlog());
  };

  const accept = async () => {
    setVisible(false);
    if(type === 'delete') hanldeDelete(actionData)
    

  };

  const dateBodyTemplate = (rowData: any) => {
    const date: any = moment(rowData.borrowedDate).format("DD-MM-YYYY")
    return <div>{date}</div>
  }

  const representativeBodyTemplate = (rowData: any) => {
    return (
        <div className="flex align-items-center gap-2">
          <Button icon="pi pi-times" text  outlined severity="danger" aria-label="Cancel" onClick={() => {
                    setType('delete')
                    setVisible(true)
                    setActionData(rowData._id)
                  }} />
        </div>
    );
};

  const reject = () => {
    // Xử lý khi người dùng từ chối xác nhận hoặc đóng hộp thoại
    setVisible(false);
  };
  return (
    <div className="book__manage">
      

      <Tabs>
    <TabList>
      <Tab>Bài viết</Tab>
      <Tab>Thêm bài viết</Tab>
    </TabList>

    <TabPanel>
    <div className="flex justify-between">
      <h1 className="font-bold">Quản lý bài viết</h1>
      <Button className="mx-4 my-2" label="Export" icon='pi pi-file-excel' severity="info" onClick={() => exportToExcel(user)} rounded />
      </div>
      <div className="book__manage__wrapper">
      <DataTable value={allBlog} scrollable  paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
    <Column field="userId.name" header="Tên người tạo"  sortable  style={{ width: '15%',fontSize:'14px' }}></Column>
    <Column field="title" header="Tên bài viết" sortable  style={{ width: '35%',fontSize:'14px' }}></Column>
    <Column field="createdAt" header="ngày tạo" body={dateBodyTemplate} sortable  style={{ width: '25%',fontSize:'14px' }}></Column>
    <Column field="borrowedBook" body={representativeBodyTemplate} header="" sortable  style={{ width: '25%',fontSize:'14px' }}></Column>
</DataTable>
      </div>
    </TabPanel>
    <TabPanel>
      <FormAddBlog/>
    </TabPanel>
  </Tabs>
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

export default BlogManage;
