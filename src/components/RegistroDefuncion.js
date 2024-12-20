import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Toolbar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


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
      <title>Certificado de Defunción</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 18px;
        }
        .container {
          width: 600px;
          margin: auto;
          padding: 20px;
          border-radius: 10px;
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
          text-align: left;
          font-size: 14px;
          padding-right: 10px;
        }
        .line {
          display: inline-block;
          width: 300px;
          border-bottom: 1px solid #000;
          text-align: center;
          font-size: 15px;
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
        .spacer {
        height: 50px;
        }
        .header-space {
          height: 20px;
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
        <h4>CERTIFICADO DE DEFUNCIÓN</h4>
        <div class="header-space"></div>

        <div class="field">
          <strong>Nombre del Fallecido:</strong><span class="line">${registro.nombre || 'Desconocido'}</span>
        </div>
        <div class="field">
          <strong>Estado Civil:</strong><span class="line">${registro.estado_civil || 'Desconocido'}</span>
        </div>
        <div class="field">
          <strong>Edad:</strong><span class="line">${registro.edad || 'Desconocida'}</span>
        </div>
        <div class="field">
          <strong>Lugar de Defunción:</strong><span class="line">${registro.lugar_fallecimiento || 'Desconocido'}</span>
        </div>
        <div class="field">
          <strong>Causa de Defunción:</strong><span class="line">${registro.causa_fallecimiento || 'Desconocida'}</span>
        </div>
    <div class="header-space"></div>

        <h4>Registro Eclesiástico</h4>
        <div class="header-space"></div>

        <div class="field">
          <strong>Año:</strong><span class="line">${registro.ano_registro_eclesiastico || 'Desconocido'}</span>
          <strong>Tomo:</strong><span class="line">${registro.tomo || 'Desconocido'}</span>
        </div>
        <div class="field">
          <strong>Página:</strong><span class="line">${registro.pagina || 'Desconocida'}</span>
          <strong>Acta:</strong><span class="line">${registro.acta || 'Desconocida'}</span>
        </div>
    <div class="header-space"></div>

        <h4>Registro Civil</h4>
        <div class="header-space"></div>

        <div class="field">
          <strong>Acta:</strong><span class="line">${registro.datos_registro_civil_acta || 'Desconocida'}</span>
          <strong>Tomo:</strong><span class="line">${registro.datos_registro_civil_tomo || 'Desconocido'}</span>
        </div>
        <div class="field">
          <strong>Página:</strong><span class="line">${registro.datos_registro_civil_pagina || 'Desconocida'}</span>
        </div>

        <div class="field">
          <strong>Fecha de Emisión del Certificado:</strong><span class="line">${registro.fecha_emision_certificado_defuncion || 'Desconocida'}</span>
        </div>
            <div class="header-space"></div>

        <div class="signature">
          <div class="signature-line"></div>
          <p><strong>Párroco</strong></p>
        </div>

        <div class="footer">
          <strong>Socarte, a</strong> 
          <span id="dia"></span> de <span id="mes"></span> del año <span id="anio"></span>
        </div>

        <div class="note">
          <strong>Nota:</strong> <span>${registro.nota || '_________________'}</span>
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
