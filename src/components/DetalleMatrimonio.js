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
  Box,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DetalleMatrimonio() {
  const [registros, setRegistros] = useState([]); // Estado para almacenar los registros obtenidos
  const navigate = useNavigate();

  // Función para obtener los registros
  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await axios.get('https://register-production.up.railway.app/matrimonios/');
        setRegistros(response.data); // Asegúrate de que la respuesta sea correcta
      } catch (error) {
        console.error('Error al obtener los registros', error);
      }
    };
    fetchRegistros();
  }, []);

  // Función para manejar la impresión
  const handlePrint = (registro) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const content = `
      <html>
        <head>
          <title>Certificado de Matrimonio</title>
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
            <h1>CERTIFICADO DE MATRIMONIO</h1>
            <h4>DIOCESIS DE AZOGES</h4>
            <h4>PARROQUIA "INMACULADA CONCEPCION" DE SOCARTE</h4>
            <h4>GENERAL MORALES - CANAR - ECUADOR</h4>

            <div class="field"><span class="label">Conyuges:</span><span class="value"> ${registro.conyuges || 'No disponible'}</span></div>
            <div class="field"><span class="label">Fecha de Matrimonio:</span><span class="value"> ${registro.fecha_matrimonio || 'No disponible'}</span></div>
            <div class="field"><span class="label">Testigos:</span><span class="value"> ${registro.testigos || 'No disponible'}</span></div>
            <div class="field"><span class="label">Padrinos:</span><span class="value"> ${registro.padrinos || 'No disponible'}</span></div>
            <div class="field"><span class="label">Celebrante:</span><span class="value"> ${registro.celebrante || 'No disponible'}</span></div>

            <h4>Registro Eclesiástico</h4>
            <div class="field"><span class="label">Año:</span><span class="value"> ${registro.ano_registro_eclesiastico || 'No disponible'}</span></div>
            <div class="field"><span class="label">Tomo:</span><span class="value"> ${registro.tomo_registro_eclesiastico || 'No disponible'}</span></div>
            <div class="field"><span class="label">Página:</span><span class="value"> ${registro.pagina_registro_eclesiastico || 'No disponible'}</span></div>
            <div class="field"><span class="label">Acta:</span><span class="value"> ${registro.acta_registro_eclesiastico || 'No disponible'}</span></div>

            <h4>Registro Civil</h4>
            <div class="field"><span class="label">Año:</span><span class="value"> ${registro.ano_registro_civil || 'No disponible'}</span></div>
            <div class="field"><span class="label">Tomo:</span><span class="value"> ${registro.tomo_registro_civil || 'No disponible'}</span></div>
            <div class="field"><span class="label">Página:</span><span class="value"> ${registro.pagina_registro_civil || 'No disponible'}</span></div>
            <div class="field"><span class="label">Acta:</span><span class="value"> ${registro.acta_registro_civil || 'No disponible'}</span></div>

            <div class="field"><span class="label">Nota:</span><span class="value"> ${registro.nota || 'No disponible'}</span></div>

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
    printWindow.print();
  };

  // Función para eliminar un registro
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://register-production.up.railway.app/matrimonios/${id}/`); // Eliminar el registro con el ID especificado
      setRegistros(registros.filter((registro) => registro.id !== id)); // Eliminar el registro del estado
      alert('Registro eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el registro', error);
      alert('Hubo un problema al eliminar el registro');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Detalles del Matrimonio</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Conyuges</strong></TableCell>
              <TableCell><strong>Fecha de Matrimonio</strong></TableCell>
              <TableCell><strong>Testigos</strong></TableCell>
              <TableCell><strong>Padrinos</strong></TableCell>
              <TableCell><strong>Celebrante</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registros.map((registro) => (
              <TableRow key={registro.id}>
                <TableCell>{registro.conyuges || 'No disponible'}</TableCell>
                <TableCell>{registro.fecha_matrimonio || 'No disponible'}</TableCell>
                <TableCell>{registro.testigos || 'No disponible'}</TableCell>
                <TableCell>{registro.padrinos || 'No disponible'}</TableCell>
                <TableCell>{registro.celebrante || 'No disponible'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePrint(registro)}
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

      <Box sx={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/')}
        >
          Home
        </Button>
      </Box>
    </Container>
  );
}

export default DetalleMatrimonio;
