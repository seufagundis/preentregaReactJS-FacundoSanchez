import { createContext, useState, useEffect } from "react";




export const AuthContext=  createContext(); 

export function AuthProvider({ children }) { 

   
    const [token, setToken] =   useState(localStorage.getItem("token")); 
    const [rol, setRol] = useState(localStorage.getItem("rol"));

    const isAuthenticated= Boolean(token)
    const isAdmin = rol === "admin"

     useEffect(()=>{
        if (token) {
            localStorage.setItem("token", token)
            localStorage.setItem("rol",rol)
            
        } else {
            localStorage.removeItem("token")
            localStorage.removeItem("rol")
        }
        
    },[token,rol])


    const iniciarSesion = (token, rol) => { 
        setToken(token);
        setRol(rol)

    }; 

    const cerrarSesion = ()=> {
        setToken("")
        setRol("")
    }
 
    
    return ( 
        <AuthContext.Provider value={{isAdmin, token, isAuthenticated, rol, iniciarSesion, cerrarSesion }}> 
            {children} 
        </AuthContext.Provider> 
    ); 
} 
 