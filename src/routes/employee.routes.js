import { Router } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as employeesValidation from '../validation/employee.validation.js';

const router = Router();

const secretKey = 'registro_employee'; // Reemplaza esto con tu clave secreta real

router.get('/employees/list',  async (req, res) => {

  try {
    const employees_list = await prisma.employees.findMany();

    if (employees_list.length === 0)
      return res.status(404).json({ error: 'No hay estudiantes registrados.' });

    res.status(201).json({ classrooms: employees_list });
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
router.get('/employee/view/:id', employeesValidation.validateViewEmployee ,async (req, res) => {

  if (!validationResult(req).isEmpty())
    return res.status(400).json({ errors: validationResult(req).array() });

  try {
    const employee_view = await prisma.employees.findUnique({
      where: {
        id_employees: Number(req.params.id),
      }
    });

    if (!employee_view)
      return res.status(404).json({ error: 'Estudiante no encontrado.' });

    res.status(201).json({ Empleado: employee_view });
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
router.post('/employee/new', employeesValidation.validateEmployees, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    // Hashea la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // El segundo argumento es el número de rondas de sal
    const new_employee = await prisma.employees.create({
      data: {
        ...req.body,
        password: hashedPassword, // Almacena el hash en lugar de la contraseña en texto plano
      },
    });
    res.status(201).json({ message: 'Nuevo empleado creado', id: new_employee.id_employees });
  } catch (error) {
    console.error('Error creando el empleado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para iniciar sesión
router.post('/employee/login', async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;
    const user = await prisma.employees.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return res.status(401).json({ message: 'Correo electrónico incorrecto.' });

    // Compara la contraseña almacenada (hash) con la contraseña proporcionada
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return res.status(401).json({ message: 'Credenciales incorrectas.' });

    // Genera y retorna el token JWT
    const token = jwt.sign({ userId: user.id_employees }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token: token });

  } catch (error) {

    console.error('Error iniciando sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });

  }
});

// Actualizar datos del alumno por ID
router.put('/employee/update/:id', employeesValidation.validateUpdateEmployee, async (req, res) => {

  if (!validationResult(req).isEmpty())
    return res.status(400).json({ errors: validationResult(req).array() });

  try {
    const searchingEmployee = await prisma.employees.findUnique({
      where: {
        id_employees: Number(req.params.id),
      }
    });

    if (!searchingEmployee)
      return res.status(404).json({ error: 'Salon de clases no encontrado.' });

    const updatingEmployee = await prisma.employees.update({
      where: {
        id_employees: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        job_position: req.body.job_position,
        email: req.body.email,
        password: req.body.password,
        status: req.body.status,  
        id_roles: req.body.id_roles,
      },
    });

    res.status(201).json({ employee: updatingEmployee });
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

router.patch('/employee/status/:id', employeesValidation.validateStatusEmployee, async (req, res) => {
  
  if (!validationResult(req).isEmpty())
      return res.status(400).json({ errors: validationResult(req).array() });

  try {
      const searchingEmployee = await prisma.employees.findUnique({
          where: {
              id_employees: Number(req.params.id),
          }
      });

      if (!searchingEmployee)
      return res.status(404).json({ error: 'Salon de clases no encontrado.' });

      const updatingStatusEmployee = await prisma.employees.update({
          where: {
              id_employees: Number(req.params.id),
          },
          data: {
              status: req.body.status,
          },
      });

      res.status(201).json({classroom: updatingStatusEmployee });
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