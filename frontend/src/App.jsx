import React, { useEffect } from 'react'

import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"

import SignUpPage from './page/SignUpPage'
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'
import { Loader } from 'lucide-react'
import { userAuthStore } from './store/useAuthStore'

const App = () => {

  const { authUser, checkAuth, isCheckingAuth } = userAuthStore()

  //let authUser = null

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-start'>
      <Toaster />
      <Routes>

        <Route
          path='/'
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}

        />
        <Route
          path='/login'
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />

        <Route
          path='/signup'
          element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
        />
      </Routes>

    </div>
  )
}

export default App