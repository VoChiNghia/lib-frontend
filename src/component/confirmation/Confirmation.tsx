import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';

interface Props {
    visibleDialog: boolean,
    confirm: (visible: boolean) => void,
    title?: string,
    header?: string
}

const Confirmation = ({visibleDialog = false,confirm,title = '',header = ''}: Props) => {
    const [visible, setVisible] = useState(visibleDialog);

    const accept = () => {
      // Xử lý khi người dùng chấp nhận xác nhận
      setVisible(false);
     return confirm(true)
    };
  
    const reject = () => {
      // Xử lý khi người dùng từ chối xác nhận hoặc đóng hộp thoại
      setVisible(false);
    return  confirm(false)
    };
  return (
    <div>
      <ConfirmDialog
        visible={visible}
        onHide={reject}
        message={title ? title : 'Bạn có chắc chắn muốn thực hiện hành động này?'}
        header={header ? header : 'Xác nhận'}
        icon="pi pi-info-circle"
        accept={accept}
        reject={reject}
      />
    </div>
  )
}

export default Confirmation