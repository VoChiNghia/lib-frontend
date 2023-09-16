import React, { useRef } from 'react'
import { Toast } from 'primereact/toast';

const ToastComponent = () => {
    const toast = useRef<any>(null);

    const showToast = (severity: any, summary: any, detail: any, life = 3000) => {
      toast.current.show({ severity, summary, detail, life });
    };
  
  


  return (
    <div>
    <Toast ref={toast} />
    {/* Bất kỳ nội dung hoặc routing của ứng dụng ở đây */}
  </div>
  )
}

export default ToastComponent