import React from 'react'
import HostNavbar from '../components/HostNavbar'
import { Outlet, useLoaderData } from 'react-router-dom'

const HostLayout = () => {
  const vans = useLoaderData()

  return (
    <div>
        <HostNavbar/>
        <Outlet context={vans} /> 
    </div>
  )
}

export default HostLayout
