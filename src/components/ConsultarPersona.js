import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConsultarPersona = () => {
  const [cedula, setCedula] = useState('');
  const [resultado, setResultado] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://localhost:5000/api/persona/${cedula}`);
      if (response.status === 200) { // Check if the response is successful
        setResultado(response.data);
      } else {
        alert('No se encontró información para esta cédula');
      }
    } catch (error) {
      console.error('Error al consultar persona', error);
      alert('Error al consultar persona');
    }
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>Consultar Persona</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Home
        </Button>
      </Box>
      
      <form onSubmit={handleSubmit}>
        <TextField
          label="Cédula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Consultar
        </Button>
      </form>
      
      {resultado && (
        <Box mt={3}>
          <Typography variant="h6">Resultado:</Typography>
          <Typography>Nombre: {resultado.nombre}</Typography>
          <Typography>Apellido: {resultado.apellido}</Typography>
          {/* Agrega más campos según tu estructura de datos */}
        </Box>
      )}
    </Container>
  );
};

export default ConsultarPersona;
