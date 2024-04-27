import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationBar from '../components/NavigationBar'

const Layout = () => {
  return (
    <div className='w-full md:h-[100vh] flex flex-col md:flex-row'>
      <div className="h-full order-2 md:order-1">
        <NavigationBar/>
      <div className=" hidden sm:block md:w-[100px] lg:w-[90px] "></div>
      </div>
      <div className="px-[15px] lg:px-[20px] w-full h-full grow order-1 md:order-2">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
