import { Router } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../config/db.js';
import validateClassroom from '../validation/classroom.validation.js';

const router = Router();

router.post('/classroom/new', validateClassroom, async (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }

    try {
        const existingClassroom = await prisma.classroom.findFirst({
            where: {
                name: req.body.name,
            },
        });

        if (existingClassroom) {
            return res.status(409).json({ error: 'El nombre del salón ya existe' });
        }

        const new_classroom = await prisma.classroom.create({
            data: {
                name: req.body.name,
                capacity: req.body.capacity
            }
        });
        res.status(201).json({ message: 'Nuevo salon creado', id: new_classroom.id_classroom });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa. Error creando el salon de clases:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/classroom/view/:id', validateClassroom, async (req, res) => {
    const classroom_view = await prisma.classroom.findUnique({
        where: {
            id_classroom: Number(req.params.id),
        }
    });

    res.json(classroom_view)
})

export default router;