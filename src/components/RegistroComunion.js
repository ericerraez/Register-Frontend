import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegistroComunion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    padre: '',
    madre: '',
    celebrante: '',
    fecha_registro: '',
    padrinos: '',
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
    const printWindow = window.open('', '', 'height=600,width=700');
    const content = `
       <html>
   <head>
     <title>Certificado de Primera Comunión</title>
     <style>
       body {
         font-family: Arial, sans-serif;
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
         font-size: 22px; /* Tamaño aumentado */
       }
       .field {
         margin: 8px 0;
         display: flex;
         justify-content: space-between;
         align-items: center;
       }
       .field strong {
         display: inline-block;
         width: 160px;
         font-size: 18px
         text-align: left;
       }
       .line {
         display: inline-block;
         width: 300px;
         border-bottom: 1px solid #000;
         font-size: 16px; /* Tamaño aumentado */
         text-align: center;
       }
       .footer {
         text-align: right;
         margin-top: 30px;
         font-size: 16px; /* Tamaño aumentado */
       }
       .signature {
         text-align: center;
         margin-top: 40px;
       }
       .signature-line {
         border-bottom: 1px solid #000;
         width: 200px;
         margin: 0 auto 5px;
       }
       .header-space {
         height: 60px;
       }
     </style>
   </head>
   <body>
   <div class="container">
    <h4>CERTIFICADO DE PRIMERA COMUNIÓN</h4>
    <div class="spacer"></div>
     <div class="container">
       <div class="header-space"></div>
  
          <div class="field">
            <strong>Nombre:</strong> <span class="line">${formData.nombre || '_________________'}</span>
          </div>
          <div class="field">
            <strong>Fecha de Registro:</strong> <span class="line">${formData.fecha_registro || '_________________'}</span>
          </div>
          <div class="field">
            <strong>Padre:</strong> <span class="line">${formData.padre || '_________________'}</span>
          </div>
          <div class="field">
            <strong>Madre:</strong> <span class="line">${formData.madre || '_________________'}</span>
          </div>
          <div class="field">
            <strong>Celebrante:</strong> <span class="line">${formData.celebrante || '_________________'}</span>
          </div>
          <div class="field">
            <strong>Padrinos:</strong> <span class="line">${formData.padrinos || '_________________'}</span>
          </div>
              <div class="header-space"></div>

          <h5>Registro eclesiástico</h5>
          <div class="field">
            <strong>Año:</strong> <span class="line">${formData.ano_registro_eclesiastico || '__________'}</span>
            <strong>Tomo:</strong> <span class="line">${formData.tomo || '__________'}</span>
            <strong>Página:</strong> <span class="line">${formData.pagina || '__________'}</span>
            <strong>Acta:</strong> <span class="line">${formData.acta || '__________'}</span>
          </div>
              <div class="header-space"></div>

          <h5>Registro Civil</h5>
          <div class="field">
            <strong>Año:</strong> <span class="line">${formData.datos_registro_civil_acta || '__________'}</span>
            <strong>Tomo:</strong> <span class="line">${formData.datos_registro_civil_tomo || '__________'}</span>
            <strong>Página:</strong> <span class="line">${formData.datos_registro_civil_pagina || '__________'}</span>
          </div>
          <div class="field">
            <strong>Fecha de Emisión:</strong> <span class="line">${formData.fecha_emision || '_________________'}</span>
          </div>
          <div class="header-space"></div>
        <div class="signature">
      <div class="signature-line"></div>
      <p><strong>Párroco</strong></p>
    </div>
       
          <div class="header-space"></div>

       <div class="footer">
         <strong>Socarte, a</strong>
         <span id="dia"></span> de <span id="mes"></span> del año <span id="anio"></span>
       </div>
     </div>
               <div class="header-space"></div>

          <div class="field">
            <strong>Nota:</strong> <span class="line">${formData.nota || '________________________________________'}</span>
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
        <TextField label="Padrinos" name="padrinos" value={formData.padrinos} onChange={handleChange} fullWidth margin="normal" />

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
