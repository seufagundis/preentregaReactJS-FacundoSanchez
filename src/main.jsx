import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarritoProvider } from '../context/CarritoContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext.jsx'
import { SearchProvider } from '../context/SearchContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Router>
      <AuthProvider>
        <CarritoProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </CarritoProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
)
