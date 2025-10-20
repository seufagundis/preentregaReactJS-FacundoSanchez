import { useContext, useState } from "react"
import { CarritoContext } from "../../context/CarritoContext.jsx"

function Carrito() {
    const {carrito, vaciarCarrito, eliminarDelCarrito} = useContext(CarritoContext)
    

    return (

        <div>
            
            <h1>Carrito de Compras</h1>
            <div className="productos-container">
            {carrito.length > 0 ? (
                
                    carrito.map((producto) => (
                        <div key={producto.id} className="card">
                            <img
                                src={producto.image}
                                alt={producto.name}
                                className="card-image"
                            />
                            <h3 className="card-name">{producto.name}</h3>
                            <p className="card-description">{producto.description}</p>
                            <p className="card-price">${producto.price}</p>
                            <button className="card-button" onClick={()=>eliminarDelCarrito(producto.id)}>
                                Eliminar del carrito
                            </button>
                        </div>
                        
                    ))
                
            ) : (
                <p>El carrito está vacío.</p>
            )}
            
            {carrito.length > 0 && <button
                onClick={vaciarCarrito}>Vaciar Carrito</button>}
        
        </div>
        </div>
    );
}

export default Carrito; 
