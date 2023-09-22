import { check } from 'express-validator';

const validateStudent = [
    check('id_student').isEmpty().withMessage('Este campo no debe ser enviado'),
    check('student_enrollment').notEmpty().withMessage('Completa este campo.'),
    check('name').notEmpty().withMessage('El campo nombre es obligatorio.'),
    check('last_name').notEmpty().withMessage('El campo apellido es obligatorio.'),
    check('age')
        .notEmpty().withMessage('El campo edad es obligatorio.')
        .isInt().withMessage('El campo edad debe ser de tipo numerico entero')
        .custom((value) => { return value >= 5 && value <= 100; }).withMessage('La edad debe estar entre 5 y 80 años.'),
    check('phone')
        .notEmpty().withMessage('El campo telefono es obligatorio.')
        .isInt().withMessage('El numero de telefono solo debe incluir numeros')
        .matches(/^\+\d{1,4}\d{1,14}$/).withMessage('El teléfono debe incluir la clave internacional y ser un número válido.'),
    check('birthday')
        .notEmpty().withMessage('El campo fecha de nacimiento es obligatorio.')
        .isISO8601().withMessage('Formato de fecha incorrecto'),
    check('email')
        .isEmail().withMessage('El campo email debe ser una dirección de correo válida.')
        .notEmpty().withMessage('El campo email es obligatorio.'),
    check('password').notEmpty().withMessage('El campo contraseña es obligatorio.'),
    check('picture').notEmpty().withMessage('El campo fotografia es obligatorio.'),
    check('status').isEmpty().withMessage('Este campo no debe ser enviado'),
    check('session').isEmpty().withMessage('Este campo no debe ser enviado'),
]

const validateViewStudent = [

    check('id').notEmpty().withMessage('El campo id es obligatorio.')
        .isInt().withMessage('El campo id debe ser un numero entero.'),

]

const validateUpdateStudent = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('id_student').isEmpty().withMessage('Este campo no debe ser enviado'),
    check('student_enrollment').isEmpty().withMessage('Este campo no debe ser enviado'),
    check('name').notEmpty().withMessage('Completa este campo.'),
    check('last_name').notEmpty().withMessage('Completa este campo.'),
    check('age')
        .notEmpty().withMessage('El campo edad es obligatorio.')
        .isInt().withMessage('El campo edad debe ser de tipo numerico entero')
        .custom((value) => { return value >= 5 && value <= 100; }).withMessage('La edad debe estar entre 5 y 80 años.'),
    check('phone')
        .notEmpty().withMessage('El campo telefono es obligatorio.')
        .isInt().withMessage('El numero de telefono solo debe incluir numeros')
        .matches(/^\+\d{1,4}\d{1,14}$/).withMessage('El teléfono debe incluir la clave internacional y ser un número válido.'),
    check('birthday')
        .notEmpty().withMessage('El campo fecha de nacimiento es obligatorio.')
        .isISO8601().withMessage('Formato de fecha incorrecto'),
    check('email')
        .isEmail().withMessage('El campo email debe ser una dirección de correo válida.')
        .notEmpty().withMessage('El campo email es obligatorio.'),
    check('password').notEmpty().withMessage('El campo contraseña es obligatorio.'),
    check('picture').notEmpty().withMessage('El campo fotografia es obligatorio.'),
    check('status').isEmpty().withMessage('Este campo no debe ser enviado'),
    check('session').isEmpty().withMessage('Este campo no debe ser enviado'),
];

const validateStatusStudent = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('status')
        .notEmpty().withMessage('Completa este campo.')
        .isBoolean().withMessage('Completa utilizando un valor booleano.'),
];

export { validateStudent, validateUpdateStudent, validateViewStudent, validateStatusStudent };
