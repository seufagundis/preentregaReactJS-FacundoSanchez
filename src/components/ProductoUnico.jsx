import { useParams } from 'react-router-dom'; 
import { useEffect, useState } from 'react';

function ProductoUnico() { 
  const { id } = useParams(); 
  const [productoUnico, setProductoUnico] = useState(null)

  useEffect(() => {
        fetch(`https://68f5097cb16eb6f468363490.mockapi.io/productos/${id}`)
            .then((respuesta) => respuesta.json())
            .then((datos) => setProductoUnico(datos))
            .catch((error) => console.error('Error:', error));
    }, []);

if (!productoUnico) {
    return <h2>Cargando producto...</h2>;
  }


  return ( 
    <div> 
      <h1>Detalle del Producto</h1> 
      <p>Este es el detalle del producto con ID: {id}</p> 
      <div key={productoUnico.id} className="card">
                    <img 
                        src={productoUnico.image} 
                        alt={productoUnico.name}
                        className="card-image"
                    />
                    <h3 className="card-name">{productoUnico.name}</h3>
                    <p className="card-description">{productoUnico.description}</p>
                    <p className="card-price">${productoUnico.price}</p>
                    <button onClick= {()=>agregarAlCarrito(productoUnico)}className="card-button">
                        Agregar al carrito
                    </button>
                </div>
    </div> 
  ); 
} 
 
export default ProductoUnico; 