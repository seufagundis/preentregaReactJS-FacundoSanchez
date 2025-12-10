import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
 
function Nav() {   

    const {isAdmin} = useContext(AuthContext)

    const linkProductosDinamico = isAdmin? "/admin/productos" : "/productos"

    
    return (   
        <nav style={{ backgroundColor: "#333", color: "white", padding: 
"10px" }}>   
            <ul style={{ listStyle: "none", display: "flex", 
justifyContent: "space-around", margin: 0 }}>   
                <li><Link to="/" style={{ color: "white" ,
textDecoration: "none" }}>Inicio</Link></li>   
                <li><Link to= {linkProductosDinamico} style={{ color: "white" ,
textDecoration: "none" }}>Productos</Link></li>   
                <li><Link to="/carrito" style={{ color: "white" ,
textDecoration: "none" }}>Carrito</Link></li>   
            </ul>   
        </nav>   
    );   
}   
 
export default Nav;   