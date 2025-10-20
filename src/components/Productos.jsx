import React, { useContext, useEffect, useState } from 'react';
import { CarritoContext } from '../../context/CarritoContext';


function Productos() {
    const [productos, setProductos] = useState([]);

    const {agregarAlCarrito} = useContext(CarritoContext)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((respuesta) => respuesta.json())
            .then((datos) => setProductos(datos))
            .catch((error) => console.error('Error:', error));
    }, []);

    if (productos==0) {
    return <h2>Cargando productos...</h2>;
  }

    return (
        <div className="productos-container"> 
            {productos.map((producto) => (
                <div key={producto.id} className="card">
                    <img 
                        src={producto.image} 
                        alt={producto.title}
                        className="card-image"
                    />
                    <h3 className="card-name">{producto.title}</h3>
                    <p className="card-description">{producto.description}</p>
                    <p className="card-price">${producto.price}</p>
                    <button onClick= {()=>agregarAlCarrito(producto)}className="card-button">
                        Agregar al carrito
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Productos;