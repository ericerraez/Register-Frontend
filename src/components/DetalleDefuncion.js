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
          <title>Registro de Defunción</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h4 { text-align: center; }
            .content { margin-top: 30px; }
            .content p { margin: 5px 0; }
            .label { font-weight: bold; }
            .value { margin-left: 10px; }
            .field { margin-bottom: 10px; }
            .footer { margin-top: 30px; text-align: right; font-size: 14px; }
            .logo { width: 200px; height: auto; display: block; margin-left: auto; margin-right: auto; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="content">
            <img src="${logo}" class="logo" alt="Logo" />
            <h1>REGISTRO DE DEFUNCIÓN</h1>
            <h4>DIOCESIS DE AZOGES</h4>
            <h4>PARROQUIA "INMACULADA CONCEPCION" DE SOCARTE</h4>
            <h4>GENERAL MORALES - CANAR - ECUADOR</h4>
  
            <div class="field"><span class="label">Nombre del Fallecido:</span><span class="value"> ${registro.nombre || 'Desconocido'}</span></div>
            <div class="field"><span class="label">Estado Civil:</span><span class="value"> ${registro.estado_civil || 'Desconocido'}</span></div>
            <div class="field"><span class="label">Edad:</span><span class="value"> ${registro.edad || 'Desconocida'}</span></div>
            <div class="field"><span class="label">Lugar de Defunción:</span><span class="value"> ${registro.lugar_fallecimiento || 'Desconocido'}</span></div>
            <div class="field"><span class="label">Causa de Defunción:</span><span class="value"> ${registro.causa_fallecimiento || 'Desconocida'}</span></div>
  
            <h4>Registro Eclesiástico</h4>
            <div class="field"><span class="label">Año:</span><span class="value"> ${registro.ano_registro_eclesiastico || 'Desconocido'}</span></div>
            <div class="field"><span class="label">Tomo:</span><span class="value"> ${registro.tomo || 'Desconocido'}</span></div>
            <div class="field"><span class="label">Página:</span><span class="value"> ${registro.pagina || 'Desconocida'}</span></div>
            <div class="field"><span class="label">Acta:</span><span class="value"> ${registro.acta || 'Desconocida'}</span></div>
  
            <h4>Registro Civil</h4>
            <div class="field"><span class="label">Acta:</span><span class="value"> ${registro.datos_registro_civil_acta || 'Desconocida'}</span></div>
            <div class="field"><span class="label">Tomo:</span><span class="value"> ${registro.datos_registro_civil_tomo || 'Desconocido'}</span></div>
            <div class="field"><span class="label">Página:</span><span class="value"> ${registro.datos_registro_civil_pagina || 'Desconocida'}</span></div>
  
            <div class="field"><span class="label">Fecha de Emisión del Certificado:</span><span class="value"> ${registro.fecha_emision_certificado_defuncion || 'Desconocida'}</span></div>
            <div class="field"><span class="label">Párroco:</span><span class="value"> ${registro.parroco || 'Desconocido'}</span></div>
            <div class="field"><span class="label">Nota:</span><span class="value"> ${registro.nota || 'Sin nota'}</span></div>
          </div>
  
          <div class="footer">Firma: ______________________</div>
  
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
