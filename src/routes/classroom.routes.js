import { Router } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../config/db.js';
import * as validation from '../validation/classroom.validation.js';

const router = Router();

router.post('/classroom/new', validation.validateCreateClassroom, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingClassroom = await prisma.classroom.findFirst({
            where: {
                name: req.body.name,
            },
        });

        if (searchingClassroom)
            return res.status(409).json({ error: 'Ya existe un salón con el nombre "' + req.body.name + '"' });

        const creatingNewClassroom = await prisma.classroom.create({
            data: {
                name: req.body.name,
                capacity: req.body.capacity
            }
        });
        res.status(201).json({ message: 'Salón de clases creado con éxito.', classroom: creatingNewClassroom});
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

router.get('/classroom/view/:id', validation.validateViewClassroom, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingClassroom = await prisma.classroom.findUnique({
            where: {
                id_classroom: Number(req.params.id),
            }
        });

        if (!searchingClassroom)
            return res.status(404).json({ error: 'Salon de clases no encontrado.' });

        res.status(201).json({classroom: searchingClassroom});
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
        const seacrhingClassroomList = await prisma.classroom.findMany();

        if (seacrhingClassroomList.length === 0)
            return res.status(404).json({ error: 'No hay salones de clases registrados.' });

        res.status(201).json({ classrooms: seacrhingClassroomList });
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

router.put('/classroom/update/:id', validation.validateUpdateClassroom, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingClassroom = await prisma.classroom.findUnique({
            where: {
                id_classroom: Number(req.params.id),
            }
        });

        if (!searchingClassroom)
            return res.status(404).json({ error: 'Salon de clases no encontrado.' });

        const updatingClassroom = await prisma.classroom.update({
            where: {
                id_classroom: Number(req.params.id),
            },
            data: {
                name: req.body.name,
                capacity: req.body.capacity,
                status: req.body.status,
            },
        });

        res.status(201).json({ classroom: updatingClassroom });
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

router.patch('/classroom/status/:id', validation.validateStatusClassroom, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingClassroom = await prisma.classroom.findUnique({
            where: {
                id_classroom: Number(req.params.id),
            }
        });

        if (!searchingClassroom)
        return res.status(404).json({ error: 'Salon de clases no encontrado.' });

        const updatingClassroomStatus = await prisma.classroom.update({
            where: {
                id_classroom: Number(req.params.id),
            },
            data: {
                status: req.body.status,
            },
        });

        res.status(201).json({classroom: updatingClassroomStatus });
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