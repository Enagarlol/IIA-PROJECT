import { Router } from 'express'
import { prisma } from '../config/db.js'
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as studentValidation from '../validation/student.validation.js';

const router = Router()

const secretKey = 'registro_user'; // Reemplaza esto con tu clave secreta real

// Obtener todos los alumnos
router.get('/students/list', async (req, res) => {

  try {
    const students_list = await prisma.students.findMany();

    if (students_list.length === 0)
      return res.status(404).json({ error: 'No hay estudiantes registrados.' });

    res.status(201).json({ classrooms: students_list });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud List Classroom' });
    console.error({ error: 'Error interno del servidor al procesar la solicitud List Classroom', details: error.message });
    await prisma.$disconnect();
    console.error('Desconexion de prisma Exitosa');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.error('Desconexion de prisma Exitosa');
  }
});

// Obtener alumno por ID
router.get('/student/view/:id', studentValidation.validateViewStudent, async (req, res) => {

  if (!validationResult(req).isEmpty())
    return res.status(400).json({ errors: validationResult(req).array() });

  try {
    const student_view = await prisma.students.findUnique({
      where: {
        id_student: Number(req.params.id),
      }
    });

    if (!student_view)
      return res.status(404).json({ error: 'Estudiante no encontrado.' });

    res.status(201).json({ Estudiante: student_view });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud View Student' });
    console.error({ error: 'Error interno del servidor al procesar la solicitud View Student', details: error.message });
    await prisma.$disconnect();
    console.error('Desconexion de prisma Exitosa');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.error('Desconexion de prisma Exitosa');
  }
});


// Ruta para crear un nuevo estudiante con contraseña segura
router.post('/student/new', studentValidation.validateStudent, async (req, res) => {
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
router.post('/student/login', async (req, res) => {

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

// Actualizar datos del alumno por ID
router.put('/student/update/:id', studentValidation.validateUpdateStudent, async (req, res) => {
  if (!validationResult(req).isEmpty())
    return res.status(400).json({ errors: validationResult(req).array() });

  try {
    const searchingStudent = await prisma.students.findUnique({
      where: {
        id_student: Number(req.params.id),
      }
    });

    if (!searchingStudent)
      return res.status(404).json({ error: 'Salon de clases no encontrado.' });

    const updatingStudent = await prisma.students.update({
      where: {
        id_student: Number(req.params.id),
      },
      data: {
        student_enrollment: req.body.student_enrollment,
        name: req.body.name,
        last_name: req.body.last_name,
        age: req.body.age,
        phone: req.body.phone,
        birthday: req.body.birthday, 
        email: req.body.email,
        password: req.body.password,
        picture: req.body.picture,  
        session: req.body.session,
      },
    });

    res.status(201).json({ student: updatingStudent });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Update Classroom' });
    console.error({ error: 'Error interno del servidor al procesar la solicitud Update Classroom', details: error.message });
    await prisma.$disconnect();
    console.error('Desconexion de prisma Exitosa');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.error('Desconexion de prisma Exitosa');
  }
});

router.patch('/student/status/:id', studentValidation.validateStatusStudent, async (req, res) => {
  
  if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });

  try {
      const searchingStudent = await prisma.students.findUnique({
          where: {
              id_student: Number(req.params.id),
          }
      });

      if (!searchingStudent)
      return res.status(404).json({ error: 'Salon de clases no encontrado.' });

      const updatingStudentStatus = await prisma.students.update({
          where: {
              id_student: Number(req.params.id),
          },
          data: {
              status: req.body.status,
          },
      });

      res.status(201).json({classroom: updatingStudentStatus });
  } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Status Classroom' });
      console.error({ error: 'Error interno del servidor al procesar la solicitud Status Classroom', details: error.message });
      await prisma.$disconnect();
      console.error('Desconexion de prisma Exitosa');
      process.exit(1);
  } finally {
      await prisma.$disconnect();
      console.error('Desconexion de prisma Exitosa');
  }
});

export default router;