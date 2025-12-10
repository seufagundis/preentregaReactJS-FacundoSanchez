import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";



function RutaAdmin ({children}) {

    const {isAuthenticated, isAdmin} = useContext(AuthContext)

    if (!isAuthenticated ) {
         return <Navigate to="/login" replace />
    }
    if (!isAdmin) {
         return <Navigate to="/productos" replace />
    }
    return children
}

export default RutaAdmin