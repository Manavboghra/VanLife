import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error =  useRouteError()
  return (
    <div className='font-medium text-xl text-center h-screen bg-white'>
        <div className='font-bold text-4xl text-center mt-auto mb-auto p-5'>400 Bad Request</div>
        {error.message}
    </div>
  )
}

export default Error