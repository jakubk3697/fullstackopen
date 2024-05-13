import { createContext, useReducer, useContext } from "react";

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, dispatchUser] = useReducer(authReducer, {
    username: "",
    password: "",
    user: null,
  });

  return (
    <AuthContext.Provider value={{ user, dispatchUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthContext).user;
export const useAuthDispatch = () => useContext(AuthContext).dispatchUser;

export default AuthContext;
