import { Routes, Route, Link, Outlet } from "react-router-dom";
import React, { useState } from 'react';
import HomePage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'


function App() {
  return (
    <div>
      <div>
        <Link to='/'>Homepage</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/dashboard'>Dashboard</Link>
      </div>
      <Outlet />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<main><p>Nothing here!</p></main>} />
      </Routes>
    </div>
  )
}

export default App
