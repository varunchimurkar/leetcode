import React from 'react'

import {Routes, Route, Navigate} from "react-router-dom"
import SignUpPage from './page/SignUpPage'
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'

const App = () => {
  return (
    <div className='flex flex-col items-center justify-start'>
 <Routes>

  <Route
  path = '/'
  element = {<HomePage/>}
  
  />
  <Route
  path = '/login'
  element = {<LoginPage/>}
/>

  <Route
  path = '/signup'
  element = {<SignUpPage/>}
/>
 </Routes>

    </div>
  )
}

export default App