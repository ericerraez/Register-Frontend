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
            <img src="${logo}" class="logo" alt="Logo" />
            <h4>CERTIFICADO DE BAUTIZO</h4>
            <div class="field"><strong>Nombre:</strong> ${registro.nombre || 'Desconocido'}</div>
            <div class="field"><strong>Fecha de Bautizo:</strong> ${registro.fecha_bautizo || 'Desconocida'}</div>
            <div class="field"><strong>Fecha de Nacimiento:</strong> ${registro.fecha_nacimiento || 'Desconocida'}</div>
            <div class="field"><strong>Lugar de Nacimiento:</strong> ${registro.lugar_nacimiento || 'Desconocido'}</div>
            <div class="field"><strong>Padre:</strong> ${registro.padre || 'Desconocido'}</div>
            <div class="field"><strong>Madre:</strong> ${registro.madre || 'Desconocida'}</div>
            <div class="field"><strong>Padrinos:</strong> ${registro.padrinos || 'Desconocidos'}</div>
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
            <div class="field"><strong>Cédula:</strong> ${registro.cedula_registro_civil || 'Desconocida'}</div>
    
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
