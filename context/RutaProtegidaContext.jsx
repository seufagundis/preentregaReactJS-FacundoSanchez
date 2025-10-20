import { createContext, useState } from "react";
import { Navigate } from "react-router-dom";


export const RutaProtegidaContext=  createContext(); 
export function RutaProtegidaProvider({ children }) { 
    const [isAuthenticated, setIsAuthenticated] =   useState(false); 
 
    const iniciarSesion = () => { 
        setIsAuthenticated(true);

    }; 
 
    
    return ( 
        <RutaProtegidaContext.Provider value={{setIsAuthenticated, isAuthenticated, iniciarSesion }}> 
            {children} 
        </RutaProtegidaContext.Provider> 
    ); 
} 
 