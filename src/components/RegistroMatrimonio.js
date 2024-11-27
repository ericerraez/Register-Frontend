import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Toolbar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

function RegistroMatrimonio() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    conyuges: '',
    fecha_matrimonio: '',
    testigos: '',
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
      await axios.post('https://register-production.up.railway.app/matrimonios/', formData);
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
          <title>Imprimir Registro de Matrimonio</title>
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
            <h4>DIOCESIS DE AZOGES</h4>
            <h4>PARROQUIA "INMACULADA CONCEPCION" DE SOCARTE</h4>
            <h4>GENERAL MORALES - CANAR - ECUADOR</h4>
            <h4>CERTIFICADO DE MATRIMONIO</h4>
            <div class="field"><strong>Conyuges:</strong> ${formData.conyuges || 'Desconocidos'}</div>
            <div class="field"><strong>Fecha de Matrimonio:</strong> ${formData.fecha_matrimonio || 'Desconocida'}</div>
            <div class="field"><strong>Testigos:</strong> ${formData.testigos || 'Desconocidos'}</div>
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
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Container>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Home
        </Button>
      </Toolbar>

      <Typography variant="h4" gutterBottom>Formulario de Registro de Matrimonio</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Conyuges" name="conyuges" value={formData.conyuges} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Fecha de Matrimonio" name="fecha_matrimonio" value={formData.fecha_matrimonio} onChange={handleChange} fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} />
        <TextField label="Testigos" name="testigos" value={formData.testigos} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Padrinos" name="padrinos" value={formData.padrinos} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Celebrante" name="celebrante" value={formData.celebrante} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Año Registro Eclesiástico" name="ano_registro_eclesiastico" value={formData.ano_registro_eclesiastico} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Tomo Registro Eclesiástico" name="tomo_registro_eclesiastico" value={formData.tomo_registro_eclesiastico} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Página Registro Eclesiástico" name="pagina_registro_eclesiastico" value={formData.pagina_registro_eclesiastico} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Acta Registro Eclesiástico" name="acta_registro_eclesiastico" value={formData.acta_registro_eclesiastico} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Año Registro Civil" name="ano_registro_civil" value={formData.ano_registro_civil} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Tomo Registro Civil" name="tomo_registro_civil" value={formData.tomo_registro_civil} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Página Registro Civil" name="pagina_registro_civil" value={formData.pagina_registro_civil} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Acta Registro Civil" name="acta_registro_civil" value={formData.acta_registro_civil} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Nota" name="nota" value={formData.nota} onChange={handleChange} fullWidth margin="normal" />

        <Box sx={{ marginTop: '20px' }}>
          <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>Guardar</Button>
          <Button variant="outlined" color="secondary" onClick={handlePrint}>Imprimir</Button>
          <Button
          variant="contained"
          color="info"
          onClick={() => navigate('/DetalleMatrimonio')}
          style={{ marginLeft: '10px' }}
        >
          Ver Registros
        </Button>
        </Box>
      </form>
    </Container>
  );
}

export default RegistroMatrimonio;
