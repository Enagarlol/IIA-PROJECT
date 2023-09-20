import { body } from 'express-validator'

const validateClassroom = [
    body('name').notEmpty().withMessage('El nombre del salon es obligatorio.'),
    body('capacity')
        .notEmpty().withMessage('La capacidad del salo es obligatorio.')
        .isInt({ gt: 0 }).withMessage('El campo debe ser un numero entero.'),
]

export default validateClassroom