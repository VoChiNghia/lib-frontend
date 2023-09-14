import React, { useState } from "react"
import Header from "../../componentClient/header/Header"
import SideBar from "../../componentClient/sideBar/SideBar"
import UpdateUser from "../../component/form/formAddUpdateUser/updateUser"
import { USER } from "../../config/axios"
import { Card } from 'primereact/card';

const Profile = () => {
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem(USER) as string) ?? "")
  return (
    <div className="w-[1200px] mx-auto">
      <div>
        <Header />
      </div>
      <div className="grid grid-cols-6 mt-10">
        <div className="col-span-1">
          <SideBar />
        </div>
        <div className="col-span-5 mx-auto ">
          <Card title="">
          <UpdateUser value={user}/>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile
