import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantenimientoPage } from './pages/MantenimientoPage';
import { MantenimientoFormPage } from './pages/MantenimientoFormPage';
import { GerenciaPage } from './pages/GerenciaPage';
import { Navigation } from './components/Navigation';
import Login from './pages/Login'; // Importación actualizada
import logo from './assets/logo_maintcheck.png'; // Asegúrate de que la ruta sea correcta

function App() {
  return (
    <BrowserRouter>
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <img src={logo} alt="Maintcheck Logo" style={{ width: '200px', height: 'auto' }} /> {/* Ajusta el ancho aquí */}
        <Navigation />
        <Routes>
          <Route path="/mantenimiento" element={<MantenimientoPage />} />
          <Route path="/mantenimiento-create" element={<MantenimientoFormPage />} />
          <Route path="/gerencia" element={<GerenciaPage />} />
          <Route path="/login" element={<Login />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;