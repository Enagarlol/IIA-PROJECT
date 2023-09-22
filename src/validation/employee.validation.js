import { check } from 'express-validator';

const validateEmployees = [
    check('id_employees').isEmpty().withMessage('Este campo no debe ser enviado'),
    check('name').notEmpty().withMessage('El campo nombre es obligatorio.'),
    check('job_position').notEmpty().withMessage('El campo apellido es obligatorio.'),
    check('email')
      .isEmail().withMessage('El campo email debe ser una dirección de correo válida.')
      .notEmpty().withMessage('El campo email es obligatorio.'),
    check('password').notEmpty().withMessage('El campo contraseña es obligatorio.'),
    check('status').isEmpty().withMessage('Este campo no debe ser enviado'),
  ]

  const validateViewEmployee = [

    check('id').notEmpty().withMessage('El campo id es obligatorio.')
        .isInt().withMessage('El campo id debe ser un numero entero.'),

]

const validateUpdateEmployee = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('id_employees').isEmpty().withMessage('Este campo no debe ser enviado'),
    check('name').notEmpty().withMessage('El campo nombre es obligatorio.'),
    check('job_position').notEmpty().withMessage('El campo apellido es obligatorio.'),
    check('email')
      .isEmail().withMessage('El campo email debe ser una dirección de correo válida.')
      .notEmpty().withMessage('El campo email es obligatorio.'),
    check('password').notEmpty().withMessage('El campo contraseña es obligatorio.'),
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
