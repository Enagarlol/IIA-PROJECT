import { check } from 'express-validator';

const validateCreatePaymentMethod = [
    check('name')
        .notEmpty().withMessage('Completa este campo.')
        .matches(/^[A-Za-z]+$/).withMessage('Completa utilizando solo letras.'),
    check('card_number')
        .notEmpty().withMessage('Completa este campo.')
        .isNumeric().withMessage('Completa utilizando solo numeros enteros.')
        .isLength({ min: 16, max: 16 }).withMessage('El número de tarjeta debe tener 16 dígitos.'),
    check('time_departure')
        .notEmpty().withMessage('El campo Hora de Salida es obligatorio.')
        .custom((value) => {
            const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            return timeRegex.test(value);
        }).withMessage('La hora de salida debe estar en formato HH:MM.'),
    check('date')
        .notEmpty().withMessage('El campo fecha es obligatorio.')
        .isISO8601().withMessage('Formato de fecha incorrecto'),
    check('id_classroom')
        .notEmpty().withMessage('El campo id_classroom es obligatorio.')
        .isInt().withMessage('El campo id_classroom debe ser de tipo numerico entero'),
    check('id_course')
        .notEmpty().withMessage('El campo id_course es obligatorio.')
        .isInt().withMessage('El campo id_course debe ser de tipo numerico entero'),
];

const validateViewPaymentMethod = [
    check('id')
        .notEmpty().withMessage('El campo id es obligatorio.')
        .isInt().withMessage('El campo id debe ser un numero entero.'),
];

const validateUpdatePaymentMethod = [
    check('id')
        .notEmpty().withMessage('El campo id es obligatorio.')
        .isInt().withMessage('El campo id debe ser un numero entero.'),
    check('time_entry')
        .notEmpty().withMessage('El campo Hora de Entrada es obligatorio.')
        .custom((value) => {
            const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            return timeRegex.test(value);
        }).withMessage('La hora de entrada debe estar en formato HH:MM.'),
    check('time_departure')
        .notEmpty().withMessage('El campo Hora de Salida es obligatorio.')
        .custom((value) => {
            const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            return timeRegex.test(value);
        }).withMessage('La hora de salida debe estar en formato HH:MM.'),
    check('date')
        .notEmpty().withMessage('El campo fecha es obligatorio.')
        .isISO8601().withMessage('Formato de fecha incorrecto'),
    check('status').notEmpty().withMessage('El campo estatus es obligatorio.'),
    check('id_classroom')
        .notEmpty().withMessage('El campo id_classroom es obligatorio.')
        .isInt().withMessage('El campo id_classroom debe ser de tipo numerico entero'),
    check('id_course')
        .notEmpty().withMessage('El campo id_course es obligatorio.')
        .isInt().withMessage('El campo id_course debe ser de tipo numerico entero'),
];

const validateStatusPaymentMethod = [
    check('id')
        .notEmpty().withMessage('El campo id es obligatorio.')
        .isInt().withMessage('El campo id debe ser un numero entero.'),
    check('status').notEmpty().withMessage('El campo estatus es obligatorio.'),
];

export { validateCreatePaymentMethod, validateViewPaymentMethod, validateUpdatePaymentMethod, validateStatusPaymentMethod };