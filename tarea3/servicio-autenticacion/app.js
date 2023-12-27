const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');  


const app = express();
const PORT = 3001;

app.use(cors());  
app.use(bodyParser.json());

// Cargar las variables de entorno desde el archivo .env específico para este servicio
dotenv.config({ path: './.env' });

// Base de datos ficticia para almacenar usuarios ( se puede reemplazar con una base de datos real)
const usuarios = [];

// Función para generar tokens JWT
function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

app.post('/api/auth/register', async (req, res) => {
  try {
    // Implementar registro de usuarios
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash de la contraseña
    const usuario = {
      username: req.body.username,
      password: hashedPassword,
    };
    usuarios.push(usuario);

    const token = generateAccessToken({ username: req.body.username });
    res.json({
      token
    });
  } catch (error) {
    console.error('Error en el registro:', error.message);
    res.status(500).json({ error: 'Error en el registro' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    // Implementar inicio de sesión y generación de token JWT
    const usuario = usuarios.find(u => u.username === req.body.username);
    if (!usuario || !(await bcrypt.compare(req.body.password, usuario.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generateAccessToken({ username: req.body.username });
    res.json({
      token
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error.message);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
});

app.get('/api/protected', ensureToken, (req, res) => {
  res.json({
    text: 'protected'
  });
});

function ensureToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({ error: 'Token no proporcionado' });
  }
}

app.post('/api/auth/logout', async (req, res) => {
  // Implementar cierre de sesión (puede ser simplemente invalidar el token)


  res.json({ message: 'Cierre de sesión exitoso' });
});

app.listen(PORT, () => {
  console.log(`Servicio de Autenticación en ejecución en http://localhost:${PORT}`);
});
