const jwt = require('jsonwebtoken'); // importamos libreria

const authorize = (req, res, next) => { // req: solicitud, res: respuesta, next: funcion que pasa el control al siguiente middleware o ruta y si no se llama se frena el flujo de la solicitud.

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
