import { check } from 'express-validator';

const validateCreateClassroom = [
    check('name').notEmpty().withMessage('Completa este campo.'),
    check('capacity')
        .notEmpty().withMessage('Completa este campo.')
        .isInt({ gt: 0 }).withMessage('Completa utilizando solo numeros enteros.'),
    check('status').isEmpty().withMessage('Este campo no deber ser enviado.')
];

const validateViewClassroom = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
];

const validateUpdateClassroom = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('id_classroom').isEmpty().withMessage('Este campo no debe ser enviado.'),
    check('name').notEmpty().withMessage('Completa este campo.'),
    check('capacity')
        .notEmpty().withMessage('Completa este campo.')
        .isInt({ gt: 0 }).withMessage('Completa utilizando solo numeros enteros.'),
    check('status')
        .notEmpty().withMessage('Completa este campo.')
        .isBoolean().withMessage('Completa utilizando un valor booleano.'),
];

const validateStatusClassroom = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('status')
        .notEmpty().withMessage('Completa este campo.')
        .isBoolean().withMessage('Completa utilizando un valor booleano.'),
];

export { validateCreateClassroom, validateViewClassroom, validateUpdateClassroom, validateStatusClassroom };