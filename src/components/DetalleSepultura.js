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

function DetalleSepultura() {
  const [registros, setRegistros] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await axios.get('https://register-production.up.railway.app/sepulturas/');
        setRegistros(response.data);
      } catch (error) {
        console.error('Error al obtener los registros', error);
        alert('Hubo un error al cargar los registros');
      }
    };
    fetchRegistros();
  }, []);

  const handlePrint = (registro) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const content = `
      <html>
        <head>
          <title>Imprimir Certificado de Sepultura</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h4 { text-align: center; margin-top: 10px; }
            h6 { margin-top: 20px; }
            .field { margin: 5px 0; }
            .container { max-width: 600px; margin: auto; }
            .footer { margin-top: 30px; text-align: right; }
            .logo { width: 200px; height: auto; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto; }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${logo}" class="logo" alt="Logo" />
            <h4>DIOCESIS DE AZOGES</h4>
            <h4>PARROQUIA "INMACULADA CONCEPCION"</h4>
            <h4>GENERAL MORALES - CANAR - ECUADOR</h4>
            <h4>CERTIFICADO DE SEPULTURA</h4>
  
            <div class="field"><strong>Nombre:</strong> ${registro.nombre || 'Desconocido'}</div> <!-- Aquí se agrega el campo Nombre -->
            <div class="field"><strong>Estado Civil:</strong> ${registro.estado_civil || 'Desconocido'}</div>
            <div class="field"><strong>Edad:</strong> ${registro.edad || 'Desconocida'}</div>
            <div class="field"><strong>Fecha de Fallecimiento:</strong> ${registro.fecha_fallecimiento || 'Desconocida'}</div>
            <div class="field"><strong>Motivo de Fallecimiento:</strong> ${registro.motivo_fallecimiento || 'Desconocido'}</div>
            <div class="field"><strong>Parroco:</strong> ${registro.parroco || 'Desconocido'}</div>
            <div class="field"><strong>Fecha de Sepultura:</strong> ${registro.fecha_sepultura || 'Desconocida'}</div>
  
            <h6>Registro Eclesiástico</h6>
            <div class="field"><strong>Año:</strong> ${registro.ano_registro_eclesiastico || 'Desconocido'}</div>
            <div class="field"><strong>Tomo:</strong> ${registro.tomo || 'Desconocido'}</div>
            <div class="field"><strong>Página:</strong> ${registro.pagina || 'Desconocida'}</div>
            <div class="field"><strong>Acta:</strong> ${registro.acta || 'Desconocida'}</div>
  
            <h6>Registro Civil</h6>
            <div class="field"><strong>Año:</strong> ${registro.datos_registro_civil_ano || 'Desconocido'}</div>
            <div class="field"><strong>Tomo:</strong> ${registro.datos_registro_civil_tomo || 'Desconocido'}</div>
            <div class="field"><strong>Página:</strong> ${registro.datos_registro_civil_pagina || 'Desconocida'}</div>
            <div class="field"><strong>Acta:</strong> ${registro.datos_registro_civil_acta || 'Desconocida'}</div>
  
            <div class="field"><strong>Fecha de Emisión:</strong> ${registro.fecha_emision_certificado_sepultura || 'Desconocida'}</div>
            <div class="field"><strong>Párroco:</strong> ${registro.parroco_certificado || 'Desconocido'}</div>
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
    printWindow.document.close();
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://register-production.up.railway.app/sepulturas/${id}/`);
      setRegistros((prevRegistros) => prevRegistros.filter((registro) => registro.id !== id));
      alert('Registro eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el registro', error);
      alert('Hubo un error al eliminar el registro');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
        Lista de Registros de Sepultura
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
              <TableCell><b>Fecha Fallecimiento</b></TableCell>
              <TableCell><b>Párroco</b></TableCell>
              <TableCell><b>Fecha Sepultura</b></TableCell>
              <TableCell><b>Nota</b></TableCell>
              <TableCell><b>Acciones</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registros.map((registro) => (
              <TableRow key={registro.id}>
                <TableCell>{registro.id}</TableCell>
                <TableCell>{registro.estado_civil || 'Desconocido'}</TableCell>
                <TableCell>{registro.edad || 'Desconocido'}</TableCell>
                <TableCell>{registro.fecha_fallecimiento || 'Desconocido'}</TableCell>
                <TableCell>{registro.parroco || 'Desconocido'}</TableCell>
                <TableCell>{registro.fecha_sepultura || 'Desconocida'}</TableCell>
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

export default DetalleSepultura;
