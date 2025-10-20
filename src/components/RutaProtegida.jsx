
import useContext from 'react'; 
import { Navigate } from 'react-router-dom'; 
import { RutaProtegidaContext } from '../../context/RutaProtegidaContext';


 
function RutaProtegida({ isAuthenticated, children }) { 
  if (!isAuthenticated) { 
    return <Navigate to="/login" replace />; 
  } 
  return children; 
} 
export default RutaProtegida; 