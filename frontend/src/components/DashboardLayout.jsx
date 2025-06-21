import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Navbar from './Navbar'
import SideMenu from './SideMenu'

const DashboardLayout = ({children, activeMenu}) => {
    const { user } = useContext(UserContext)
    const token = localStorage.getItem('token')
    const isAuthenticated = user || token // Show layout if user exists OR token exists
    
  return (
    <div className=''>
        <Navbar activeMenu = {activeMenu}/>
        { isAuthenticated && (
            <div className='flex'>
                <div className='max-[1080px]:hidden'>
                <SideMenu activeMenu = {activeMenu} />
                </div>
                <div className='grow mx-5'>{children}</div>
            </div>
        )

        }
    </div>
  )
}

export default DashboardLayout