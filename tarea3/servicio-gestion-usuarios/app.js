const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors'); 


const app = express();
const PORT = 3002;

app.use(cors());  
app.use(bodyParser.json());

// Base de datos ficticia para almacenar usuarios ( se puede reemplazar con una base de datos real)
const usuarios = [];

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    jwt.verify(bearerToken, process.env.TOKEN_SECRET, (err, data) => {
      if (err) {
        res.sendStatus(403); // Forbidden
      } else {
        req.userData = data;
        next();
      }
    });
  } else {
    res.sendStatus(403); // Forbidden
  }
};

// Obtener información del usuario
app.get('/api/users/profile', verifyToken, (req, res) => {
  // req.userData contiene la información del usuario desde el token
  const usuario = usuarios.find(u => u.username === req.userData.username);
  if (usuario) {
    res.json({
      username: usuario.username,
      email: usuario.email,
      phoneNumber: usuario.phoneNumber,
    });
  } else {
    res.sendStatus(404); // Usuario no encontrado
  }
});

// Actualizar información del usuario
app.put('/api/users/profile', verifyToken, (req, res) => {
  // req.userData contiene la información del usuario desde el token
  const usuario = usuarios.find(u => u.username === req.userData.username);
  if (usuario) {
    // Actualizar la información del usuario con los datos proporcionados en req.body
    usuario.email = req.body.email || usuario.email;
    usuario.phoneNumber = req.body.phoneNumber || usuario.phoneNumber;

    res.json({
      username: usuario.username,
      email: usuario.email,
      phoneNumber: usuario.phoneNumber,
    });
  } else {
    res.sendStatus(404); // Usuario no encontrado
  }
});

app.listen(PORT, () => {
  console.log(`Servicio de Gestión de Usuarios en ejecución en http://localhost:${PORT}`);
});
