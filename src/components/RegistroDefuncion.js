import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Toolbar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

function RegistroDefuncion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    estado_civil: '',
    edad: '',
    lugar_fallecimiento: '',
    causa_fallecimiento: '',
    parroco: '',
    ano_registro_eclesiastico: '',
    tomo: '',
    pagina: '',
    acta: '',
    datos_registro_civil_ano: 2024,
    datos_registro_civil_tomo: '',
    datos_registro_civil_pagina: '',
    datos_registro_civil_acta: '',
    fecha_emision_certificado_defuncion: '',
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
      await axios.post('https://register-production.up.railway.app/defunciones/', formData);
      alert('Datos guardados exitosamente');
      navigate('/');
    } catch (error) {
      console.error('Error al guardar los datos', error);
      alert('Error al guardar los datos');
    }
  };

  const handlePrint = (registro) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const content = `
      <html>
        <head>
          <title>Registro de Defunción</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h4 { text-align: center; }
            .content { margin-top: 30px; }
            .content p { margin: 5px 0; }
            .label { font-weight: bold; }
            .value { margin-left: 10px; }
            .field { margin-bottom: 10px; }
            .footer { margin-top: 30px; text-align: right; font-size: 14px; }
            .logo { width: 200px; height: auto; display: block; margin-left: auto; margin-right: auto; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="content">
            <img src="${logo}" class="logo" alt="Logo" />
            <h1>REGISTRO DE DEFUNCIÓN</h1>
            <h4>DIOCESIS DE AZOGES</h4>
            <h4>PARROQUIA "INMACULADA CONCEPCION" DE SOCARTE</h4>
            <h4>GENERAL MORALES - CANAR - ECUADOR</h4>
    
            <div class="field"><span class="label">Nombre del Fallecido:</span><span class="value"> ${registro.nombre || 'Desconocido'}</span></div>
            <div class="field"><span class="label">Estado Civil:</span><span class="value"> ${registro.estado_civil || 'Desconocido'}</span></div>
            <div class="field"><span class="label">Edad:</span><span class="value"> ${registro.edad || 'Desconocida'}</span></div>
            <div class="field"><span class="label">Lugar de Defunción:</span><span class="value"> ${registro.lugar_fallecimiento || 'Desconocido'}</span></div>
            <div class="field"><span class="label">Causa de Defunción:</span><span class="value"> ${registro.causa_fallecimiento || 'Desconocida'}</span></div>
    
            <h4>Registro Eclesiástico</h4>
            <div class="field"><span class="label">Año:</span><span class="value"> ${registro.ano_registro_eclesiastico || 'Desconocido'}</span></div>
            <div class="field"><span class="label">Tomo:</span><span class="value"> ${registro.tomo || 'Desconocido'}</span></div>
            <div class="field"><span class="label">Página:</span><span class="value"> ${registro.pagina || 'Desconocida'}</span></div>
            <div class="field"><span class="label">Acta:</span><span class="value"> ${registro.acta || 'Desconocida'}</span></div>
    
            <h4>Registro Civil</h4>
            <div class="field"><span class="label">Acta:</span><span class="value"> ${registro.datos_registro_civil_acta || 'Desconocida'}</span></div>
            <div class="field"><span class="label">Tomo:</span><span class="value"> ${registro.datos_registro_civil_tomo || 'Desconocido'}</span></div>
            <div class="field"><span class="label">Página:</span><span class="value"> ${registro.datos_registro_civil_pagina || 'Desconocida'}</span></div>
    
            <div class="field"><span class="label">Fecha de Emisión del Certificado:</span><span class="value"> ${registro.fecha_emision_certificado_defuncion || 'Desconocida'}</span></div>
            <div class="field"><span class="label">Párroco:</span><span class="value"> ${registro.parroco || 'Desconocido'}</span></div>
            <div class="field"><span class="label">Nota:</span><span class="value"> ${registro.nota || 'Sin nota'}</span></div>
          </div>
    
          <div class="footer">Firma: ______________________</div>
    
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
  
  return (
    <Container>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Home
        </Button>
      </Toolbar>

      <Typography variant="h4" gutterBottom>Formulario de Registro de Defunción</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Estado Civil" name="estado_civil" value={formData.estado_civil} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Edad" name="edad" value={formData.edad} onChange={handleChange} fullWidth margin="normal" type="number" />
        <TextField label="Lugar de Fallecimiento" name="lugar_fallecimiento" value={formData.lugar_fallecimiento} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Causa de Fallecimiento" name="causa_fallecimiento" value={formData.causa_fallecimiento} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Párroco" name="parroco" value={formData.parroco} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Año Registro Eclesiástico" name="ano_registro_eclesiastico" value={formData.ano_registro_eclesiastico} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Tomo" name="tomo" value={formData.tomo} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Página" name="pagina" value={formData.pagina} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Acta" name="acta" value={formData.acta} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Año Registro Civil" name="datos_registro_civil_ano" value={formData.datos_registro_civil_ano} onChange={handleChange} fullWidth margin="normal" type="number" />
        <TextField label="Tomo Registro Civil" name="datos_registro_civil_tomo" value={formData.datos_registro_civil_tomo} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Página Registro Civil" name="datos_registro_civil_pagina" value={formData.datos_registro_civil_pagina} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Acta Registro Civil" name="datos_registro_civil_acta" value={formData.datos_registro_civil_acta} onChange={handleChange} fullWidth margin="normal" />
        <TextField
          label="Fecha de Emisión del Certificado"
          name="fecha_emision_certificado_defuncion"
          value={formData.fecha_emision_certificado_defuncion}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="date"
        />
        <TextField label="Nota" name="nota" value={formData.nota} onChange={handleChange} fullWidth margin="normal" />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
            Guardar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: '20px' }}
            onClick={() => handlePrint(formData)}
          >
            Imprimir
          </Button>
          <Button
          variant="contained"
          color="info"
          onClick={() => navigate('/DetalleDefuncion')}
          style={{ marginLeft: '10px' }}
        >
          Ver Registros
        </Button>
        </Box>
      </form>
    </Container>
  );
}

export default RegistroDefuncion;
