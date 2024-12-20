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
    const printWindow = window.open('', '', 'width=800,height=600');
    const content = `
      <html>
      <head>
        <title>CERTIFICADO DE CONFIRMACIÓN</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 600px;
            margin: 40px auto;
            padding: 20px;
            border-radius: 10px;
          }
          .spacer {
          height: 50px;
          }
          h4, h5 {
            text-align: center;
            margin: 10px 0;
            font-weight: normal;
            font-size: 18px;
          }
          .field {
            margin: 10px 0;
          }
          .field strong {
            display: inline-block;
            width: 180px;
            font-size: 15px;
          }
          .line {
            display: inline-block;
            width: 300px;
            border-bottom: 1px solid #000;
            font-size: 15px;
            text-align: center;
          }
          .footer {
            text-align: right;
            margin-top: 30px;
            font-size: 15px;
          }
          .signature {
            text-align: center;
            margin-top: 40px;
          }
          .signature-line {
            display: inline-block;
            width: 300px;
            border-bottom: 1px solid #000;
          }
          .signature p {
            margin-top: 5px;
          }
          .header-space {
            height: 20px;
          }
          .note {
            margin-top: 20px;
            font-size: 15px;
          }
          .note strong {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="spacer"></div>
      <div class="container">        
        <div class="spacer"></div>
          <h4>CERTIFICADO DE CONFIRMACIÓN</h4>
          <div class="header-space"></div>
  
          <div class="field">
            <strong>Nombre:</strong> <span class="line">${registro.nombre || '_________________'}</span>
          </div>
          <div class="field">
            <strong>Fecha de Confirmación:</strong> <span class="line">${registro.fecha_confirmacion || '_________________'}</span>
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
          <div class="field">
            <strong>Año:</strong> <span class="line">${registro.ano_registro_eclesiastico || '__________'}</span>
            <strong>Tomo:</strong> <span class="line">${registro.tomo_registro_eclesiastico || '__________'}</span>
            <strong>Página:</strong> <span class="line">${registro.pagina_registro_eclesiastico || '__________'}</span>
            <strong>Acta:</strong> <span class="line">${registro.acta_registro_eclesiastico || '__________'}</span>
          </div>
              <div class="header-space"></div>

          <h5>Registro Civil</h5>
          <div class="field">
            <strong>Año:</strong> <span class="line">${registro.ano_registro_civil || '__________'}</span>
            <strong>Tomo:</strong> <span class="line">${registro.tomo_registro_civil || '__________'}</span>
            <strong>Página:</strong> <span class="line">${registro.pagina_registro_civil || '__________'}</span>
          </div>
  
          <div class="header-space"></div>
          <div class="footer">
            <strong>Socarte, a</strong> 
            <span id="dia"></span> de <span id="mes"></span> del año <span id="anio"></span>
          </div>
          
          <div class="header-space"></div>
          <div class="signature">
            <div class="signature-line"></div>
            <p><strong>Párroco</strong></p>
          </div>
          <div class="header-space"></div>
          
          <div class="note">
            <strong>Nota:</strong> <span class="line">${registro.nota || '_________________'}</span>
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
              <TableCell><b>Padrinos</b></TableCell>
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
