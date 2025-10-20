import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarritoProvider } from '../context/CarritoContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { RutaProtegidaProvider } from '../context/RutaProtegidaContext.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Router>
      <RutaProtegidaProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
      </RutaProtegidaProvider>
    </Router>
  </StrictMode>,
)
