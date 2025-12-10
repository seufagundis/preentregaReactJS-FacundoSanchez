import { useContext, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import Gallery from './components/Gallery'
import Productos from './components/Productos'
import Carrito from './components/Carrito'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './components/Inicio'
import ProductoUnico from './components/ProductoUnico'
import RutaProtegida from './components/RutaProtegida'
import Login from './components/Login'
import { AuthContext } from '../context/AuthContext'
import RutaAdmin from "./components/RutaAdmin"
import AdminProductos from "./components/AdminProductos"

function App() {


  return (

    <div>

      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />

        <Route path="/carrito" element={
               <RutaProtegida>
              <Carrito />
            </RutaProtegida>
            
        } />

        <Route path="/admin/productos" element={
               <RutaAdmin>
              <AdminProductos />
            </RutaAdmin>
            
        } />

        <Route path="/productos/:id" element={<ProductoUnico />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />

    </div>

  )
}

export default App
