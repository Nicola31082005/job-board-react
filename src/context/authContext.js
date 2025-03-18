import { createContext } from "react";

const AuthContext = createContext({
  authData: {},
  setAuthData: () => {},
  clearAuthData: () => {},
});

export default AuthContext;
