import { Navigate, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Login() {

    const { iniciarSesion } = useContext(AuthContext)
    const navigate = useNavigate()
    const inicioSesionUsuario = ()=>{
        iniciarSesion("token-user","user")
        navigate("/productos")
    }
    const inicioSesionAdmin = ()=>{
        iniciarSesion("token-admin","admin")
        navigate("/admin/productos")
    }
    return (



        <div className="card">
            <h3 className="card-name">Login</h3>
            <p className="card-description">Click para loguearte</p>
            <button onClick={() => { 
                inicioSesionUsuario() 
                }} className="card-button">
                Usuario
            </button>
             <button onClick={() => { 
                inicioSesionAdmin() 
                }} className="card-button">
                Administrador
            </button>
        </div>);

}

export default Login