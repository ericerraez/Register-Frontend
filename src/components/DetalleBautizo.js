import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DetalleBautizo() {
  const [registros, setRegistros] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await axios.get('https://register-production.up.railway.app/bautizos/');
        setRegistros(response.data);
      } catch (error) {
        console.error('Error al obtener los registros', error);
      }
    };
    fetchRegistros();
  }, []);

  const handlePrint = (registro) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const content = `
      <html>
        <head>
          <title>Certificado de Bautizo</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0px;
              line-height: 1.4;
              padding: 20px;
              background-image: url('https://github.com/ericerraez/Register-Frontend/blob/master/public/fondo.png?raw=true'); /* Ruta de la imagen de fondo */
              background-size: cover; /* Asegura que la imagen cubra toda la página */
              background-position: center; /* Centra la imagen de fondo */
            }
            .container {
              width: 600px;
              margin: auto;
              padding: 20px;
              background: rgba(255, 255, 255, 0.8); /* Fondo semi-transparente para que el texto sea legible */
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
            <h4>CERTIFICADO DE BAUTIZO</h4>
            <div class="field">
              <strong>Nombre:</strong> <span class="line">${registro.nombre || '_________________'}</span>
            </div>
            <div class="field">
              <strong>Fecha de Bautizo:</strong> <span class="line">${registro.fecha_bautizo || '_________________'}</span>
            </div>
            <div class="field">
              <strong>Fecha de Nacimiento:</strong> <span class="line">${registro.fecha_nacimiento || '_________________'}</span>
            </div>
            <div class="field">
              <strong>Lugar de Nacimiento:</strong> <span class="line">${registro.lugar_nacimiento || '_________________'}</span>
            </div>
            <div class="field">
              <strong>Padre:</strong> <span class="line">${registro.padre || '_________________'}</span>
            </div>
            <div class="field">
              <strong>Madre:</strong> <span class="line">${registro.madre || '_________________'}</span>
            </div>
            <div class="field">
              <strong>Padrinos:</strong> <span class="line">${registro.padrinos || '_________________'}</span>
            </div>
            <div class="field">
              <strong>Celebrante:</strong> <span class="line">${registro.celebrante || '_________________'}</span>
            </div>
    
            <h5>Registro Eclesiástico</h5>
            <div class="field">
              <strong>Año:</strong> <span class="line">${registro.ano_registro_eclesiastico || '__________'}</span>
              <strong>Tomo:</strong> <span class="line">${registro.tomo_registro_eclesiastico || '__________'}</span>
              <strong>Página:</strong> <span class="line">${registro.pagina_registro_eclesiastico || '__________'}</span>
              <strong>Acta:</strong> <span class="line">${registro.acta_registro_eclesiastico || '__________'}</span>
            </div>
    
            <h5>Registro Civil</h5>
            <div class="field">
              <strong>Año:</strong> <span class="line">${registro.ano_registro_civil || '__________'}</span>
              <strong>Tomo:</strong> <span class="line">${registro.tomo_registro_civil || '__________'}</span>
              <strong>Página:</strong> <span class="line">${registro.pagina_registro_civil || '__________'}</span>
              <strong>Acta:</strong> <span class="line">${registro.acta_registro_civil || '__________'}</span>
            </div>
            <div class="field">
              <strong>Cédula:</strong> <span class="line">${registro.cedula_registro_civil || '__________'}</span>
            </div>
    
            <div class="field">
              <strong>Nota:</strong> <span class="line">${registro.nota || '________________________________________'}</span>
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
  
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://register-production.up.railway.app/bautizos/${id}/`);
      setRegistros(registros.filter((registro) => registro.id !== id));
      alert('Registro eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el registro', error);
      alert('Error al eliminar el registro');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
        Lista de Registros
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        style={{ marginBottom: '20px' }}
      >
        Volver al Inicio
      </Button>
      <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell><b>ID</b></TableCell>
        <TableCell><b>Nombre </b></TableCell>
        <TableCell><b>Fecha de Nacimiento</b></TableCell>
        <TableCell><b>Fecha de Bautizo</b></TableCell>
        <TableCell><b>Padre</b></TableCell>
        <TableCell><b>Madre</b></TableCell>
        <TableCell><b>Acciones</b></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {registros.map((registro) => (
        <TableRow key={registro.id}>
          <TableCell>{registro.id}</TableCell>
          <TableCell>{registro.nombre}</TableCell>
          <TableCell>{registro.fecha_nacimiento || 'Desconocida'}</TableCell>
          <TableCell>{registro.fecha_bautizo || 'Desconocida'}</TableCell>
          <TableCell>{registro.padre}</TableCell>
          <TableCell>{registro.madre}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handlePrint(registro)}
              style={{ marginRight: '10px' }}
              size="small"
            >
              Imprimir
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(registro.id)}
              size="small"
            >
              Eliminar
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
    </Container>
  );
}

export default DetalleBautizo;
