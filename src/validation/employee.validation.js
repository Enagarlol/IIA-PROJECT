import { check } from 'express-validator';

const validateEmployees = [
  check('id_employees').isEmpty().withMessage('Este campo no debe ser enviado'),
  check('name')
    .notEmpty().withMessage('Completa este campo.')
    .matches(/^[A-Za-z\s]+$/).withMessage('Completa utilizando solo letras.'),
  check('job_position').notEmpty().withMessage('Completa este campo.'),
  check('email')
    .isEmail().withMessage('Completa este campo con una dirección de correo válida.')
    .notEmpty().withMessage('Completa este campo.'),
  check('password').notEmpty().withMessage('Completa este campo.'),
  check('status').isEmpty().withMessage('Este campo no debe ser enviado'),
]

const validateViewEmployee = [

  check('id')
    .notEmpty().withMessage('Completa este campo.')
    .isInt().withMessage('Completa utilizando solo numeros enteros.'),

]

const validateUpdateEmployee = [
  check('id')
    .notEmpty().withMessage('Completa este campo.')
    .isInt().withMessage('Completa utilizando solo numeros enteros.'),
  check('id_employees').isEmpty().withMessage('Este campo no debe ser enviado'),
  check('name')
    .notEmpty().withMessage('Completa este campo.')
    .matches(/^[A-Za-z\s]+$/).withMessage('Completa utilizando solo letras.'),
  check('job_position').notEmpty().withMessage('Completa este campo.'),
  check('email')
    .isEmail().withMessage('El campo email debe ser una dirección de correo válida.')
    .notEmpty().withMessage('Completa este campo.'),
  check('password').notEmpty().withMessage('ECompleta este campo.'),
  check('status').isEmpty().withMessage('Este campo no debe ser enviado'),
  check('id_roles').isEmpty().withMessage(' Este campo no debe ser enviado'),
];

const validateStatusEmployee = [
  check('id')
    .notEmpty().withMessage('Completa este campo.')
    .isInt().withMessage('Completa utilizando solo numeros enteros.'),
  check('status')
    .notEmpty().withMessage('Completa este campo.')
    .isBoolean().withMessage('Completa utilizando un valor booleano.'),
];

export { validateEmployees, validateViewEmployee, validateUpdateEmployee, validateStatusEmployee };
