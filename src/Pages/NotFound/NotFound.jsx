import React from 'react'
import notFound from "../../assets/imgs/error.svg"
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <>
    <div className='flex-center space-y-5 flex-col'>
        <img src={notFound} alt="404 Not Found" className='w-96' />
        <h1 className='text-xl'>Back To <Link to={"/"} className='text-myColor-800 underline font-semibold'>Home</Link></h1>
    </div>
    </>
  )
}
