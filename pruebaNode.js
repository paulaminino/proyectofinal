const express = require('express');
const jwt = require('jsonwebtoken');
const mariadb = require('mariadb');
const cors = require('cors');
let authorize = require('authorize');

const pool = mariadb.createPool({
  host: "localhost", 
  user: "root", 
  password: "123456", 
  database: "proyecto", 
  connectionLimit: 5});

const app = express();
const SECRET = 'CLAVE_SECRETTA';
const port = 3000; 


app.use(express.json());
app.use(express.static(__dirname));
app.use(cors()); // Permite solicitudes CORS 



app.post("/login", async (req, res) =>{
  const { username, password } = req.body;

  try { 
    const conn = await pool.getConnection(); 
    const rows = await conn.query("SELECT * FROM usuarios WHERE username = ? AND password = ?", [username, password]); 
    conn.release(); 
    if (rows.length > 0) { 
      const token = jwt.sign({ id: rows[0].id, username: rows[0].username }, SECRET, { expiresIn: '1h' }); 
      res.json({ token});
  } else {
    res.status(401).json({message: "Usuario y/o contraseña incorrecto"});
  }

} catch (err) { 
  console.error(err); 
  res.status(500).send('Internal server error'); } 

});

authorize = (req, res, next) => { // req: solicitud, res: respuesta, next: funcion que pasa el control al siguiente middleware o ruta y si no se llama se frena el flujo de la solicitud.

  const token = req.headers['authorization']; // se obtiene el token del header de la solicitud

  if (!token) { // comprueba que la solicitud incluya un token
      return res.status(401).json({ message: 'Acceso denegado.'});
    }

  try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET);  // verificar el token, elimina Bearer que es el formato en el que se obtiene el token (Bearer <token>) para utilizar solo el último
      req.user = decoded; // añadir los datos del usuario decodificado a la solicitud
      next(); // continuar 
  } catch (err) {
      return res.status(403).json({message: 'El token no es válido o ya expiró.'});
  }
}

module.exports = authorize;
  

// Iniciar servidor 
app.listen(port, () => { 
console.log(`Servidor escuchando en el puerto ${port}`);

});
