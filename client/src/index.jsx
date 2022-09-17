import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Register from './pages/Registration'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import HomePage from './pages/Homepage'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter >
  // <BrowserRouter>
  //   <Routes >
  // <Route exact path='/' component={<App />} />
  // <Route path='/login' component={<Login />} />
  // <Route path='/register' component={<Register />} />
  // <Route path='/dashboard' component={<Dashboard />} />
  // <Route path='*' element={<main><p>Nothing here!</p></main>} />
  //   </Routes>
  // </BrowserRouter>

)
