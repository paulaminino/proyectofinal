const express = require('express');
const jwt = require('jsonwebtoken');
const mariadb = require('mariadb');
const cors = require('cors');

const pool = mariadb.createPool({
  host: "localhost", 
  user: "root", 
  password: "123456", 
  database: "proyecto", 
  connectionLimit: 5});

const app = express();
const SECRET = 'CLAVE_SECRETTA';
const port = 3000; 

/*app.get('/ecommerce-data', middleware-autorizacion, (req, res)) =>*/
/*const middleware-autorizacion = require('./middleware-autorizacion');*/


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
  

// Iniciar servidor 
app.listen(port, () => { 
console.log(`Servidor escuchando en el puerto ${port}`);

});
