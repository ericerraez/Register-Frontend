import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import fondo from '../assets/fondo.png'

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
    const printWindow = window.open('', '', 'height=600,width=700');
    const content = `
     <html>
  <head>
    <title>Certificado de Bautismo</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0px;
        line-height: 1.4;
        padding: 20px;
      }
      .container {
        width: 600px;
        margin: auto;
        padding: 20px;
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
        margin: 8px 0;
      }
      .field strong {
        display: inline-block;
        width: 160px;
        font-size: 14px;
      }
      .line {
        display: inline-block;
        width: 300px;
        border-bottom: 1px solid #000;
        font-size: 14px;
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
    </style>
  </head>
  <body>
    <div class="container">
      <img src="${logo}" class="logo" alt="Logo" />
      <h4>DIOCESIS DE AZOGUES</h4>
      <h4>PARROQUIA "INMACULADA CONCEPCION" DE SOCARTE</h4>
      <h4>GENERAL MORALES - CAÑAR - ECUADOR</h4>
      <h5><strong>CERTIFICADO DE BAUTISMO</strong></h5>
      
      <div class="field">
        <strong>De:</strong> <span class="line">${formData.nombre || '_________________'}</span>
      </div>
      <div class="field">
        <strong>Fecha de bautismo:</strong> 
          <span class="line">${formData.fecha_bautizo || '_________________'}</span>
      </div>
      <div class="field">
        <strong>Hijo(a) de:</strong> <span class="line">${formData.padre || '_________________'}</span>
      </div>
      <div class="field">
        <strong>Y de:</strong> <span class="line">${formData.madre || '_________________'}</span>
      </div>
      <div class="field">
        <strong>Lugar de nacimiento:</strong> <span class="line">${formData.lugar_nacimiento || '_________________'}</span>
      </div>
      <div class="field">
        <strong>Fecha de nacimiento:</strong> <span class="line">${formData.fecha_nacimiento || '_________________'}</span>
      </div>
      <div class="field">
        <strong>Padrinos:</strong> <span class="line">${formData.padrinos || '_________________'}</span>
      </div>
      <div class="field">
        <strong>Celebrante:</strong> <span class="line">${formData.celebrante || '_________________'}</span>
      </div>

      <h5>Registro eclesiástico</h5>
      <div class="field">
        <strong>Año:</strong> <span class="line">${formData.ano_registro_eclesiastico || '__________'}</span>
        <strong>Tomo:</strong> <span class="line">${formData.tomo_registro_eclesiastico || '__________'}</span>
        <strong>Página:</strong> <span class="line">${formData.pagina_registro_eclesiastico || '__________'}</span>
        <strong>Acta:</strong> <span class="line">${formData.acta_registro_eclesiastico || '__________'}</span>
      </div>

      <h5>Registro civil</h5>
      <div class="field">
        <strong>Año:</strong> <span class="line">${formData.ano_registro_civil || '__________'}</span>
        <strong>Tomo:</strong> <span class="line">${formData.tomo_registro_civil || '__________'}</span>
        <strong>Página:</strong> <span class="line">${formData.pagina_registro_civil || '__________'}</span>
        <strong>Acta:</strong> <span class="line">${formData.acta_registro_civil || '__________'}</span>
      </div>
      <div class="field">
        <strong>Cédula:</strong> <span class="line">${formData.cedula_registro_civil || '__________'}</span>
      </div>

      <div class="field">
        <strong>Nota:</strong> <span class="line">${formData.nota || '________________________________________'}</span>
      </div>

      <div class="footer">
        <strong>Socarte, a</strong> 
        <span id="dia"></span> de 
        <span id="mes"></span> del año
        <span id="anio"></span>
      </div>

      <div class="signature">
        <p><strong>Parroco</strong></p>
        <div class="line"></div>
      </div>
    </div>

    <script>
  window.onload = function () {
    const fecha = new Date();
    const dia = fecha.getDate();
    
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    
    const mes = meses[fecha.getMonth()];  
    const anio = fecha.getFullYear();  // Aquí obtenemos el año completo sin modificaciones.

    // Actualizamos el contenido de los elementos con el id correspondiente
    document.getElementById('dia').textContent = dia;
    document.getElementById('mes').textContent = mes;
    document.getElementById('anio').textContent = anio;  // Aquí usamos el año completo directamente.

    // Imprimimos el documento
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
