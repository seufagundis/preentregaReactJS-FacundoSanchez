import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const InicioWrapper = styled.section`
  padding: 4rem 1rem;
  text-align: center;
`;

const InicioTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const InicioText = styled.p`
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 2rem auto;
  color: #555;
`;

const InicioCTA = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  border: none;
  background: #0d6efd;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;

  &:hover {
    background: #0b5ed7;
    transform: translateY(-1px);
  }
`;

function Inicio() {

  const navigate = useNavigate();

  return (
    <InicioWrapper>
      <InicioTitle>Bienvenido a nuestra tienda online</InicioTitle>
      <InicioText>
        Descubrí los mejores productos al mejor precio. Iniciá sesión y empezá
        a armar tu carrito.
      </InicioText>
      <InicioCTA onClick={() => navigate("/productos")}> 
        Ver productos
      </InicioCTA>
    </InicioWrapper>
  );
}

export default Inicio;
