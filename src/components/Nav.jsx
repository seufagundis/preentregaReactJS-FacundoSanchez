import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import { useLocation } from "react-router-dom";


function Nav() {

    const location = useLocation();

    const ocultarBusqueda =
        location.pathname === "/" || location.pathname === "/login";

    const { setBusqueda } = useContext(SearchContext);
    const { isAdmin, isAuthenticated, cerrarSesion } = useContext(AuthContext);
    const navigate = useNavigate();

    const linkProductosDinamico = isAdmin ? "/admin/productos" : "/productos";

    const handleLogout = () => {
        cerrarSesion();
        navigate("/login");
    };

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark mb-4 ">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    SuperMegaTienda
                </Link>

                <ul className="navbar-nav ms-auto align-items-center">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Inicio
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to={linkProductosDinamico}>
                            Productos
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/carrito">
                            Carrito
                        </Link>
                    </li>

                    {!ocultarBusqueda && (
                        <li className="nav-item ms-3">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Buscar productos…"
                                onChange={(e) => setBusqueda(e.target.value)}
                                style={{ width: "180px" }}
                            />
                        </li>
                    )}



                    {!isAuthenticated && (
                        <li className="nav-item ms-3">
                            <Link className="btn btn-outline-light btn-sm" to="/login">
                                Iniciar sesión
                            </Link>
                        </li>
                    )}

                    {isAuthenticated && (
                        <li className="nav-item ms-3">
                            <button
                                className="btn btn-outline-light btn-sm"
                                onClick={handleLogout}
                            >
                                Cerrar sesión
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
