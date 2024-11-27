// el middleware de autorizacion verifica si un usuario tiene un token valido antes de permitir el acceso a algunas rutas o recursos. Para la pauta 4: -verificar que el token JWT esté en la solicitud, verificar que sea válido y no haya expirado.

const jwt = require('jsonwebtoken'); // importamos la libreria
const express = require('express');
const app = express();

// usamos funcion authenticate
const authenticate = (req, res, next) => { // req: solicitud, res: respuesta, next: funcion que pasa el control al siguiente middleware o ruta y si no se llama se frena el flujo de la solicitud.

// primero debemos obtener el token, generalmente en las solicitudes http se manda un encabezado llamado Authorization que presenta el siguiente formato: Bearer <token>. En ese caso, para obtenerlo podemos crear const token de la siguiente manera:
const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
 // req.headers['authorization'] es el encabezado en el que esta el token, y con split podemos dividir el value para que no tome bearer y quedarnos solo con el token. Si el encabezado no esta o no tiene ese formato, el token es undefined.

// para verficar que el token este podemos hacer un if que devuelva el error si no se encuentra
if (!token) {
    return res.status(403).json({ message: 'No se encontró el token de autenticación' });
};

// la verificacion del token se hace con jwt.verify() que es una funcion de la libreria jsonwebtoken. Toma como parametros: el token, la clave secreta y un callback para la decodificacion. 
jwt.verify(token, 'clave_secreta', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }

// si el token es valido se le agregan los datos de usuario como id o nombre a la solicitud y esto se adjudica a decoded, con next se continua
req.user = decoded;
next();
});
// despues de que definimos el middleware debemos aplicarlo a las rutas especificas que queremos proteger, y eso lo hacemos agregando authenticate. Ejemplo, ruta /people
app.get('/people', authenticate, (req, res) => {
    res.json({ message: 'Información desbloqueada', user: req.user }); // envia los datos de la funcion de esa ruta junto con la info de usuario
  });
  
};
