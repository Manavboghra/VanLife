import React from 'react'
import HostNavbar from '../components/HostNavbar'
import { Outlet } from 'react-router-dom'

const HostLayout = () => {
  return (
    <div>
        <HostNavbar/>
        <Outlet/>
    </div>
  )
}

export default HostLayout