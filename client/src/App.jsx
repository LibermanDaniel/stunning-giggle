import { Routes, Route, Link, Outlet } from "react-router-dom";
import HomePage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UserPage from './pages/UserPage'

function App() {
  return (
    

    <div>
      <div>
        <Link to='/'>Homepage</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/user'>User</Link>
      </div>
      <Outlet />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/user' element={<UserPage />} />
        <Route path='*' element={<main><p>Nothing here!</p></main>} />
      </Routes>
    </div>

  )
}

export default App
