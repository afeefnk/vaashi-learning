import React from 'react'
import Navbar1 from '../Navbar1/Navbar1'
import { Outlet } from 'react-router-dom'

const Layout1 = () => {
  return (
    <div>
      <Navbar1/>
      <Outlet/>
    </div>
  )
}

export default Layout1
