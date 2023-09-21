import { check } from 'express-validator';

const validateCreateRole = [
    check('name').notEmpty().withMessage('El campo nombre es obligatorio.'),
];

const validateViewRole = [
    check('id')
    
        .notEmpty().withMessage('El campo id es obligatorio.')
        .isInt().withMessage('El campo id debe ser un numero entero.'),
];

const validateUpdateRole = [
    check('id')
        .notEmpty().withMessage('El campo id es obligatorio.')
        .isInt().withMessage('El campo id debe ser un numero entero.'),
    check('name').notEmpty().withMessage('El campo nombre es obligatorio.'),
    check('status')
        .notEmpty().withMessage('El campo estatus es obligatorio')
        .isBoolean().withMessage('El campo status debe ser un valor booleano'),
];

const validateStatusRole = [
    check('id')
        .notEmpty().withMessage('El campo id es obligatorio.')
        .isInt().withMessage('El campo id debe ser un numero entero.'),
    check('status')
        .notEmpty().withMessage('El campo estatus es obligatorio')
        .isBoolean().withMessage('El campo status debe ser un valor booleano'),
];

export { validateCreateRole, validateViewRole, validateUpdateRole, validateStatusRole };