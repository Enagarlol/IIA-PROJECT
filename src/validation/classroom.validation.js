import { check } from 'express-validator';

const validateCreateClassroom = [
    check('name').notEmpty().withMessage('El campo nombre es obligatorio.'),
    check('capacity')
        .notEmpty().withMessage('El campo capacidad es obligatorio.')
        .isInt({ gt: 0 }).withMessage('El campo capacidad debe ser un numero entero.'),
];

const validateViewClassroom = [
    check('id')
        .notEmpty().withMessage('El campo id es obligatorio.')
        .isInt().withMessage('El campo id debe ser un numero entero.'),
];

const validateUpdateClassroom = [
    check('id')
        .notEmpty().withMessage('El campo id es obligatorio.')
        .isInt().withMessage('El campo id debe ser un numero entero.'),
    check('name').notEmpty().withMessage('El campo nombre es obligatorio.'),
    check('capacity')
        .notEmpty().withMessage('El campo capacidad es obligatorio.')
        .isInt({ gt: 0 }).withMessage('El campo capacidad debe ser un numero entero.'),
    check('status')
        .notEmpty().withMessage('El campo estatus es obligatorio')
        .isBoolean().withMessage('El campo status debe ser un valor booleano'),
];

const validateStatusClassroom = [
    check('id')
        .notEmpty().withMessage('El campo id es obligatorio.')
        .isInt().withMessage('El campo id debe ser un numero entero.'),
    check('status')
        .notEmpty().withMessage('El campo estatus es obligatorio')
        .isBoolean().withMessage('El campo status debe ser un valor booleano'),
];

export { validateCreateClassroom, validateViewClassroom, validateUpdateClassroom, validateStatusClassroom };