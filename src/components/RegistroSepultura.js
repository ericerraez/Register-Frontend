import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Toolbar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

function RegistroSepultura() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    estado_civil: '',
    nombre: '',
    edad: '',
    fecha_fallecimiento: '',
    motivo_fallecimiento: '',
    parroco: '',
    fecha_sepultura: '',
    ano_registro_eclesiastico: '',
    tomo: '',
    pagina: '',
    acta: '',
    datos_registro_civil_ano: '',
    datos_registro_civil_tomo: '',
    datos_registro_civil_pagina: '',
    datos_registro_civil_acta: '',
    fecha_emision_certificado_sepultura: '',
    parroco_certificado: '',
    nota: ''
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
      await axios.post('https://register-production.up.railway.app/sepulturas/', formData);
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
          <title>Imprimir Certificado de Sepultura</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h4 { text-align: center; margin-top: 10px; }
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
            <h4>DIOCESIS DE AZOGES</h4>
            <h4>PARROQUIA "INMACULADA CONCEPCION"</h4>
            <h4>GENERAL MORALES - CANAR - ECUADOR</h4>
            <h4>CERTIFICADO DE SEPULTURA</h4>
  
            <div class="field"><strong>Nombre:</strong> ${registro.nombre || 'Desconocido'}</div> <!-- Aquí se agrega el campo Nombre -->
            <div class="field"><strong>Estado Civil:</strong> ${registro.estado_civil || 'Desconocido'}</div>
            <div class="field"><strong>Edad:</strong> ${registro.edad || 'Desconocida'}</div>
            <div class="field"><strong>Fecha de Fallecimiento:</strong> ${registro.fecha_fallecimiento || 'Desconocida'}</div>
            <div class="field"><strong>Motivo de Fallecimiento:</strong> ${registro.motivo_fallecimiento || 'Desconocido'}</div>
            <div class="field"><strong>Parroco:</strong> ${registro.parroco || 'Desconocido'}</div>
            <div class="field"><strong>Fecha de Sepultura:</strong> ${registro.fecha_sepultura || 'Desconocida'}</div>
  
            <h6>Registro Eclesiástico</h6>
            <div class="field"><strong>Año:</strong> ${registro.ano_registro_eclesiastico || 'Desconocido'}</div>
            <div class="field"><strong>Tomo:</strong> ${registro.tomo || 'Desconocido'}</div>
            <div class="field"><strong>Página:</strong> ${registro.pagina || 'Desconocida'}</div>
            <div class="field"><strong>Acta:</strong> ${registro.acta || 'Desconocida'}</div>
  
            <h6>Registro Civil</h6>
            <div class="field"><strong>Año:</strong> ${registro.datos_registro_civil_ano || 'Desconocido'}</div>
            <div class="field"><strong>Tomo:</strong> ${registro.datos_registro_civil_tomo || 'Desconocido'}</div>
            <div class="field"><strong>Página:</strong> ${registro.datos_registro_civil_pagina || 'Desconocida'}</div>
            <div class="field"><strong>Acta:</strong> ${registro.datos_registro_civil_acta || 'Desconocida'}</div>
  
            <div class="field"><strong>Fecha de Emisión:</strong> ${registro.fecha_emision_certificado_sepultura || 'Desconocida'}</div>
            <div class="field"><strong>Párroco:</strong> ${registro.parroco_certificado || 'Desconocido'}</div>
            <div class="field"><strong>Nota:</strong> ${registro.nota || 'Sin nota'}</div>
  
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
  


  return (
    <Container>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Home
        </Button>
      </Toolbar>

      <Typography variant="h4" gutterBottom>
        Formulario de Registro de Sepultura
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Estado Civil" name="estado_civil" value={formData.estado_civil} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Edad" name="edad" value={formData.edad} onChange={handleChange} fullWidth margin="normal" type="number" />
        <TextField label="Fecha de Fallecimiento" name="fecha_fallecimiento" value={formData.fecha_fallecimiento} onChange={handleChange} fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} />
        <TextField label="Motivo de Fallecimiento" name="motivo_fallecimiento" value={formData.motivo_fallecimiento} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Parroco" name="parroco" value={formData.parroco} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Fecha de Sepultura" name="fecha_sepultura" value={formData.fecha_sepultura} onChange={handleChange} fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} />
        <TextField label="Año Registro Eclesiástico" name="ano_registro_eclesiastico" value={formData.ano_registro_eclesiastico} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Tomo Registro Eclesiástico" name="tomo" value={formData.tomo} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Página Registro Eclesiástico" name="pagina" value={formData.pagina} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Acta Registro Eclesiástico" name="acta" value={formData.acta} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Año Registro Civil" name="datos_registro_civil_ano" value={formData.datos_registro_civil_ano} onChange={handleChange} fullWidth margin="normal" type="number" />
        <TextField label="Tomo Registro Civil" name="datos_registro_civil_tomo" value={formData.datos_registro_civil_tomo} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Página Registro Civil" name="datos_registro_civil_pagina" value={formData.datos_registro_civil_pagina} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Acta Registro Civil" name="datos_registro_civil_acta" value={formData.datos_registro_civil_acta} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Fecha de Emisión" name="fecha_emision_certificado_sepultura" value={formData.fecha_emision_certificado_sepultura} onChange={handleChange} fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} />
        <TextField label="Parroco Certificado" name="parroco_certificado" value={formData.parroco_certificado} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Nota" name="nota" value={formData.nota} onChange={handleChange} fullWidth margin="normal" />

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
          <Button type="button" variant="outlined" onClick={() => handlePrint(formData)}>
            Imprimir Certificado
          </Button>
          <Button
          variant="contained"
          color="info"
          onClick={() => navigate('/DetalleSepultura')}
          style={{ marginLeft: '10px' }}
        >
          Ver Registros
        </Button>
        </Box>
      </form>
    </Container>
  );
}

export default RegistroSepultura;
