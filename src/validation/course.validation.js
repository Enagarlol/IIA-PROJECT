import { check } from 'express-validator';

const validateCreateCourse = [
    check('name').notEmpty().withMessage('Completa este campo.'),
    check('spaces')
        .notEmpty().withMessage('Completa este campo.')
        .isInt({ gt: 0 }).withMessage('Completa utilizando solo numeros enteros.'),
    check('id_employees')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('status').isEmpty().withMessage('Este campo no deber ser enviado.'),
    check('occupied_spaces').isEmpty().withMessage('Este campo no deber ser enviado.')
];

const validateViewCourse = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
];

const validateUpdateCourse = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('name').notEmpty().withMessage('Completa este campo.'),
    check('spaces')
        .notEmpty().withMessage('Completa este campo.')
        .isInt({ gt: 0 }).withMessage('Completa utilizando solo numeros enteros.'),
    check('id_employees')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('status')
        .notEmpty().withMessage('Completa este campo.')
        .isBoolean().withMessage('Completa utilizando un valor booleano.'),
];

const validateStatusCourse = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('status')
        .notEmpty().withMessage('Completa este campo.')
        .isBoolean().withMessage('Completa utilizando un valor booleano.'),
];

export { validateCreateCourse, validateViewCourse, validateUpdateCourse, validateStatusCourse };