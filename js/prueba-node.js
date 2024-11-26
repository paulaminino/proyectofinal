const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const SECRET = 'CLAVE_SECRETTA';
const port = 3000; // Middleware para parsear el cuerpo de la petición



app.use(express.json()); 
app.use(express.static(__dirname));
app.use(cors()); // Permite solicitudes CORS 

// Simulación de una base de datos de usuarios 
  const users = [ 
  { id: 1, username: 'user1', password: 'password1' }, 
  { id: 2, username: 'user2', password: 'password2' } ]; 

  // Endpoint de login 
  app.post('/login', (req, res) => { 
const { username, password } = req.body; 
const user = users.find(u => u.username === username && u.password === password); 
  if (user) { 
    // Generar token 
    const token = jwt.sign({ id: user.id, username: user.username }, 'SECRET', { expiresIn: '1h' }); 
    res.json({ token }); 
 } else { 
 res.status(401).json({ message: 'Usuario o contraseña incorrectos' }); } 
}); 

// Iniciar servidor 
app.listen(port, () => { console.log(`Servidor escuchando en el puerto ${port}`);
});
