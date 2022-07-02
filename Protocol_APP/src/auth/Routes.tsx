import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Logout from './Logout'

const AccountRoutes = () => {
    return (
       <Routes>
           <Route path="login"  element={<Login/>}/>
           <Route path="logout" element={<Logout/>} />
       </Routes>
    )
}

export default AccountRoutes
