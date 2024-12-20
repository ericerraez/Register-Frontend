import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Toolbar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function RegistroSepultura() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    estado_civil: '',
    nombre: '',
    edad: '',
    fecha_fallecimiento: '',
    motivo_fallecimiento: '',
    parroco: '',
    lugar:'',
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
    const printWindow = window.open('', '', 'height=600,width=700');
    const content = `
      <html>
        <head>
          <title>Certificado de Sepultura</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 18px;
            }
            .container {
              width: 600px;
              margin: auto;
              padding: 20px;
              background: rgba(255, 255, 255, 0.8);
              border-radius: 10px;
            }
            .logo {
              width: 120px;
              height: auto;
              display: block;
              margin: 0 auto 10px auto;
            }
            h4, h5 {
              text-align: center;
              margin: 5px 0;
              font-weight: normal;
              font-size: 18px;
            }
            .field {
              margin: 10px 0;
              display: flex;
              align-items: center;
            }
            .field strong {
              display: inline-block;
              width: 160px;
              font-size: 15px;
              padding-right: 10px;
            }
            .field .line {
              display: inline-block;
              width: 300px;
              border-bottom: 1px solid #000;
              font-size: 15px;
              padding: 5px 0;
            }
            .line {
              display: inline-block;
              width: 300px;
              border-bottom: 1px solid #000;
              font-size: 15px;
              padding: 5px 0;
            }
            .footer {
              text-align: right;
              margin-top: 30px;
              font-size: 14px;
            }
            .signature-line {
              width: 200px;
              border-top: 1px solid #000;
              margin: 0 auto;
            }
            .signature p {
              text-align: center; 
              margin: 0;
            }
            .header-space {
              height: 20px;
            }
            .spacer {
            height: 60px;
            }
            .note {
              text-align: left;
              margin-top: 20px;
              font-size: 15px;
            }
          </style>
        </head>
        <body>
          <div class="spacer"></div>
      <div class="container">        
        <div class="spacer"></div>
            <h4>CERTIFICADO DE SEPULTURA</h4>
            <div class="header-space"></div>
    
            <div class="field">
              <strong>Nombre:</strong><span class="line">${registro.nombre || '_________________'}</span>
            </div>
            <div class="field">
              <strong>Estado Civil:</strong><span class="line">${registro.estado_civil || '_________________'}</span>
            </div>
            <div class="field">
              <strong>Edad:</strong><span class="line">${registro.edad || '_________________'}</span>
            </div>
            <div class="field">
              <strong>Fecha de Fallecimiento:</strong><span class="line">${registro.fecha_fallecimiento || '_________________'}</span>
            </div>
            <div class="field">
              <strong>A causa De:</strong><span class="line">${registro.motivo_fallecimiento || '_________________'}</span>
            </div>
            <div class="header-space"></div>
  
            <div class="field">
              <div>Después de la celebración eucarística de exequias, se dio cristiana sepultura a sus restos mortales en el cementerio:</div> 
              <span class="line">${registro.parroco}</span> <strong>El día</strong> <span>${registro.fecha_sepultura || '_________________'}</span>
            </div>
            <div class="header-space"></div>
  
            <h5>Registro Eclesiástico</h5>
            <div class="field">
              <strong>Año:</strong><span class="line">${registro.ano_registro_eclesiastico || '__________'}</span>
              <strong>Tomo:</strong><span class="line">${registro.tomo || '__________'}</span>
              <strong>Página:</strong><span class="line">${registro.pagina || '__________'}</span>
              <strong>Acta:</strong><span class="line">${registro.acta || '__________'}</span>
            </div>
            <div class="header-space"></div>
  
            <h5>Registro Civil</h5>
            <div class="field">
              <strong>Año:</strong><span class="line">${registro.datos_registro_civil_ano || '__________'}</span>
              <strong>Tomo:</strong><span class="line">${registro.datos_registro_civil_tomo || '__________'}</span>
              <strong>Página:</strong><span class="line">${registro.datos_registro_civil_pagina || '__________'}</span>
              <strong>Acta:</strong><span class="line">${registro.datos_registro_civil_acta || '__________'}</span>
            </div>
    
            <div class="field">
              <strong>Fecha de Emisión:</strong><span class="line">${registro.fecha_emision_certificado_sepultura || '__________'}</span>
            </div>
    
            <div class="footer">
              <strong>Fecha:</strong>
              <span id="dia"></span> de 
              <span id="mes"></span> del año
              <span id="anio"></span>
            </div>
            <div class="header-space"></div>
  
            <div class="signature">
              <div class="signature-line"></div>
              <p><strong>Párroco</strong></p>
            </div>
  
            <div class="header-space"></div>
  
            <div class="field">
              <strong>Nota:</strong><span class="line">${registro.nota || '________________________________________'}</span>
            </div>
          </div>
          <div class="header-space"></div>
  
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
        <TextField label="Lugar de Sepultura" name="parroco" value={formData.parroco} onChange={handleChange} fullWidth margin="normal" />
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
