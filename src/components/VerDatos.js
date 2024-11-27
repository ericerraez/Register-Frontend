import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Icono de flecha hacia atrás

function VerDatos() {
  const navigate = useNavigate();

  // URLs de los sacramentos
  const sacramentosURLs = {
    bautizos: '/detalleBautizo', // Aquí debería ser la ruta correspondiente
    confirmaciones: '/detalleConfirmacion',
    matrimonios: '/detalleMatrimonio',
    comuniones: '/detalleComunion',
    defunciones: '/detalleDefuncion',
    sepulturas: '/detalleSepultura',
  };

  // Función para manejar el clic en cada botón
  const handleVerRegistro = (sacramento) => {
    navigate(sacramentosURLs[sacramento]);
  };

  // Función para regresar a la pantalla anterior
  const handleGoBack = () => {
    navigate(-1); // Esto hace que se regrese a la pantalla anterior en el historial
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 200,
          bgcolor: '#f5f5f5',
          p: 2,
          minHeight: '100vh',
          borderRight: '1px solid #ddd',
        }}
      >
        <Typography variant="h6">Categorías</Typography>
        <Divider />
        <List>
          {Object.keys(sacramentosURLs).map((key) => (
            <ListItem button key={key} onClick={() => handleVerRegistro(key)}>
              <ListItemText primary={key.charAt(0).toUpperCase() + key.slice(1)} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Container sx={{ flexGrow: 1, padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Elige un Sacramento
        </Typography>

        {/* Botón para regresar */}
        <IconButton onClick={handleGoBack} sx={{ marginBottom: 3 }}>
          <ArrowBackIcon />
        </IconButton>

        {/* Botones para cada sacramento */}
        <Box>
          {Object.keys(sacramentosURLs).map((key) => (
            <Button
              key={key}
              variant="contained"
              color="primary"
              sx={{ marginRight: 2, marginBottom: 2 }}
              onClick={() => handleVerRegistro(key)}
            >
              Ver {key.charAt(0).toUpperCase() + key.slice(1)}
            </Button>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default VerDatos;
