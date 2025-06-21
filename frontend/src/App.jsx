import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Income from './pages/Income'
import Expense from './pages/Expense'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<Home />} />
        <Route path='/income' element={<Income />} />
        <Route path='/expense' element={<Expense />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default App