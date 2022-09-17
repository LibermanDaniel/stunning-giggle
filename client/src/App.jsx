import { Routes, Route, Link, Outlet, BrowserRouter } from "react-router-dom";
import HomePage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Registration'
import Dashboard from './pages/Dashboard'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <Container>
      <Navbar>
        <Link to='/'>Homepage</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/dashboard'>Dashboard</Link>
      </Navbar>
      <Outlet />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<main><p>Nothing here!</p></main>} />
      </Routes>
    </Container>
  )
}

export default App
