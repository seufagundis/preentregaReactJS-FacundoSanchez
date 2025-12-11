import { Navigate, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styled from "styled-components";
import { toast } from "react-toastify";

const LoginWrapper = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem 2.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const LoginTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 0.75rem;
`;

const LoginText = styled.p`
  margin-bottom: 1.5rem;
  color: #555;
`;

const RolButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const RolButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
  color: #fff;
  background: ${(props) =>
        props.variant === "admin" ? "#0d6efd" : "#198754"};

  &:hover {
    transform: translateY(-1px);
  }
`;


function Login() {

    const { iniciarSesion } = useContext(AuthContext)
    const navigate = useNavigate()
    const inicioSesionUsuario = () => {
        iniciarSesion("token-user", "user")
        navigate("/productos")
        toast.success("Iniciaste sesión como usuario");
    }

    const inicioSesionAdmin = () => {
        iniciarSesion("token-admin", "admin")
        navigate("/admin/productos")
        toast.success("Iniciaste sesión como administrador");
    }
    return (
        <LoginWrapper>
            <LoginCard>
                <LoginTitle>Login</LoginTitle>
                <LoginText>Elegí cómo querés ingresar</LoginText>

                <RolButtons>
                    <RolButton onClick={inicioSesionUsuario}>
                        Usuario
                    </RolButton>

                    <RolButton variant="admin" onClick={inicioSesionAdmin}>
                        Administrador
                    </RolButton>
                </RolButtons>
            </LoginCard>
        </LoginWrapper>
    );

}

export default Login