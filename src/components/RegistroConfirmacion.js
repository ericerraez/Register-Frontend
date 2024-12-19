import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Toolbar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const RegistroConfirmacion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    fechaConfirmacion: '',
    padre: '',
    madre: '',
    celebrante: '',
    registroEclesiastico: {
      ano: '',
      tomo: '',
      pagina: '',
      acta: '',
    },
    registroCivil: {
      ano: '',
      tomo: '',
      pagina: '',
      acta: '',
      cedula: '',
    },
    nota: '',
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('registroEclesiastico') || name.includes('registroCivil')) {
      const [category, field] = name.split('.');
      setFormData((prevState) => ({
        ...prevState,
        [category]: {
          ...prevState[category],
          [field]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Aplanar los datos del formulario
    const flattenedData = {
      nombre: formData.nombre,
      fecha_confirmacion: formData.fechaConfirmacion,
      padre: formData.padre,
      madre: formData.madre,
      celebrante: formData.celebrante,
      ano_registro_eclesiastico: formData.registroEclesiastico.ano,
      tomo_registro_eclesiastico: formData.registroEclesiastico.tomo,
      pagina_registro_eclesiastico: formData.registroEclesiastico.pagina,
      acta_registro_eclesiastico: formData.registroEclesiastico.acta,
      ano_registro_civil: formData.registroCivil.ano,
      tomo_registro_civil: formData.registroCivil.tomo,
      pagina_registro_civil: formData.registroCivil.pagina,
      acta_registro_civil: formData.registroCivil.acta,
      cedula_registro_civil: formData.registroCivil.cedula,
      nota: formData.nota,
    };
  
    try {
      const response = await axios.post('https://register-production.up.railway.app/confirmaciones/', flattenedData);
      alert('Datos guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar los datos', error);
      alert('Error al guardar los datos');
    }
  };
  

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=700');
    
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
          .logo {
            width: 120px;
            height: auto;
            display: block;
            margin: 0 auto 20px auto;
          }
          h4, h5 {
            text-align: center;
            margin: 10px 0;
            font-weight: normal;
            font-size: 19px;
          }
          .field {
            margin: 12px 0;
          }
          .field strong {
            display: inline-block;
            width: 180px;
            font-size: 18px;
          }
          .line {
            display: inline-block;
            width: 300px;
            border-bottom: 1px solid #000;
            font-size: 18px;
            text-align: center;
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
          .signature-line {
            display: inline-block;
            width: 300px;
            border-bottom: 1px solid #000;
          }
          .signature p {
            margin-top: 5px;
          }
          .header-space {
            height: 60px;
          }
          .note {
            margin-top: 20px;
            font-size: 14px;
          }
          .note strong {
            font-weight: bold;
          }
         </style>
      </head>
      <body>
        <div class="container">
          <h4>CERTIFICADO DE CONFIRMACIÓN</h4>
          <div class="header-space"></div>
  
          <div class="field">
            <strong>Nombre:</strong> <span class="line">${formData.nombre || '_________________'}</span>
          </div>
          <div class="field">
            <strong>Fecha de Confirmación:</strong> <span class="line">${formData.fechaConfirmacion || '_________________'}</span>
          </div>
          <div class="field">
            <strong>Padre:</strong> <span class="line">${formData.padre || '_________________'}</span>
          </div>
          <div class="field">
            <strong>Madre:</strong> <span class="line">${formData.madre || '_________________'}</span>
          </div>
          <div class="field">
            <strong>Celebrante:</strong> <span class="line">${formData.celebrante || '_________________'}</span>
          </div>
                <div class="header-space"></div>

          <h5>Registro Eclesiástico</h5>
          <div class="field">
            <strong>Año:</strong> <span class="line">${formData.registroEclesiastico?.ano || '__________'}</span>
            <strong>Tomo:</strong> <span class="line">${formData.registroEclesiastico?.tomo || '__________'}</span>
            <strong>Página:</strong> <span class="line">${formData.registroEclesiastico?.pagina || '__________'}</span>
            <strong>Acta:</strong> <span class="line">${formData.registroEclesiastico?.acta || '__________'}</span>
          </div>
                <div class="header-space"></div>

          <h5>Registro Civil</h5>
          <div class="field">
            <strong>Año:</strong> <span class="line">${formData.registroCivil?.ano || '__________'}</span>
            <strong>Tomo:</strong> <span class="line">${formData.registroCivil?.tomo || '__________'}</span>
            <strong>Página:</strong> <span class="line">${formData.registroCivil?.pagina || '__________'}</span>
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
            <strong>Nota:</strong> <span class="line">${formData.nota || '_________________'}</span>
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
  
  

  return (
    <Container>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Home
        </Button>
      </Toolbar>

      <Typography variant="h4" gutterBottom>Llenar Datos del Registro de Sacramento</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Fecha de Confirmación" name="fechaConfirmacion" value={formData.fechaConfirmacion} onChange={handleChange} fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} />
        <TextField label="Padre" name="padre" value={formData.padre} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Madre" name="madre" value={formData.madre} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Celebrante" name="celebrante" value={formData.celebrante} onChange={handleChange} fullWidth margin="normal" />
        
        <Typography variant="h6" gutterBottom>Registro Eclesiástico</Typography>
        <TextField label="Año" name="registroEclesiastico.ano" value={formData.registroEclesiastico.ano} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Tomo" name="registroEclesiastico.tomo" value={formData.registroEclesiastico.tomo} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Página" name="registroEclesiastico.pagina" value={formData.registroEclesiastico.pagina} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Acta" name="registroEclesiastico.acta" value={formData.registroEclesiastico.acta} onChange={handleChange} fullWidth margin="normal" />

        <Typography variant="h6" gutterBottom>Registro Civil</Typography>
        <TextField label="Año" name="registroCivil.ano" value={formData.registroCivil.ano} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Tomo" name="registroCivil.tomo" value={formData.registroCivil.tomo} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Página" name="registroCivil.pagina" value={formData.registroCivil.pagina} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Acta" name="registroCivil.acta" value={formData.registroCivil.acta} onChange={handleChange} fullWidth margin="normal" />

        <TextField label="Nota" name="nota" value={formData.nota} onChange={handleChange} fullWidth margin="normal" multiline rows={4} />

        <Button type="submit" variant="contained" color="primary">Guardar</Button>
      </form>

      <Button variant="contained" color="secondary" onClick={handlePrint} sx={{ mt: 2 }}>
        Imprimir
      </Button>
      
      <Button
          variant="contained"
          color="info"
          onClick={() => navigate('/DetalleConfirmacion')}
          style={{ marginLeft: '10px' }}
        >
          Ver Registros
        </Button>
    </Container>
  );
}

export default RegistroConfirmacion;
