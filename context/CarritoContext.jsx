import { createContext, useState } from 'react'; 
 

export const CarritoContext=  createContext(); 
export function CarritoProvider({ children }) { 
    const [carrito, setCarrito] =   useState([]); 
 
    const agregarAlCarrito = (producto) => { 
        setCarrito([...carrito, producto]); 
    }; 
 
    const vaciarCarrito = () => { 
        setCarrito([]); 
    }; 

    const eliminarDelCarrito = (idEliminar) =>{
        setCarrito(carrito.filter(producto=> producto.id!= idEliminar))
    }
 
    return ( 
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, 
vaciarCarrito, eliminarDelCarrito }}> 
            {children} 
        </CarritoContext.Provider> 
    ); 
} 
 