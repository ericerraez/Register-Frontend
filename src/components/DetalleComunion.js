import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png'; // Asegúrate de que esta ruta sea correcta
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
          <title>Imprimir Registro de Comunión</title>
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
            ${logo ? `<img src="${logo}" class="logo" alt="Logo" />` : ''}
            <h4>DIOCESIS DE AZOGES</h4>
            <h4>PARROQUIA "INMACULADA CONCEPCION" DE SOCARTE</h4>
            <h4>GENERAL MORALES - CANAR - ECUADOR</h4>
            <h4>CERTIFICADO DE PRIMERA COMUNIÓN</h4>
            <div class="field"><strong>Nombre:</strong> ${registro.nombre || 'Desconocido'}</div>
            <div class="field"><strong>Fecha del Sacramento:</strong> ${registro.fecha_registro || 'Desconocida'}</div>
            <div class="field"><strong>Padre:</strong> ${registro.padre || 'Desconocido'}</div>
            <div class="field"><strong>Madre:</strong> ${registro.madre || 'Desconocida'}</div>
            <div class="field"><strong>Celebrante:</strong> ${registro.celebrante || 'Desconocido'}</div>
    
            <h6>Registro Eclesiástico</h6>
            <div class="field"><strong>Año:</strong> ${registro.ano_registro_eclesiastico || 'Desconocido'}</div>
            <div class="field"><strong>Tomo:</strong> ${registro.tomo || 'Desconocido'}</div>
            <div class="field"><strong>Página:</strong> ${registro.pagina || 'Desconocida'}</div>
            <div class="field"><strong>Acta:</strong> ${registro.acta || 'Desconocida'}</div>
    
            <h6>Registro Civil</h6>
            <div class="field"><strong>Año:</strong> ${registro.ano_registro_civil || 'Desconocido'}</div>

            <div class="field"><strong>Tomo:</strong> ${registro.datos_registro_civil_tomo || 'Desconocido'}</div>
            <div class="field"><strong>Página:</strong> ${registro.datos_registro_civil_pagina || 'Desconocida'}</div>
            <div class="field"><strong>Acta:</strong> ${registro.datos_registro_civil_acta || 'Desconocida'}</div>
    
            <div class="field"><strong>Fecha de Emisión:</strong> ${registro.fecha_emision || 'Desconocida'}</div>
            <div class="field"><strong>Párroco:</strong> ${registro.parroco || 'Desconocido'}</div>
            <div class="field"><strong>Nota:</strong> ${registro.nota || 'Sin nota'}</div>
    
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
    `;

    printWindow.document.write(content);
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
