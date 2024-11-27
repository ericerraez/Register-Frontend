import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

function FormularioRegistro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    fecha_bautizo: '',
    fecha_nacimiento: '',
    lugar_nacimiento: '',
    padre: '',
    madre: '',
    padrinos: '',
    celebrante: '',
    ano_registro_eclesiastico: '',
    tomo_registro_eclesiastico: '',
    pagina_registro_eclesiastico: '',
    acta_registro_eclesiastico: '',
    ano_registro_civil: '',
    tomo_registro_civil: '',
    pagina_registro_civil: '',
    acta_registro_civil: '',
    cedula_registro_civil: '',
    nota: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://register-production.up.railway.app/bautizos/', formData);
      alert('Datos guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar los datos', error);
      alert('Error al guardar los datos');
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const content = `
      <html>
        <head>
          <title>Certificado de Bautizo</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h4 { text-align: center; }
            h6 { margin-top: 20px; }
            .field { margin: 5px 0; }
            .container { max-width: 600px; margin: auto; }
            .footer { margin-top: 30px; text-align: right; }
            .logo { width: 200px; height: auto; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto; }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${logo}" class="logo" alt="Logo" />
            <h4>CERTIFICADO DE BAUTIZO</h4>
            <div class="field"><strong>Nombre:</strong> ${formData.nombre || 'Desconocido'}</div>
            <div class="field"><strong>Fecha de Bautizo:</strong> ${formData.fecha_bautizo || 'Desconocida'}</div>
            <div class="field"><strong>Fecha de Nacimiento:</strong> ${formData.fecha_nacimiento || 'Desconocida'}</div>
            <div class="field"><strong>Lugar de Nacimiento:</strong> ${formData.lugar_nacimiento || 'Desconocido'}</div>
            <div class="field"><strong>Padre:</strong> ${formData.padre || 'Desconocido'}</div>
            <div class="field"><strong>Madre:</strong> ${formData.madre || 'Desconocida'}</div>
            <div class="field"><strong>Padrinos:</strong> ${formData.padrinos || 'Desconocidos'}</div>
            <div class="field"><strong>Celebrante:</strong> ${formData.celebrante || 'Desconocido'}</div>
    
            <h6>Registro Eclesiástico</h6>
            <div class="field"><strong>Año:</strong> ${formData.ano_registro_eclesiastico || 'Desconocido'}</div>
            <div class="field"><strong>Tomo:</strong> ${formData.tomo_registro_eclesiastico || 'Desconocido'}</div>
            <div class="field"><strong>Página:</strong> ${formData.pagina_registro_eclesiastico || 'Desconocida'}</div>
            <div class="field"><strong>Acta:</strong> ${formData.acta_registro_eclesiastico || 'Desconocida'}</div>
    
            <h6>Registro Civil</h6>
            <div class="field"><strong>Año:</strong> ${formData.ano_registro_civil || 'Desconocido'}</div>
            <div class="field"><strong>Tomo:</strong> ${formData.tomo_registro_civil || 'Desconocido'}</div>
            <div class="field"><strong>Página:</strong> ${formData.pagina_registro_civil || 'Desconocida'}</div>
            <div class="field"><strong>Acta:</strong> ${formData.acta_registro_civil || 'Desconocida'}</div>
            <div class="field"><strong>Cédula:</strong> ${formData.cedula_registro_civil || 'Desconocida'}</div>
    
            <div class="field"><strong>Nota:</strong> ${formData.nota || 'Sin nota'}</div>
    
            <div class="footer">Firma: ______________________</div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
  };

  const handleGetData = async () => {
    try {
      const response = await axios.get('https://register-production.up.railway.app/bautizos/');
      alert('Datos obtenidos exitosamente');
      console.log('Datos:', response.data);
    } catch (error) {
      console.error('Error al obtener los datos', error);
      alert('Error al obtener los datos');
    }
  };

  return (
    <Container>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Home
        </Button>
      </Toolbar>

      <Typography variant="h4" gutterBottom>Llenar Datos del Registro</Typography>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <TextField
            key={key}
            label={key.replace(/_/g, ' ').toUpperCase()}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type={key.includes('fecha') ? 'date' : 'text'}
            InputLabelProps={key.includes('fecha') ? { shrink: true } : undefined}
          />
        ))}
        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: '20px' }}>
          Guardar Datos
        </Button>
      </form>

      <Button variant="contained" color="secondary" onClick={handlePrint} sx={{ marginTop: '20px' }}>
        Imprimir Certificado
      </Button>

      <Button
        variant="contained"
        color="info"
        onClick={() => navigate('/DetalleBautizo')}
        style={{ marginLeft: '10px' }}
      >
        Ver Registros
      </Button>
    </Container>
  );
}

export default FormularioRegistro;
