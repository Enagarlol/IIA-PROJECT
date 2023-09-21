import { Router } from 'express'
import { prisma } from '../config/db.js'
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import verificarToken from './verificarToken.js';

const router = Router()

const secretKey = 'registro_user'; // Reemplaza esto con tu clave secreta real


const validateStudent = [
  body('student_enrollment').notEmpty().withMessage('El campo matricula es obligatorio.'),
  body('name').notEmpty().withMessage('El campo nombre es obligatorio.'),
  body('last_name').notEmpty().withMessage('El campo apellido es obligatorio.'),
  body('age')
    .notEmpty().withMessage('El campo edad es obligatorio.')
    .isInt().withMessage('El campo edad debe ser de tipo numerico entero')
    .custom((value) => { return value >= 5 && value <= 100; }).withMessage('La edad debe estar entre 5 y 80 años.'),
  body('phone')
    .notEmpty().withMessage('El campo telefono es obligatorio.')
    .isInt().withMessage('El numero de telefono solo debe incluir numeros')
    .matches(/^\+\d{1,4}\d{1,14}$/).withMessage('El teléfono debe incluir la clave internacional y ser un número válido.'),
  body('birthday')
    .notEmpty().withMessage('El campo fecha de nacimiento es obligatorio.')
    .isISO8601().withMessage('Formato de fecha incorrecto'),
  body('email')
    .isEmail().withMessage('El campo email debe ser una dirección de correo válida.')
    .notEmpty().withMessage('El campo email es obligatorio.'),
  body('password').notEmpty().withMessage('El campo contraseña es obligatorio.'),
  body('picture').notEmpty().withMessage('El campo fotografia es obligatorio.')
]

// Ruta para crear un nuevo estudiante con contraseña segura
router.post('/student/new', validateStudent, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    // Hashea la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // El segundo argumento es el número de rondas de sal
    const new_student = await prisma.students.create({
      data: {
        ...req.body,
        password: hashedPassword, // Almacena el hash en lugar de la contraseña en texto plano
      },
    });
    res.status(201).json({ message: 'Nuevo estudiante creado', id: new_student.id_student });
  } catch (error) {
    console.error('Error creando el estudiante:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para iniciar sesión
router.post('/student/login',  async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;
    const user = await prisma.students.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return res.status(401).json({ message: 'Correo electrónico incorrecto.' });

    // Compara la contraseña almacenada (hash) con la contraseña proporcionada
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return res.status(401).json({ message: 'Credenciales incorrectas.' });

    // Genera y retorna el token JWT
    const token = jwt.sign({ userId: user.id_student }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token: token });

  } catch (error) {

    console.error('Error iniciando sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });

  }
});

// Rutas protegidas con token JWT
router.post('/student/profile', verificarToken, async (req, res) => {
  // El middleware verificarToken verifica la validez del token y decodifica los datos en req.userData
  // Puedes acceder a req.userData para obtener información del usuario
  res.status(200).json({ message: 'Acceso autorizado.', user: req.userData });

});

export default router;