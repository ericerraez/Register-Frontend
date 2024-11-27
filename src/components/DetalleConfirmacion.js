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

function DetalleConfirmacion() {
  const [registros, setRegistros] = useState([]); // Estado para almacenar los registros obtenidos
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los registros cuando se carga la pantalla
    const fetchRegistros = async () => {
      try {
        const response = await axios.get('https://register-production.up.railway.app/confirmaciones/'); // Endpoint correspondiente
        setRegistros(response.data);
      } catch (error) {
        console.error('Error al obtener los registros', error);
      }
    };
    fetchRegistros();
  }, []);

  const handlePrint = (registro) => {
    const formatDate = (date) => {
      // Verifica si la fecha es válida y la formatea a un formato legible (DD/MM/YYYY)
      if (!date) return 'Desconocida';
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };
  
    const printWindow = window.open('', '', 'height=600,width=800');
    const content = `
      <html>
        <head>
          <title>Imprimir Registro de Sacramento</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h4 { text-align: center; }
            h6 { margin-top: 20px; font-weight: bold; }
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
            <h4>PARROQUIA "INMACULADA CONCEPCION" DE SOCARTE</h4>
            <h4>GENERAL MORALES - CANAR - ECUADOR</h4>
            <h4>CERTIFICADO DE CONFIRMACION</h4>
  
            <div class="field"><strong>Nombre:</strong> ${registro.nombre || 'Desconocido'}</div>
            <div class="field"><strong>Fecha del Sacramento:</strong> ${formatDate(registro.fecha_confirmacion) || 'Desconocida'}</div>
            <div class="field"><strong>Padre:</strong> ${registro.padre || 'Desconocido'}</div>
            <div class="field"><strong>Madre:</strong> ${registro.madre || 'Desconocida'}</div>
            <div class="field"><strong>Celebrante:</strong> ${registro.celebrante || 'Desconocido'}</div>
  
            <h6>Registro Eclesiástico</h6>
            <div class="field"><strong>Año:</strong> ${registro.ano_registro_eclesiastico || 'Desconocido'}</div>
            <div class="field"><strong>Tomo:</strong> ${registro.tomo_registro_eclesiastico || 'Desconocido'}</div>
            <div class="field"><strong>Página:</strong> ${registro.pagina_registro_eclesiastico || 'Desconocida'}</div>
            <div class="field"><strong>Acta:</strong> ${registro.acta_registro_eclesiastico || 'Desconocida'}</div>
  
            <h6>Registro Civil</h6>
            <div class="field"><strong>Año:</strong> ${registro.ano_registro_civil || 'Desconocido'}</div>
            <div class="field"><strong>Tomo:</strong> ${registro.tomo_registro_civil || 'Desconocido'}</div>
            <div class="field"><strong>Página:</strong> ${registro.pagina_registro_civil || 'Desconocida'}</div>
            <div class="field"><strong>Acta:</strong> ${registro.acta_registro_civil || 'Desconocida'}</div>
  
            <div class="field"><strong>Nota:</strong> ${registro.nota || 'Sin nota'}</div>
  
            <div class="footer">Firma: ______________________</div>
          </div>
        </body>
      </html>
    `;
  
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };
  
  
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://register-production.up.railway.app/confirmaciones/${id}/`); // Endpoint para eliminar el registro
      setRegistros(registros.filter((registro) => registro.id !== id)); // Actualizar el estado eliminando el registro
      alert('Registro eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el registro', error);
      alert('Error al eliminar el registro');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
        Lista de Registros de Confirmación
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')} // Redirige al inicio
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
              <TableCell><b>Celebrante</b></TableCell>
              <TableCell><b>Fecha de Confirmación</b></TableCell>
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
                <TableCell>{registro.celebrante}</TableCell>
                <TableCell>{registro.fecha_confirmacion || 'Desconocido'}</TableCell>
                <TableCell>{registro.ano_registro_eclesiastico || 'Desconocido'}</TableCell>
                <TableCell>{registro.tomo_registro_eclesiastico || 'Desconocido'}</TableCell>
                <TableCell>{registro.pagina_registro_eclesiastico || 'Desconocido'}</TableCell>
                <TableCell>{registro.nota || 'Sin nota'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handlePrint(registro)}
                    style={{ marginRight: '10px' }}
                  >
                    Imprimir
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(registro.id)}
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

export default DetalleConfirmacion;
