const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path'); 

// Importar archivos JSON
const comprar = require('./data/cart/buy.json');
const categorias = require('./data/cats/cat.json');
const vender = require('./data/sell/publish.json');
const carrito = require('./data/user_cart/25801.json');



// Middleware para habilitar CORS (para que el frontend pueda consumir el backend)
app.use(cors());

// Middleware para parsear JSON en solicitudes
app.use(express.json());
app.use(express.static(__dirname));

// Rutas

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




