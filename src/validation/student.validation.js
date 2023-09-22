import { check } from 'express-validator';

const validateCreateStudent = [
    check('id_student').isEmpty().withMessage('Este campo no debe ser enviado'),
    check('student_enrollment').notEmpty().withMessage('Completa este campo.'),
    check('name')
        .notEmpty().withMessage('Completa este campo.')
        .matches(/^[A-Za-z\s]+$/).withMessage('Completa utilizando solo letras.'),
    check('last_name')
        .notEmpty().withMessage('Completa este campo.')
        .matches(/^[A-Za-z\s]+$/).withMessage('Completa utilizando solo letras.'),
    check('age')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.')
        .custom((value) => { return value >= 5 && value <= 100; }).withMessage('La edad debe estar entre 5 y 80 años.'),
    check('phone')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.')
        .matches(/^\+\d{1,4}\d{1,14}$/).withMessage('El teléfono debe incluir la clave internacional y ser un número válido.'),
    check('birthday')
        .notEmpty().withMessage('Completa este campo.')
        .isISO8601().withMessage('Completa este campo con un formato de fecha YYYY-MM-DD.'),
    check('email')
        .isEmail().withMessage('Completa este campo.')
        .notEmpty().withMessage('Completa este campo.'),
    check('password').notEmpty().withMessage('Completa este campo.'),
    check('picture').notEmpty().withMessage('Completa este campo.'),
    check('status').isEmpty().withMessage('Este campo no debe ser enviado'),
    check('session').isEmpty().withMessage('Este campo no debe ser enviado'),
]

const validateViewStudent = [

    check('id').notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),

]

const validateUpdateStudent = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('id_student').isEmpty().withMessage('Este campo no debe ser enviado'),
    check('student_enrollment').isEmpty().withMessage('Este campo no debe ser enviado'),
    check('name')
        .notEmpty().withMessage('Completa este campo.')
        .matches(/^[A-Za-z\s]+$/).withMessage('Completa utilizando solo letras.'),
    check('last_name')
        .notEmpty().withMessage('Completa este campo.')
        .matches(/^[A-Za-z\s]+$/).withMessage('Completa utilizando solo letras.'),
    check('age')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.')
        .custom((value) => { return value >= 5 && value <= 100; }).withMessage('La edad debe estar entre 5 y 80 años.'),
    check('phone')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.')
        .matches(/^\+\d{1,4}\d{1,14}$/).withMessage('Este campo debe incluir la clave internacional y ser un número válido.'),
    check('birthday')
        .notEmpty().withMessage('Completa este campo.')
        .isISO8601().withMessage('Completa este campo con un formato de fecha YYYY-MM-DD.'),
    check('email')
        .isEmail().withMessage('Completa este campo con una dirección de correo válida.')
        .notEmpty().withMessage('Completa este campo.'),
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

export { validateCreateStudent, validateUpdateStudent, validateViewStudent, validateStatusStudent };
