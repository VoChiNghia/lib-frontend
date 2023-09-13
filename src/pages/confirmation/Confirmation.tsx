import React from 'react'
import { Link } from 'react-router-dom'

const ConfirmationLink = () => {
  return (
    <div>
        <div className="text-4xl font-bold">
        Vui lòng kiểm tra hộp thư email của bạn ... 
    </div>
    <Link to='/login-form'>
    <p className="my-3 text-blue-500">Quay lại trang đăng nhập</p>
    </Link>
    </div>
  )
}

export default ConfirmationLink