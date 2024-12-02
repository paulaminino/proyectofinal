const express = require('express');
const jwt = require('jsonwebtoken');
const mariadb = require('mariadb');
const cors = require('cors');
const path = require('path'); 

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



// Importar archivos JSON
const comprar = require('./data/cart/buy.json');
const categorias = require('./data/cats/cat.json');
const vender = require('./data/sell/publish.json');
const carrito = require('./data/user_cart/25801.json');




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

// verificacion del token

app.use("/products", (req, res, next) =>{

    const token = req.headers['authorization'];

    if (!token) { // comprueba que la solicitud incluya un token
        return res.status(401).json({ message: 'Acceso denegado.'});
      }
    
    try {
        const decoded = jwt.verify(token, SECRET);  // verificar el token
        console.log(decoded);
        req.user = decoded; // añadir los datos del usuario decodificado a la solicitud
        next(); // continuar 
    } catch (err) {
        return res.status(403).json({message: 'El token no es válido o ya expiró.'});
    }
});

// Rutas para acceder a la información de la ecommerce

// Ruta para obtener producto según id
app.get('/products/:id', (req, res) => {
  const prodId = req.params.id;
  const productFilePath = path.join(__dirname, `data/products/${prodId}.json`);

  try {
      const productData = require(productFilePath);
      res.status(200).json(productData);
  } catch (error) {
      console.error(`Error reading product ${prodId}:`, error);
      res.status(500).json({ message: 'Error obteniendo producto' });
  }
});

// Ruta para obtener todas las categorías
app.get('/categories', (req, res) => {
  res.status(200).json(categorias);
});

app.get('/sell', (req, res) => {
  res.status(200).json(vender);
});


// Ruta para obtener productos por categoría
app.get('/categoriesProd/:id', (req, res) => {
  const catId = req.params.id;
  const productFilePath = path.join(__dirname, `data/cats_products/${catId}.json`);

  try {
      const productData = require(productFilePath);
      res.status(200).json(productData);
  } catch (error) {
      console.error(`Error reading product ${prodId}:`, error);
      res.status(500).json({ message: 'Error obteniendo producto' });
  }

});

// Ruta para obtener comentarios de un producto
app.get('/products_comments/:id', (req, res) => {
  const prodId = req.params.id;
  const productFilePath = path.join(__dirname, `data/products_comments/${prodId}.json`);

  try {
      const productData = require(productFilePath);
      res.status(200).json(productData);
  } catch (error) {
      console.error(`Error reading product ${prodId}:`, error);
      res.status(500).json({ message: 'Error obteniendo producto' });
  }
});

// Ruta para obtener información de la compra
app.get('/cart', (req, res) => {
  res.status(200).json(comprar);
});

// Ruta para obtener los productos publicados para la venta
app.get('/sell', (req, res) => {
  res.status(200).json(vender);
});

// Ruta para obtener el carrito de un usuario específico (por id de usuario)
app.get('/user_cart/:userId', (req, res) => {
  res.status(200).json(carrito);
});

// Inicia el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
  

// Iniciar servidor 
/*app.listen(port, () => { 
console.log(`Servidor escuchando en el puerto ${port}`);

});*/
