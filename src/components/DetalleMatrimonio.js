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
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Imprimir Registro de Matrimonio</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 18px;
            }
            .container {
              max-width: 600px;
              margin: auto;
              padding: 20px;
              border-radius: 10px;
            }
            h4, h5 {
              text-align: center;
              margin: 5px 0;
              font-weight: normal;
              font-size: 18px;
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
              font-size: 15px;
              padding-right: 10px;
            }
            .line {
              display: inline-block;
              width: 300px;
              border-bottom: 1px solid #000;
              text-align: center;
              font-size: 15px;
              padding: 5px 0;
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
              width: 200px;
              border-top: 1px solid #000;
              margin: 0 auto;
            }
            .header-space {
              height: 20px;
            }
            .spacer {
            height: 60px;
            }
            .note {
              text-align: left;
              margin-top: 20px;
              font-size: 15px;
            }
          </style>
        </head>
        <body>
          <div class="spacer"></div>
      <div class="container">        
        <div class="spacer"></div>
            <h4>REGISTRO DE MATRIMONIO</h4>
            <div class="header-space"></div>
  
            <div class="field">
              <strong>Cónyuges:</strong><span class="line">${registro.conyuges || 'Desconocidos'}</span>
            </div>
            <div class="field">
              <strong>Fecha de Matrimonio:</strong><span class="line">${registro.fecha_matrimonio || 'Desconocida'}</span>
            </div>
            <div class="field">
              <strong>Testigos:</strong><span class="line">${registro.testigos || 'Desconocidos'}</span>
            </div>
            <div class="field">
              <strong>Padrinos:</strong><span class="line">${registro.padrinos || 'Desconocidos'}</span>
            </div>
            <div class="field">
              <strong>Celebrante:</strong><span class="line">${registro.celebrante || 'Desconocido'}</span>
            </div>
  
            <div class="header-space"></div>
  
            <h5>Registro Eclesiástico</h5>

            <div class="header-space"></div>
            <div class="field">
              <strong>Año:</strong><span class="line">${registro.ano_registro_eclesiastico || '__________'}</span>
              <strong>Tomo:</strong><span class="line">${registro.tomo_registro_eclesiastico || '__________'}</span>
              <strong>Página:</strong><span class="line">${registro.pagina_registro_eclesiastico || '__________'}</span>
              <strong>Acta:</strong><span class="line">${registro.acta_registro_eclesiastico || '__________'}</span>
            </div>
              <div class="header-space"></div>

            <h5>Registro Civil</h5>
            <div class="header-space"></div>

            <div class="field">
              <strong>Año:</strong><span class="line">${registro.ano_registro_civil || '__________'}</span>
              <strong>Tomo:</strong><span class="line">${registro.tomo_registro_civil || '__________'}</span>
              <strong>Página:</strong><span class="line">${registro.pagina_registro_civil || '__________'}</span>
              <strong>Acta:</strong><span class="line">${registro.acta_registro_civil || '__________'}</span>
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
    `);
    printWindow.document.close();
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
