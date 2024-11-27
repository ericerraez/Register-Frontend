import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

function RegistroComunion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    padre: '',
    madre: '',
    celebrante: '',
    fecha_registro: '',
    ano_registro_eclesiastico: '',
    tomo: '',
    pagina: '',
    acta: '',
    datos_registro_civil_acta: '',
    datos_registro_civil_tomo: '',
    datos_registro_civil_pagina: '',
    fecha_emision_certificado: '',
    parroco: '',
    nota: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fechaExpedicion = new Date().toLocaleString();
    const dataToSend = { ...formData, fechaExpedicion };
    console.log('Enviando datos:', dataToSend);

    try {
      await axios.post('https://register-production.up.railway.app/comuniones/', dataToSend);
      alert('Datos guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar los datos', error);
      alert('Error al guardar los datos');
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir Registro de Comunión</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h4 { text-align: center; }
            h6 { margin-top: 20px; font-weight: bold; }
            .field { margin: 5px 0; }
            .container { max-width: 600px; margin: auto; }
            .footer { margin-top: 30px; text-align: right; }
            .logo { width: 200px; height: auto; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto; }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${logo}" class="logo" alt="Logo" />
            <h4>DIOCESIS DE AZOGES</h4>
            <h4>PARROQUIA "INMACULADA CONCEPCION" DE SOCARTE</h4>
            <h4>GENERAL MORALES - CANAR - ECUADOR</h4>
            <h4>CERTIFICADO DE PRIMERA COMUNION</h4>
            
            <div class="field"><strong>Nombre:</strong> ${formData.nombre || 'Desconocido'}</div>
            <div class="field"><strong>Fecha de Registro:</strong> ${formData.fecha_registro || 'Desconocida'}</div>
            <div class="field"><strong>Padre:</strong> ${formData.padre || 'Desconocido'}</div>
            <div class="field"><strong>Madre:</strong> ${formData.madre || 'Desconocida'}</div>
            <div class="field"><strong>Celebrante:</strong> ${formData.celebrante || 'Desconocido'}</div>

            <h6>Registro Eclesiástico</h6>
            <div class="field"><strong>Año:</strong> ${formData.ano_registro_eclesiastico || 'Desconocido'}</div>
            <div class="field"><strong>Tomo:</strong> ${formData.tomo || 'Desconocido'}</div>
            <div class="field"><strong>Página:</strong> ${formData.pagina || 'Desconocida'}</div>
            <div class="field"><strong>Acta:</strong> ${formData.acta || 'Desconocida'}</div>

            <h6>Registro Civil</h6>
            <div class="field"><strong>Año:</strong> ${formData.datos_registro_civil_acta || 'Desconocido'}</div>
            <div class="field"><strong>Tomo:</strong> ${formData.datos_registro_civil_tomo || 'Desconocido'}</div>
            <div class="field"><strong>Página:</strong> ${formData.datos_registro_civil_pagina || 'Desconocida'}</div>

            <div class="field"><strong>Fecha de Emisión:</strong> ${formData.fecha_emision || 'Desconocida'}</div>
            <div class="field"><strong>Párroco:</strong> ${formData.parroco || 'Desconocido'}</div>
            <div class="field"><strong>Nota:</strong> ${formData.nota || 'Sin nota'}</div>

            <div class="footer">Firma: ______________________</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleGetData = async () => {
    try {
      const response = await axios.get('https://register-production.up.railway.app/comuniones/');
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

      <Typography variant="h4" gutterBottom>Llenar Datos del Registro de Comunión</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} fullWidth margin="normal" />
        
        <TextField
          label="Fecha de Registro"
          name="fecha_registro"
          value={formData.fecha_registro}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        
        <TextField label="Padre" name="padre" value={formData.padre} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Madre" name="madre" value={formData.madre} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Celebrante" name="celebrante" value={formData.celebrante} onChange={handleChange} fullWidth margin="normal" />

        <Typography variant="h6" gutterBottom>Registro Eclesiástico</Typography>
        <TextField label="Año" name="ano_registro_eclesiastico" value={formData.ano_registro_eclesiastico} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Tomo" name="tomo" value={formData.tomo} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Página" name="pagina" value={formData.pagina} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Acta" name="acta" value={formData.acta} onChange={handleChange} fullWidth margin="normal" />

        <Typography variant="h6" gutterBottom>Registro Civil</Typography>
        <TextField label="Año" name="ano_registro_civil" value={formData.ano_registro_civil} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Acta" name="datos_registro_civil_acta" value={formData.datos_registro_civil_acta} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Tomo" name="datos_registro_civil_tomo" value={formData.datos_registro_civil_tomo} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Página" name="datos_registro_civil_pagina" value={formData.datos_registro_civil_pagina} onChange={handleChange} fullWidth margin="normal" />

        <TextField
  label="Fecha de Emisión"
  name="fecha_emision"
  value={formData.fecha_emision}
  onChange={handleChange}
  fullWidth
  margin="normal"
  type="date"
  InputLabelProps={{ shrink: true }}
/>
        <TextField label="Párroco" name="parroco" value={formData.parroco} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Nota" name="nota" value={formData.nota} onChange={handleChange} fullWidth margin="normal" multiline rows={4} />

        <Button type="submit" variant="contained" color="primary">Guardar</Button>
      </form>

      <Button variant="contained" color="secondary" onClick={handlePrint} sx={{ mt: 2 }}>
        Imprimir
      </Button>
      
      <Button
          variant="contained"
          color="info"
          onClick={() => navigate('/DetalleComunion')}
          style={{ marginLeft: '10px' }}
        >
          Ver Registros
        </Button>
    </Container>
  );
}

export default RegistroComunion;
