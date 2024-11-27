import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Toolbar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

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
  

  const handlePrint = (registro) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
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
            <div class="field"><strong>Fecha de Confirmación:</strong> ${registro.fecha_confirmacion || 'Desconocida'}</div>
            <div class="field"><strong>Padre:</strong> ${registro.padre || 'Desconocido'}</div>
            <div class="field"><strong>Madre:</strong> ${registro.madre || 'Desconocida'}</div>
            <div class="field"><strong>Celebrante:</strong> ${registro.celebrante || 'Desconocido'}</div>
  
            <h6>Registro Eclesiástico</h6>
            <div class="field"><strong>Año:</strong> ${registro.registroEclesiastico?.ano || 'Desconocido'}</div>
            <div class="field"><strong>Tomo:</strong> ${registro.registroEclesiastico?.tomo || 'Desconocido'}</div>
            <div class="field"><strong>Página:</strong> ${registro.registroEclesiastico?.pagina || 'Desconocida'}</div>
            <div class="field"><strong>Acta:</strong> ${registro.registroEclesiastico?.acta || 'Desconocida'}</div>
  
            <h6>Registro Civil</h6>
            <div class="field"><strong>Año:</strong> ${registro.registroCivil?.ano || 'Desconocido'}</div>
            <div class="field"><strong>Tomo:</strong> ${registro.registroCivil?.tomo || 'Desconocido'}</div>
            <div class="field"><strong>Página:</strong> ${registro.registroCivil?.pagina || 'Desconocida'}</div>
            <div class="field"><strong>Acta:</strong> ${registro.registroCivil?.acta || 'Desconocida'}</div>
  
            <div class="field"><strong>Nota:</strong> ${registro.nota || 'Sin nota'}</div>
  
            <div class="footer">Firma: ______________________</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="contained" color="primary" type="submit">
            Guardar
          </Button>
          <Button variant="contained" color="secondary" onClick={handlePrint}>
            Imprimir
          </Button>
        </Box>
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate('/DetalleConfirmacion')}
          style={{ marginLeft: '10px' }}
        >
          Ver Registros
        </Button>
      </form>
    </Container>
  );
};

export default RegistroConfirmacion;
