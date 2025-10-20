import { Navigate, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { RutaProtegidaContext } from '../../context/RutaProtegidaContext';

function Login() {

    const { iniciarSesion } = useContext(RutaProtegidaContext)
    const navigate = useNavigate()
    const clickInicioSesión = ()=>{
        iniciarSesion()
        navigate("/productos")
    }

    return (
        <div className="card">
            <h3 className="card-name">Login</h3>
            <p className="card-description">Click para loguearte y ver tu Carrito</p>
            <button onClick={() => { 
                clickInicioSesión() 
                }} className="card-button">
                Iniciar sesion
            </button>
        </div>);

}

export default Login