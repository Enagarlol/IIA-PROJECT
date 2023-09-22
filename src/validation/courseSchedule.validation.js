import { check } from 'express-validator';

const validateCreateSchedule = [
    check('time_entry')
        .notEmpty().withMessage('Completa este campo.')
        .custom((value) => {
            const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            return timeRegex.test(value);
        }).withMessage('Completa este campo en formato HH:MM.'),
    check('time_departure')
        .notEmpty().withMessage('Completa este campo.')
        .custom((value) => {
            const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            return timeRegex.test(value);
        }).withMessage('Completa este campo en formato HH:MM.'),
    check('date')
        .notEmpty().withMessage('Completa este campo.')
        .isISO8601().withMessage('Completa este campo en formato de fecha YYYY-MM-DD.'),
    check('id_classroom')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('id_course')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('status').isEmpty().withMessage('Este campo no deber ser enviado.')
];

const validateViewSchedule = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
];

const validateUpdateSchedule = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('time_entry')
        .notEmpty().withMessage('Completa este campo.')
        .custom((value) => {
            const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            return timeRegex.test(value);
        }).withMessage('Completa este campo en formato HH:MM.'),
    check('time_departure')
        .notEmpty().withMessage('Completa este campo.')
        .custom((value) => {
            const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            return timeRegex.test(value);
        }).withMessage('Completa este campo en formato HH:MM.'),
    check('date')
        .notEmpty().withMessage('Completa este campo.')
        .isISO8601().withMessage('Completa este campo en formato de fecha YYYY-MM-DD.'),
    check('status').notEmpty().withMessage('Completa este campo.'),
    check('id_classroom')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('id_course')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
];

const validateStatusSchedule = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('status').notEmpty().withMessage('Completa este campo.'),
];

export { validateCreateSchedule, validateViewSchedule, validateUpdateSchedule, validateStatusSchedule };