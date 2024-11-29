const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path'); 

// Importar archivos JSON
const comprar = require('./data/cart/buy.json');
const categorias = require('./data/cats/cat.json');

const catProds = [];
async function ImportarCatProd(catProds) {
    for (let i = 101; i <= 109; i++) {
        const data = await require(`./data/cats_products/${i}.json`);
        catProds.push(data);
    }
}
ImportarCatProd (catProds);

const p40281 = require('./data/products/40281.json');
const p50741 = require('./data/products/50741.json');
const p50742 = require('./data/products/50742.json');
const p50743 = require('./data/products/50743.json');
const p50744 = require('./data/products/50744.json');
const p50921 = require('./data/products/50921.json');
const p50922 = require('./data/products/50922.json');
const p50923 = require('./data/products/50923.json');
const p50924 = require('./data/products/50924.json');
const p50925 = require('./data/products/50925.json');
const p60801 = require('./data/products/60801.json');
const p60802 = require('./data/products/60802.json');
const p60803 = require('./data/products/60803.json');
const p60804 = require('./data/products/60804.json');

const c40281 = require('./data/products_comments/40281.json');
const c50741 = require('./data/products_comments/50741.json');
const c50742 = require('./data/products_comments/50742.json');
const c50743 = require('./data/products_comments/50743.json');
const c50744 = require('./data/products_comments/50744.json');
const c50921 = require('./data/products_comments/50921.json');
const c50922 = require('./data/products_comments/50922.json');
const c50923 = require('./data/products_comments/50923.json');
const c50924 = require('./data/products_comments/50924.json');
const c50925 = require('./data/products_comments/50925.json');
const c60801 = require('./data/products_comments/60801.json');
const c60802 = require('./data/products_comments/60802.json');
const c60803 = require('./data/products_comments/60803.json');
const c60804 = require('./data/products_comments/60804.json');


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




