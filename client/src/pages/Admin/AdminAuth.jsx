import React from 'react'
import Signup from '../../Components/auth/Signup'
import Login from '../../Components/auth/Login'

const AdminAuth = ({type='login'}) => {

    if(type==='login'){
        return <Login  type='login' />
    }
  return <Signup type='signup' />
}

export default AdminAuth