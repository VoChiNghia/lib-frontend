import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { DispatchType } from "../../../redux/store";
import { getAllFile, updateCoveredBook, updateCoveredFile } from "../../../redux/reducer/book";
import "./index.scss";
import ButtonSolid from "../../button/ButtonSolid";

type Props = {
  idUpdate: string;
};

const UploadCoverImageFile = ({ idUpdate }: Props) => {
  const [selected, setSelected] = useState();

  const dispatch: DispatchType = useDispatch();

  const handleSubmit = async () => {
    const formData = new FormData();
    if (selected) {
      formData.append("image", selected);
     await dispatch(updateCoveredFile(idUpdate, formData));
     await dispatch(getAllFile())
    }
  };

  return (
    <div className="add-image">
      <label htmlFor="custom-file-upload" className="filupp">
        <span className="filupp-file-name js-value">Browse Files</span>
        <input
          type="file"
          name="attachment-file"
          id="custom-file-upload"
          onChange={(e: any) => setSelected(e.target.files[0])}
        />
      </label>
      <div className="add-image__btn">
        <ButtonSolid text="Thêm ảnh cho file" onSubmit={handleSubmit} hover={false} />
      </div>
    </div>
  );
};

export default UploadCoverImageFile;
