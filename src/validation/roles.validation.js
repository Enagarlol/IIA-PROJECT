import { check } from 'express-validator';

const validateCreateRole = [
    check('name').notEmpty().withMessage('Completa este campo.'),
    check('status').isEmpty().withMessage('Este campo no deber ser enviado.')
];

const validateViewRole = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
];

const validateUpdateRole = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('name').notEmpty().withMessage('Completa este campo.'),
    check('status')
        .notEmpty().withMessage('Completa este campo.')
        .isBoolean().withMessage('Completa utilizando un valor booleano.'),
];

const validateStatusRole = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('status')
        .notEmpty().withMessage('Completa este campo.')
        .isBoolean().withMessage('Completa utilizando un valor booleano.'),
];

export { validateCreateRole, validateViewRole, validateUpdateRole, validateStatusRole };