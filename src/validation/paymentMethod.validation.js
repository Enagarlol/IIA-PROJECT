import { check } from 'express-validator';

const validateCreatePaymentMethod = [
    check('name')
        .notEmpty().withMessage('Completa este campo.')
        .matches(/^[A-Za-z\s]+$/).withMessage('Completa utilizando solo letras.'),
    check('card_number')
        .notEmpty().withMessage('Completa este campo.')
        .isNumeric().withMessage('Completa utilizando solo numeros enteros.')
        .isLength({ min: 16, max: 16 }).withMessage('El número de tarjeta debe contener 16 dígitos.'),
    check('valid_thru')
        .notEmpty().withMessage('Completa este campo.')
        .custom((value) => {
            const dateFormatRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
            return dateFormatRegex.test(value);
        }).withMessage('Completa este campo en formato YYYY-MM.'),
    check('name_bank').notEmpty().withMessage('Completa este campo.'),
    check('type_card').notEmpty().withMessage('Completa este campo.'),
    check('type_account').notEmpty().withMessage('Completa este campo.'),
    check('status').isEmpty().withMessage('Este campo no debe ser completado.'),
    check('id_student')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
];

const validateViewPaymentMethod = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
];

const validateUpdatePaymentMethod = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('name')
        .notEmpty().withMessage('Completa este campo.')
        .matches(/^[A-Za-z\s]+$/).withMessage('Completa utilizando solo letras.'),
    check('card_number')
        .notEmpty().withMessage('Completa este campo.')
        .isNumeric().withMessage('Completa utilizando solo numeros enteros.')
        .isLength({ min: 16, max: 16 }).withMessage('El número de tarjeta debe contener 16 dígitos.'),
    check('valid_thru')
        .notEmpty().withMessage('Completa este campo.')
        .custom((value) => {
            const dateFormatRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
            return dateFormatRegex.test(value);
        }).withMessage('Completa este campo en formato YYYY-MM.'),
    check('name_bank').notEmpty().withMessage('Completa este campo.'),
    check('type_card').notEmpty().withMessage('Completa este campo.'),
    check('type_account').notEmpty().withMessage('Completa este campo.'),
    check('status').notEmpty().withMessage('Completa este campo.'),
    check('id_student')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
];

const validateStatusPaymentMethod = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('status').notEmpty().withMessage('Completa este campo.'),
];

export { validateCreatePaymentMethod, validateViewPaymentMethod, validateUpdatePaymentMethod, validateStatusPaymentMethod };