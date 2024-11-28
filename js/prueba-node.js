const express = require('express');
const jwt = require('jsonwebtoken');
const mariadb = require('mariadb');
const cors = require('cors');

const pool = mariadb.createPool({
  host: "localhost", 
  user: "root", 
  password: "123456", 
  database: "usuarios", 
  connectionLimit: 5});

const app = express();
const SECRET = 'CLAVE_SECRETTA';
const port = 3000; // Middleware para parsear el cuerpo de la petición

/*app.get('/ecommerce-data', middleware-autorizacion, (req, res) =>*/
/*const middleware-autorizacion = require('./middleware-autorizacion');*/


app.use(express.json()); 
app.use(express.static(__dirname));
app.use(cors()); // Permite solicitudes CORS 

app.post("/login", (req, res) =>{
  const { username, password } = req.body;
  if (username === "administrador" && password === "administrador") {
    const token = jwt.sign({ username }, SECRET);
    res.status(200).json({ token });
  } else {
    res.status(401).json({message: "Usuario y/o contraseña incorrecto"});
  }
  
  });

// Iniciar servidor 
app.listen(port, () => { console.log(`Servidor escuchando en el puerto ${port}`);
});
