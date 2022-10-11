import { Navigate, Outlet } from 'react-router-dom'
import {useUser} from './useUser'
export const PrivateRoute = () => {
  const user = useUser()
  console.log(user?.isVerified)
  return user?.isVerified && user ? <Outlet /> : <Navigate to="/login" replace />;

}