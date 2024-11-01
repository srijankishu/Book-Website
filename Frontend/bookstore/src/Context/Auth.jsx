import React,{createContext,useContext,useState} from 'react'

export const AuthContext = createContext();
export default function AuthProvider({children}){
  const initialAuth = localStorage.getItem('Users');
  const [auth,setAuth] = useState(initialAuth?JSON.parse(initialAuth):undefined);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);

//to use user credentials globally in every component 