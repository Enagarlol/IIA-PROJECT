import { check } from 'express-validator';

const validateCreatePaymentHistory = [
    check('id_history').isEmpty().withMessage('Este campo no debe ser enviado.'),
    check('date_time').notEmpty().withMessage('Completa este campo.')
    .isISO8601(),
    check('amount').isFloat().withMessage('Completa este campo.'),
    check('concept').notEmpty().withMessage('Completa este campo.'),
    check('folio').notEmpty().withMessage('Completa este campo.'),
    check('status').isEmpty().withMessage('Este campo no debe ser enviado.'),
];

const validateViewPaymentHistory = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
];

const validateUpdatePaymentHistory = [
    check('id_history').isEmpty().withMessage('Este campo no debe ser enviado.'),
    check('date_time').notEmpty().withMessage('Completa este campo.')
    .isISO8601(),
    check('amount').isFloat().withMessage('Completa este campo.'),
    check('concept').notEmpty().withMessage('Completa este campo.'),
    check('folio').notEmpty().withMessage('Completa este campo.'),
    check('status').isEmpty().withMessage('Este campo no debe ser enviado.'),
    check('id_course').isEmpty().withMessage('Este campo no debe ser enviado.'),
    check('id_method').isEmpty().withMessage('Este campo no debe ser enviado.'),
];

const validateStatusPaymentHistory = [
    check('id')
        .notEmpty().withMessage('Completa este campo.')
        .isInt().withMessage('Completa utilizando solo numeros enteros.'),
    check('status').notEmpty().withMessage('Completa este campo.'),
];

export { validateCreatePaymentHistory, validateViewPaymentHistory, validateUpdatePaymentHistory, validateStatusPaymentHistory };