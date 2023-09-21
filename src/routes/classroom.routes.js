import { Router } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../config/db.js';
import * as classroomValidation from '../validation/classroom.validation.js';

const router = Router();

router.post('/classroom/new', classroomValidation.validateCreateClassroom, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const existingClassroom = await prisma.classroom.findFirst({
            where: {
                name: req.body.name,
            },
        });

        if (existingClassroom)
            return res.status(409).json({ error: 'Ya existe un salón con el nombre "' + req.body.name + '"' });

        const new_classroom = await prisma.classroom.create({
            data: {
                name: req.body.name,
                capacity: req.body.capacity
            }
        });
        res.status(201).json({ message: 'Salón de clases creado con éxito.', classroom: new_classroom});
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud New Classroom' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud New Classroom', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/classroom/view/:id', classroomValidation.validateViewClassroom, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const classroom_view = await prisma.classroom.findUnique({
            where: {
                id_classroom: Number(req.params.id),
            }
        });

        if (!classroom_view)
            return res.status(404).json({ error: 'Salon de clases no encontrado.' });

        res.status(201).json({classroom: classroom_view});
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud View Classroom' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud View Classroom', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/classroom/list', async (req, res) => {
    try {
        const classroom_list = await prisma.classroom.findMany();

        if (classroom_list.length === 0)
            return res.status(404).json({ error: 'No hay salones de clases registrados.' });

        res.status(201).json({ classrooms: classroom_list });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud List Classroom' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud List Classroom', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.put('/classroom/update/:id', classroomValidation.validateUpdateClassroom, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const classroom_exist = await prisma.classroom.findUnique({
            where: {
                id_classroom: Number(req.params.id),
            }
        });

        if (!classroom_exist)
            return res.status(404).json({ error: 'Salon de clases no encontrado.' });

        const classroom_update = await prisma.classroom.update({
            where: {
                id_classroom: Number(req.params.id),
            },
            data: {
                name: req.body.name,
                capacity: req.body.capacity,
                status: req.body.status,
            },
        });

        res.status(201).json({ classroom: classroom_update });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Update Classroom' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud Update Classroom', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.patch('/classroom/status/:id', classroomValidation.validateStatusClassroom, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const classroom_exist = await prisma.classroom.findUnique({
            where: {
                id_classroom: Number(req.params.id),
            }
        });

        if (!classroom_exist)
        return res.status(404).json({ error: 'Salon de clases no encontrado.' });

        const classroom_update = await prisma.classroom.update({
            where: {
                id_classroom: Number(req.params.id),
            },
            data: {
                status: req.body.status,
            },
        });

        res.status(201).json({classroom: classroom_update });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Status Classroom' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud Status Classroom', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

export default router;