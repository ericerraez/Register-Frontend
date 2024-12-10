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
    const printWindow = window.open('', '', 'height=600,width=700');
    const content = `
      <html>
        <head>
          <title>Certificado de Sepultura</title>
          <style>
            body 
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
              font-size: 18px;
            }
            .field {
              margin: 8px 0;
            }
            .field strong {
              display: inline-block;
              width: 160px;
              font-size: 14px;
            }
            .line {
              display: inline-block;
              width: 300px;
              border-bottom: 1px solid #000;
              font-size: 14px;
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
          .header-space {
        height: 100px; 
        </style>
      </head>
      <body>
        <div class="container">
           <div class="header-space"></div>
  
          <div class="field">
              <strong>Nombre:</strong> <span class="line">${registro.nombre || '_________________'}</span>
            </div>
            <div class="field">
              <strong>Estado Civil:</strong> <span class="line">${registro.estado_civil || '_________________'}</span>
            </div>
            <div class="field">
              <strong>Edad:</strong> <span class="line">${registro.edad || '_________________'}</span>
            </div>
            <div class="field">
              <strong>Fecha de Fallecimiento:</strong> <span class="line">${registro.fecha_fallecimiento || '_________________'}</span>
            </div>
            <div class="field">
              <strong>A causa De:</strong> <span class="line">${registro.motivo_fallecimiento || '_________________'}</span>
            </div>
            <div class="field">
              <div>Despues de la celebración eucarística de exequias, se dio cristiana sepultura a sus restos mortales
              en el cementerio:</div> <span class="line">${registro.parroco }</span> <strong>El día</strong class="line"> <span>${registro.fecha_sepultura || '_________________'}</span>
            </div>
            <h5>Registro Eclesiástico</h5>
            <div class="field">
              <strong>Año:</strong> <span class="line">${registro.ano_registro_eclesiastico || '__________'}</span>
              <strong>Tomo:</strong> <span class="line">${registro.tomo || '__________'}</span>
              <strong>Página:</strong> <span class="line">${registro.pagina || '__________'}</span>
              <strong>Acta:</strong> <span class="line">${registro.acta || '__________'}</span>
            </div>

            <h5>Registro Civil</h5>
            <div class="field">
              <strong>Año:</strong> <span class="line">${registro.datos_registro_civil_ano || '__________'}</span>
              <strong>Tomo:</strong> <span class="line">${registro.datos_registro_civil_tomo || '__________'}</span>
              <strong>Página:</strong> <span class="line">${registro.datos_registro_civil_pagina || '__________'}</span>
              <strong>Acta:</strong> <span class="line">${registro.datos_registro_civil_acta || '__________'}</span>
            </div>

            <div class="field">
              <strong>Fecha de Emisión:</strong> <span class="line">${registro.fecha_emision_certificado_sepultura || '__________'}</span>
            </div>
            <div class="field">
              <strong>Nota:</strong> <span class="line">${registro.nota || '________________________________________'}</span>
            </div>

            <div class="footer">
              <strong>Fecha:</strong> 
              <span id="dia"></span> de 
              <span id="mes"></span> del año
              <span id="anio"></span>
            </div>

            <div class="signature">
              <p><strong>Parroco</strong></p>
              <div class="line"></div>
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
