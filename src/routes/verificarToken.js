import jwt from 'jsonwebtoken';

const secretKey = 'registro_user'; // Reemplaza esto con tu clave secreta real

function verificarToken(req, res, next) {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token.' });
  }

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }

    // Si el token es válido, puedes acceder a los datos decodificados (en este ejemplo, userId)
    req.userData = decoded;
    next();
  });
}

export default verificarToken;