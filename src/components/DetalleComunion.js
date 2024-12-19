import React, { useEffect, useState } from 'react';
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

function DetalleComunion() {
  const [registros, setRegistros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await axios.get('https://register-production.up.railway.app/comuniones/');
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
         <strong>Nombre:</strong> <span class="line">${registro.nombre || '_________________'}</span>
       </div>
       <div class="field">
         <strong>Fecha de Registro:</strong> <span class="line">${registro.fecha_registro || '_________________'}</span>
       </div>
       <div class="field">
         <strong>Padre:</strong> <span class="line">${registro.padre || '_________________'}</span>
       </div>
       <div class="field">
         <strong>Madre:</strong> <span class="line">${registro.madre || '_________________'}</span>
       </div>
       <div class="field">
         <strong>Celebrante:</strong> <span class="line">${registro.celebrante || '_________________'}</span>
       </div>
       <div class="field">
         <strong>Padrinos:</strong> <span class="line">${registro.padrinos || '_________________'}</span>
       </div>
            <div class="header-space"></div>

       <h5>Registro Eclesiástico</h5>
                   <div class="header-space"></div>
       <div class="field">
         <strong>Año:</strong> <span class="line">${registro.ano_registro_eclesiastico || '__________'}</span>
         <strong>Tomo:</strong> <span class="line">${registro.tomo || '__________'}</span>
         <strong>Página:</strong> <span class="line">${registro.pagina || '__________'}</span>
         <strong>Acta:</strong> <span class="line">${registro.acta || '__________'}</span>
       </div>
            <div class="header-space"></div>

       <h5>Registro Civil</h5>
                   <div class="header-space"></div>

       <div class="field">
         <strong>Año:</strong> <span class="line">${registro.datos_registro_civil_acta || '__________'}</span>
         <strong>Tomo:</strong> <span class="line">${registro.datos_registro_civil_tomo || '__________'}</span>
         <strong>Página:</strong> <span class="line">${registro.datos_registro_civil_pagina || '__________'}</span>
       </div>
       <div class="field">
         <strong>Fecha de Emisión:</strong> <span class="line">${registro.fecha_emision || '_________________'}</span>
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
     </div>
    <div class="field">
         <p>${registro.nota || 'Nota:_____________________________________________________'}</p>
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
    const confirmation = window.confirm('¿Estás seguro de que deseas eliminar este registro?');
    if (confirmation) {
      try {
        await axios.delete(`https://register-production.up.railway.app/comuniones/${id}/`);
        setRegistros(registros.filter(registro => registro.id !== id)); // Actualiza la lista de registros
        alert('Registro eliminado con éxito');
      } catch (error) {
        console.error('Error al eliminar el registro', error);
        alert('Hubo un error al eliminar el registro');
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
        Lista de Registros de Comunión
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
              <TableCell><b>Nombre</b></TableCell>
              <TableCell><b>Padre</b></TableCell>
              <TableCell><b>Madre</b></TableCell>
              <TableCell><b>Padrinos</b></TableCell>
              <TableCell><b>Año Eclesiástico</b></TableCell>
              <TableCell><b>Tomo</b></TableCell>
              <TableCell><b>Página</b></TableCell>
              <TableCell><b>Nota</b></TableCell>
              <TableCell><b>Acciones</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registros.map((registro) => (
              <TableRow key={registro.id}>
                <TableCell>{registro.id}</TableCell>
                <TableCell>{registro.nombre}</TableCell>
                <TableCell>{registro.padre}</TableCell>
                <TableCell>{registro.madre}</TableCell>
                <TableCell>{registro.padrinos}</TableCell>
                <TableCell>{registro.ano_registro_eclesiastico || 'Desconocido'}</TableCell>
                <TableCell>{registro.tomo || 'Desconocido'}</TableCell>
                <TableCell>{registro.pagina || 'Desconocido'}</TableCell>
                <TableCell>{registro.nota || 'Sin nota'}</TableCell>
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

export default DetalleComunion;
