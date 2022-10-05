import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { PrivateRoute } from './auth/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import { Login } from './pages/Login'
import { SignUp } from './pages/Register'
import { EmailVerificationPage } from './pages/EmailVerificationPage'
import { PleaseVerifyPage } from './pages/PleaseVerifyPage'
import { Navbar } from './components/Navbar'


export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<Dashboard />} path='/dashboard' exact />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/please-verify" element={<PleaseVerifyPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/verify-email/:verificationString" element={<EmailVerificationPage />} />
    </Routes>
  )
}