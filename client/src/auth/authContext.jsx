import { useReducer, createContext } from 'react';
import { useUser } from './useUser';

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.state) {
    case 'LOGIN':
      return { user: action.payload };

    case 'LOGOUT':
      return { user: null };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const user = useUser();
  const [state, dispatch] = useReducer(reducer, {
    user: user,
  });

  console.log('Authcontext state:', state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
