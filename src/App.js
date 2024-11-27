import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FormularioRegistro from './components/FormularioRegistro';
import Main from './components/Main';
import VerDatos from './components/VerDatos';
import ConsultarPersona from './components/ConsultarPersona';
import RegistroComunion from './components/RegistroComunion';
import RegistroConfirmacion from './components/RegistroConfirmacion';
import RegistroMatrimonio from './components/RegistroMatrimonio';
import RegistroDefuncion from './components/RegistroDefuncion';
import RegistroSepultura from './components/RegistroSepultura';
import DetalleBautizo from './components/DetalleBautizo';
import DetalleComunion from './components/DetalleComunion';
import DetalleConfirmacion from './components/DetalleConfirmacion';
import DetalleMatrimonio from './components/DetalleMatrimonio';
import DetalleSepultura from './components/DetalleSepultura';
import DetalleDefuncion from './components/DetalleDefuncion';


const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Main toggleDarkMode={toggleDarkMode} />} />
          <Route path="/registro-bautizo" element={<FormularioRegistro />} />
          <Route path="/ver-datos" element={<VerDatos />} />
          <Route path="/consultar-persona" element={<ConsultarPersona />} />
          <Route path="/registro-comunion" element={<RegistroComunion />} />
          <Route path="/registro-confirmacion" element={<RegistroConfirmacion />} />
          <Route path="/registro-matrimonio" element={<RegistroMatrimonio />} />
          <Route path="/registro-defuncion" element={<RegistroDefuncion />} />
          <Route path="/registro-sepultura" element={<RegistroSepultura />} />
          <Route path="/detalleBautizo" element={<DetalleBautizo />} />
          <Route path="/detalleBautizo/:id" element={<DetalleBautizo />} />
          <Route path="/detalleComunion:" element={<DetalleComunion />} />
          <Route path="/detalleComunion" element={<DetalleComunion />} />
          <Route path="/detalleConfirmacion" element={<DetalleConfirmacion />} />
          <Route path="/detalleMatrimonio" element={<DetalleMatrimonio />} />
          <Route path="/detalleSepultura" element={<DetalleSepultura />} />
          <Route path="/detalleDefuncion" element={<DetalleDefuncion />} />




          <Route path="/" element={<FormularioRegistro />} />




        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
