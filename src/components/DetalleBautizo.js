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
        body {
          font-family: Arial, sans-serif;
        }
        .container {
          width: 600px;
          margin: auto;
          padding: 20px;
          border-radius: 10px;
        }
        .spacer {
          height: 50px;
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
          font-size: 15px; 
          text-align: left; 
        }
        .line {
          display: inline-block;
          width: 300px;
          border-bottom: 1px solid #000;
          font-size: 15px; /* Aumentado */
          text-align: center; /* Centrado del texto introducido */
        }
        .footer {
          text-align: left;
          margin-top: 30px;
          font-size: 15px; /* Aumentado */
        }
        .signature {
          text-align: center;
          margin-top: 40px;
        }
        .signature-line {
          border-bottom: 1px solid #000;
          width: 200px;
          margin: 0 auto 5px;
        }
        .note {
          text-align: left; /* Alineación a la izquierda */
          margin-top: 40px;
          font-size: 15px; /* Aumentado */
          font-style: italic;
        }
        .header-space {
          height: 10px;
        }
      </style>
    </head>
    <body>
      <div class="spacer"></div>
      <div class="container">        
        <div class="spacer"></div>
        <h4>CERTIFICADO DE BAUTIZO</h4>
        <div class="spacer"></div>
        <div class="field">
          <strong>Fecha de Bautizo:</strong> <span class="line">${registro.fecha_bautizo || '_________________'}</span>
        </div>
        <div class="field">
          <strong>Fecha de Nacimiento:</strong> <span class="line">${registro.fecha_nacimiento || '_________________'}</span>
        </div>
        <div class="field">
          <strong>Lugar de Nacimiento:</strong> <span class="line">${registro.lugar_nacimiento || '_________________'}</span>
        </div>
        <div class="field">
          <strong>Padre:</strong> <span class="line">${registro.padre || '_________________'}</span>
        </div>
        <div class="field">
          <strong>Madre:</strong> <span class="line">${registro.madre || '_________________'}</span>
        </div>
        <div class="field">
          <strong>Padrinos:</strong> <span class="line">${registro.padrinos || '_________________'}</span>
        </div>
        <div class="field">
          <strong>Celebrante:</strong> <span class="line">${registro.celebrante || '_________________'}</span>
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
          <strong>Acta:</strong> <span class="line">${registro.acta_registro_civil || '__________'}</span>
        </div>
        <div class="field">
          <strong>Cédula:</strong> <span class="line">${registro.cedula_registro_civil || '__________'}</span>
        </div>
  
        <div class="footer">
          <strong>Socarte, a</strong> 
          <span id="dia"></span> de 
          <span id="mes"></span> del año
          <span id="anio"></span>
        </div>
        <div class="header-space"></div>
        <div class="signature">
          <div class="signature-line"></div>
          <p><strong>Párroco</strong></p>
        </div>
  
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
