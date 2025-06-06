import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { userAuthStore } from '../store/useAuthStore'
import { Loader } from 'lucide-react'

const AdminRoute = () => {
 
    const {authUser, isCheckingAuth} = userAuthStore()

    if(isCheckingAuth) {
        return <div className='flex items-center justify-center h-screen'> 
        <Loader className="size-10 animate-spin" /> </div>
    }

    if(!authUser || authUser.role !== "ADMIN") {
        return <Navigate to={"/"} />
    }
 
 
    return <Outlet/>
}

export default AdminRoute