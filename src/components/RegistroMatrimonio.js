import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Toolbar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


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
            body {
              font-family: Arial, sans-serif;
              font-size: 18px;
            }
            .container {
              max-width: 600px;
              margin: auto;
              padding: 20px;
              border-radius: 10px;
            }
            h4, h5 {
              text-align: center;
              margin: 5px 0;
              font-weight: normal;
              font-size: 22px;
            }
            .field {
              margin: 10px 0;
              display: flex;
              align-items: center;
            }
            .field strong {
              display: inline-block;
              width: 160px;
              text-align: left;
              font-size: 16px;
              padding-right: 10px;
            }
            .line {
              display: inline-block;
              width: 300px;
              border-bottom: 1px solid #000;
              text-align: center;
              font-size: 16px;
              padding: 5px 0;
            }
            .footer {
              text-align: right;
              margin-top: 30px;
              font-size: 14px;
            }
            .signature {
              text-align: center;
              margin-top: 40px;
            }
            .signature-line {
              width: 200px;
              border-top: 1px solid #000;
              margin: 0 auto;
            }
            .header-space {
              height: 60px;
            }
            .note {
              text-align: left;
              margin-top: 20px;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h4>REGISTRO DE MATRIMONIO</h4>
            <div class="header-space"></div>
  
            <div class="field">
              <strong>Cónyuges:</strong><span class="line">${formData.conyuges || 'Desconocidos'}</span>
            </div>
            <div class="field">
              <strong>Fecha de Matrimonio:</strong><span class="line">${formData.fecha_matrimonio || 'Desconocida'}</span>
            </div>
            <div class="field">
              <strong>Testigos:</strong><span class="line">${formData.testigos || 'Desconocidos'}</span>
            </div>
            <div class="field">
              <strong>Padrinos:</strong><span class="line">${formData.padrinos || 'Desconocidos'}</span>
            </div>
            <div class="field">
              <strong>Celebrante:</strong><span class="line">${formData.celebrante || 'Desconocido'}</span>
            </div>
  
            <div class="header-space"></div>
  
            <h5>Registro Eclesiástico</h5>
  
            <div class="header-space"></div>
            <div class="field">
              <strong>Año:</strong><span class="line">${formData.ano_registro_eclesiastico || '__________'}</span>
              <strong>Tomo:</strong><span class="line">${formData.tomo_registro_eclesiastico || '__________'}</span>
              <strong>Página:</strong><span class="line">${formData.pagina_registro_eclesiastico || '__________'}</span>
              <strong>Acta:</strong><span class="line">${formData.acta_registro_eclesiastico || '__________'}</span>
            </div>
  
            <div class="header-space"></div>
  
            <h5>Registro Civil</h5>
            <div class="header-space"></div>
  
            <div class="field">
              <strong>Año:</strong><span class="line">${formData.ano_registro_civil || '__________'}</span>
              <strong>Tomo:</strong><span class="line">${formData.tomo_registro_civil || '__________'}</span>
              <strong>Página:</strong><span class="line">${formData.pagina_registro_civil || '__________'}</span>
              <strong>Acta:</strong><span class="line">${formData.acta_registro_civil || '__________'}</span>
            </div>
  
            <div class="header-space"></div>
  
            <div class="footer">
              <strong>Socarte, a</strong>
              <span id="dia"></span> de <span id="mes"></span> del año <span id="anio"></span>
            </div>
            <div class="header-space"></div>
  
            <div class="signature">
              <div class="signature-line"></div>
              <p><strong>Párroco</strong></p>
            </div>
  
            <div class="note">
              <strong>Nota:</strong> <span>${formData.nota || '_________________'}</span>
            </div>
          </div>
  
          <script>
            window.onload = function () {
              const fecha = new Date();
              const dia = fecha.getDate();
              const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
              const mes = meses[fecha.getMonth()];
              const anio = fecha.getFullYear();
  
              document.getElementById('dia').textContent = dia;
              document.getElementById('mes').textContent = mes;
              document.getElementById('anio').textContent = anio;
  
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
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
