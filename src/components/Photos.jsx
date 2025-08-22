import React from 'react'
// import { useLoaderData } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

const Photos = () => {
  //  const van = useLoaderData()
   const van = useOutletContext()
  return (
    <div className='p-5'>
      <img src={van.imageUrl} className='h-20' alt={van.name} />
    </div>
  )
}

export default Photos