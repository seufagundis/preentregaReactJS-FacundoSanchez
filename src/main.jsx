import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarritoProvider } from '../context/CarritoContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Router>
      <AuthProvider>
      <CarritoProvider>
        <App />
      </CarritoProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
)
