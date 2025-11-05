import React from 'react'
import AdminHeader from '../../Components/Outlet/AdminHeader'
import Adminfooter from '../../Components/Outlet/Adminfooter'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>


      <AdminHeader />
      <Outlet /> 
      <Adminfooter />
    </>
  )
}

export default AdminLayout