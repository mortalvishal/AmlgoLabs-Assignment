import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Income from './pages/Income'
import Expense from './pages/Expense'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UserProvider from './context/UserContext'

const App = () => {
  return (
    <UserProvider>
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/signup' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<Home />} />
        <Route path='/income' element={<Income />} />
        <Route path='/expense' element={<Expense />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
      }}
    />
    </div>
    </UserProvider>
  )
}

export default App