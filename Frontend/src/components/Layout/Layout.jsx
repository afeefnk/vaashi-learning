import React from 'react'
import MainComponent from '../../MainComponent.jsx'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <MainComponent/>
      <Outlet/>
    </div>
  )
}

export default Layout
