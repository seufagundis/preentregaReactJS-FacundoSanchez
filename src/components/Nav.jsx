import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";

function Nav() {
  const { isAdmin, isAuthenticated, cerrarSesion } = useContext(AuthContext);
  const { setBusqueda } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();

  const linkProductosDinamico = isAdmin ? "/admin/productos" : "/productos";
  const ocultarBusqueda =
    location.pathname === "/" || location.pathname === "/login";

  const handleLogout = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          SuperMegaTienda
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center">
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
              <li className="nav-item ms-lg-3 my-2 my-lg-0">
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
              <li className="nav-item ms-lg-3 my-2 my-lg-0">
                <Link className="btn btn-outline-light btn-sm w-100" to="/login">
                  Iniciar sesión
                </Link>
              </li>
            )}

            {isAuthenticated && (
              <li className="nav-item ms-lg-3 my-2 my-lg-0">
                <button
                  className="btn btn-outline-light btn-sm w-100"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
