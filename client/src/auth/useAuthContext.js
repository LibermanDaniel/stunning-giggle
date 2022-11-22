import { AuthContext } from "./authContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw Error('Use AuthContext must be used inside an AuthContextProvider')
  }

  return context
}