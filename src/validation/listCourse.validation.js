import { check } from 'express-validator';

const validateCreateListCourse = [
    check('id_student')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('id_course')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('assistance').isEmpty().withMessage('Este campo no deber ser enviado.')
];

const validateViewListCourse = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
];

const validateUpdateListCourse = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('assistance')
        .notEmpty().withMessage('Completa este campo.'),
    check('id_student')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('id_course')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
];

const validateStatusListCourse = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('assistance')
        .notEmpty().withMessage('Completa este campo.'),
];

export { validateCreateListCourse, validateViewListCourse, validateUpdateListCourse, validateStatusListCourse };