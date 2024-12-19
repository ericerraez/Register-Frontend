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

function DetalleDefuncion() {
  const [registros, setRegistros] = useState([]); // Estado para almacenar los registros obtenidos
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los registros cuando se carga la pantalla
    const fetchRegistros = async () => {
      try {
        const response = await axios.get('https://register-production.up.railway.app/defunciones/');
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

  

  // Función para eliminar un registro
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://register-production.up.railway.app/defunciones/${id}/`);
      // Filtrar el registro eliminado del estado
      setRegistros(registros.filter((registro) => registro.id !== id));
    } catch (error) {
      console.error('Error al eliminar el registro', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
        Lista de Registros de Defunción
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
              <TableCell><b>Estado Civil</b></TableCell>
              <TableCell><b>Edad</b></TableCell>
              <TableCell><b>Lugar de Fallecimiento</b></TableCell>
              <TableCell><b>Causa</b></TableCell>
              <TableCell><b>Nota</b></TableCell>
              <TableCell><b>Acciones</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registros.map((registro) => (
              <TableRow key={registro.id}>
                <TableCell>{registro.id}</TableCell>
                <TableCell>{registro.estado_civil}</TableCell>
                <TableCell>{registro.edad}</TableCell>
                <TableCell>{registro.lugar_fallecimiento}</TableCell>
                <TableCell>{registro.causa_fallecimiento}</TableCell>
                <TableCell>{registro.nota || 'Sin nota'}</TableCell>
                <TableCell>
                  <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handlePrint(registro)}
                  style={{ marginRight: '10px' }}
                  size="small"  // Botón más pequeño
                >
                  Imprimir
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(registro.id)}
                  size="small"  // Botón más pequeño
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

export default DetalleDefuncion;
