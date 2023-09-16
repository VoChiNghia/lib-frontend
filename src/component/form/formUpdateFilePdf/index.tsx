import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../../redux/store";
import { getAllBook, getAllFile, updateCoveredBook, updateCoveredFile, updateFile, updateFileBookPdf } from "../../../redux/reducer/book";
import "./index.scss";
import ButtonSolid from "../../button/ButtonSolid";
import { Button } from "primereact/button";

type Props = {
  idUpdate: string;
  type?: string
};

const UploadFilepdf = ({ idUpdate, type }: Props) => {
  const [selected, setSelected] = useState();

  const dispatch: DispatchType = useDispatch();
  const handleSubmit = async () => {
    const formData = new FormData();
    if (selected) {
      formData.append("pdf", selected);
      if(type === 'book'){
        await dispatch(updateFileBookPdf(idUpdate, formData));
        await dispatch(getAllBook(''))
      }else{
        await dispatch(updateFile(formData,{_id:idUpdate}));
        dispatch(getAllFile())
      }
    
    }
  };

  return (
    <div className="add-image">
      <label htmlFor="custom-file-upload" className="filupp">
        <span className="filupp-file-name js-value">Browse Files</span>
        <input
          type="file"
          name="attachment-file"
          accept=".pdf"
          id="custom-file-upload"
          onChange={(e: any) => setSelected(e.target.files[0])}
        />
      </label>
      <div className="add-image__btn">
      <Button label="Thêm file" raised onClick={handleSubmit}/>
      </div>
    </div>
  );
};

export default UploadFilepdf;
