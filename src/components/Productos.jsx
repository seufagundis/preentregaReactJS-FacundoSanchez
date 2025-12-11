import React, { useContext, useEffect, useState } from 'react';
import { CarritoContext } from '../../context/CarritoContext';
import { SearchContext } from "../../context/SearchContext";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";



function Productos() {
    const [productos, setProductos] = useState([]);

    const { busqueda } = useContext(SearchContext);

    const { isAuthenticated } = useContext(AuthContext);

    const { agregarAlCarrito } = useContext(CarritoContext)

    const [error, setError] = useState(null);

    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 20;


    useEffect(() => {
        fetch('https://68f5097cb16eb6f468363490.mockapi.io/productos')
            .then((respuesta) => respuesta.json())
            .then((datos) => setProductos(datos))
            .catch((error) => setError(error.message));
    }, []);


    if (productos.length == 0) {
        return <h2>Cargando productos...</h2>;
    }
    if (error) {
        return <h2>Ocurrió el siguiente error: {error}</h2>
    }

    const productosFiltrados = productos.filter((p) =>
        p.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productosFiltrados.slice(
        indicePrimerProducto,
        indiceUltimoProducto
    );

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    return (
        <div className="container productos-container">
            <div className="row gy-4 gx-5">

                {productosFiltrados.length === 0 && (
                    <p className="text-center mt-4">
                        No hay productos que coincidan con la búsqueda.
                    </p>
                )}

                {productosActuales.map((producto) => (


                    <div key={producto.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className="card h-100">
                            <img
                                src={producto.image}
                                alt={producto.name}
                                className="card-image"
                            />
                            <h3 className="card-name">{producto.name}</h3>
                            <p className="card-description">{producto.description}</p>
                            <p className="card-price">${producto.price}</p>

                            <button
                                className="card-button"
                                onClick={() => {
                                    if (!isAuthenticated) {
                                        toast.warning("Debes iniciar sesión para agregar productos al carrito");
                                        return;
                                    }
                                    agregarAlCarrito(producto);
                                    toast.success(`Agregaste "${producto.name}" al carrito`);
                                }}
                            >
                                Agregar al carrito
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-center my-4">
                {Array.from({ length: totalPaginas }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"
                            }`}
                        onClick={() => cambiarPagina(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

        </div>
    );
}

export default Productos;