const express = require('express');
const app = express();
const cors = require('cors');

// Importar archivos JSON
const comprar = require('./data/cart/buy.json');
const categorias = require('./data/cats/cat.json');
const prodsCat = require('./data/cats_products');
const productos = require('./data/products/');
const comentarios = require('./data/products_comments/');
const vender = require('./data/sell/publish.json');
const carrito = require('./data/user_cart/25801.json');

// Middleware para habilitar CORS (para que el frontend pueda consumir el backend)
app.use(cors());

// Middleware para parsear JSON en solicitudes
app.use(express.json());
app.use(express.static(__dirname));

// Rutas
// Ruta para obtener productos
app.get('/products', (req, res) => {
    res.status(200).json(productos);
});

// Ruta para obtener producto según id
app.get('/products/:id', (req, res) => {
    const product = productos.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Ruta para obtener todas las categorías
app.get('/categories', (req, res) => {
    res.status(200).json(categorias);
});

// Ruta para obtener productos por categoría
app.get('/categories/:catId/products', (req, res) => {
    const catId = req.params.catId;
    const filteredProducts = prodsCat.filter(p => p.Id === parseInt(catId));
    
    if (filteredProducts.length > 0) {
        res.json(filteredProducts);
    } else {
        res.status(404).json({ message: 'No se encontraron productos para esta categoría' });
    }
});

// Ruta para obtener comentarios de un producto
app.get('/products/:productId/comments', (req, res) => {
    const productId = req.params.productId;
    const productComments = comentarios.filter(c => c.productId === parseInt(productId));
    
    if (productComments.length > 0) {
        res.json(productComments);
    } else {
        res.status(404).json({ message: 'No hay comentarios para este producto' });
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
    const userId = req.params.userId;
    const userCart = carrito[userId];
    
    if (userCart) {
        res.json(userCart);
    } else {
        res.status(404).json({ message: 'Carrito de usuario no encontrado' });
    }
});

// Inicia el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




