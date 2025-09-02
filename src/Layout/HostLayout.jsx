import React from 'react'
import HostNavbar from '../components/HostNavbar'
import { Outlet, useLoaderData } from 'react-router-dom'
import { getVans } from '../../api';
import RequireAuthCom from '../utils/RequireAuthCom';
import requireAuth from '../utils/requireAuth';

export async function loader({request}) {
   const pathname = new URL(request.url).pathname;
  console.log(pathname)
  await requireAuth(pathname)
  return getVans();
}

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
