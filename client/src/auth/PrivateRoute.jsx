import { Navigate, Outlet } from 'react-router-dom'
import {useUser} from './useUser'
export const PrivateRoute = () => {
  const user = useUser()
  
  console.log(user)
  return user ? <Outlet /> : <Navigate to="/login" replace />;

}