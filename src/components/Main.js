import React from 'react';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add, Group, Visibility } from '@mui/icons-material';
import logo from '../assets/logo.png';

const Main = () => {
  const navigate = useNavigate();

  // Lista de opciones para mantener el código limpio y fácil de modificar
  const options = [
    { label: 'Registro Bautizo', route: '/registro-bautizo', icon: <Add /> },
    { label: 'Registro Matrimonio', route: '/registro-matrimonio', icon: <Group /> },
    { label: 'Ver Datos', route: '/ver-datos', icon: <Visibility />, color: 'secondary' },
    { label: 'Registro Comunión', route: '/registro-comunion', icon: <Add /> },
    { label: 'Registro Confirmación', route: '/registro-confirmacion', icon: <Add /> },
    { label: 'Registro Defunción', route: '/registro-defuncion', icon: <Add /> },
    { label: 'Registro Sepultura', route: '/registro-sepultura', icon: <Add /> },
  ];

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'transparent',
        padding: 4,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          marginBottom: 2,
          padding: 2,
          backgroundColor: 'transparent',
          borderRadius: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={logo}
          alt="PARROQUIA INMACULADA CONCEPCION DE SOCARTE"
          style={{
            width: '100%',
            borderRadius: '9px',
          }}
        />
      </Box>

      {/* Título */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        PARROQUIA "INMACULADA CONCEPCIÓN" DE SOCARTE
      </Typography>

      {/* Opciones */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
          borderRadius: 2,
          boxShadow: 5,
          backgroundColor: 'background.paper',
          border: '2px solid',
          borderColor: 'primary.main',
          width: '100%',
          maxWidth: 600,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Selecciona una opción
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {options.map((option, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Button
                variant="contained"
                color={option.color || 'primary'}
                onClick={() => navigate(option.route)}
                sx={{ margin: '10px', width: '100%' }}
                aria-label={option.label}
              >
                <Typography variant="button">{option.label}</Typography>
                {option.icon}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Main;
