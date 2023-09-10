import React from "react";
import { DispatchType, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import ReactModal from "react-modal";
import { setIsOpenCompoent } from "../../redux/reducer/modal";
import './modal.scss'
const Modal = () => {
  const { component, isOpen } = useSelector((state: RootState) => state.modal);
  const dispatch: DispatchType = useDispatch();
  return (
    <div className="modal-hoc">
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => dispatch(setIsOpenCompoent(false))}
        ariaHideApp={false}
        contentLabel="Example Modal"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(34, 34, 34, 0.4)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
          },
        }}
      >
        <span
          className="modal-close"
          onClick={() => dispatch(setIsOpenCompoent(false))}
        >
          <GrClose className="modal-close-icon" />
        </span>
        {component}
      </ReactModal>
    </div>
  );
};

export default Modal;
