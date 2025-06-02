import React from 'react'

import {Routes, Route, Navigate} from "react-router-dom"
import SignUpPage from './page/SignUpPage'
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'

const App = () => {

  let authUser = null 

  return (
    <div className='flex flex-col items-center justify-start'>
 <Routes>

  <Route
  path = '/'
  element = {authUser ? <HomePage/> : <Navigate to={"/login"}/>}
  
  />
  <Route
  path = '/login'
  element = {!authUser ? <LoginPage/> : <Navigate to={"/"} />}
/>

  <Route
  path = '/signup'
  element = {!authUser ? <SignUpPage/> : <Navigate to={"/"} />}
/>
 </Routes>

    </div>
  )
}

export default App