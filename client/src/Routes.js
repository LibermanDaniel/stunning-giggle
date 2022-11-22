import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './auth/PrivateRoute'
import Dashboard from './pages/Dashboard'
import Homepage from './pages/Homepage'
import { Login } from './pages/Login'
import { SignUp } from './pages/Register'
import { EmailVerificationPage } from './pages/EmailVerificationPage'
import { PleaseVerifyPage } from './pages/PleaseVerifyPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { ForgotPasswordLanding } from './pages/ForgotPasswordLanding'
import { CubePool } from './pages/CubePool'
import { UserPage } from './pages/UserPage'
import { MissingRoute } from '../src/components/MissingRoute'

export const AppRoutes = () => {

  return (
    <>

      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<Dashboard />} path='/dashboard' exact />
          <Route path="/cube-pool" exact element={<CubePool />} />
        </Route>
        <Route path="/user-page" element={<UserPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/please-verify" element={<PleaseVerifyPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/verify-email/:verificationString" element={<EmailVerificationPage />} />
        <Route path="/reset-password/:passwordString" element={<ForgotPasswordLanding />} />
        <Route path="*" element={<MissingRoute />} />
      </Routes>

    </>
  )
}