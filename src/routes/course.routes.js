import { Router } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../config/db.js';
import * as validation from '../validation/course.validation.js';

const router = Router();

router.post('/course/new', validation.validateCreateCourse, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingCourse = await prisma.course.findFirst({
            where: {
                name: req.body.name,
            },
        });

        if (searchingCourse)
            return res.status(409).json({ error: 'Ya existe un curso con el nombre "' + req.body.name + '"' });

        const creatingNewCourse = await prisma.course.create({
            data: {
                name: req.body.name,
                spaces: req.body.spaces,
                id_employees: req.body.id_employees
            }
        });
        res.status(201).json({ message: 'Curso creado con éxito.', course: creatingNewCourse});
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud New Course' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud New Course', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/course/view/:id', validation.validateViewCourse, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingCourse = await prisma.course.findUnique({
            where: {
                id_course: Number(req.params.id),
            }
        });

        if (!searchingCourse)
            return res.status(404).json({ error: 'Curso no encontrado.' });

        res.status(201).json({course: searchingCourse});
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud View Course' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud View Course', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/course/list', async (req, res) => {
    try {
        const searchingCourseList = await prisma.course.findMany();

        if (searchingCourseList.length === 0)
            return res.status(404).json({ error: 'No hay cursos registrados.' });

        res.status(201).json({ course: searchingCourseList });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud List course' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud List Course', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.put('/course/update/:id', validation.validateUpdateCourse, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingCourse = await prisma.course.findUnique({
            where: {
                id_course: Number(req.params.id),
            }
        });

        if (!searchingCourse)
            return res.status(404).json({ error: 'Curso no encontrado.' });

        const updatingCourse = await prisma.course.update({
            where: {
                id_course: Number(req.params.id),
            },
            data: {
                name: req.body.name,
                spaces: req.body.spaces,
                status: req.body.status,
                id_employees: req.body.id_employees
            },
        });

        res.status(201).json({ course: updatingCourse });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Update course' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud Update course', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.patch('/course/status/:id', validation.validateStatusCourse, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingCourse = await prisma.course.findUnique({
            where: {
                id_course: Number(req.params.id),
            }
        });

        if (!searchingCourse)
        return res.status(404).json({ error: 'Curso no encontrado.' });

        const updatingCourseStatus = await prisma.course.update({
            where: {
                id_course: Number(req.params.id),
            },
            data: {
                status: req.body.status,
            },
        });

        res.status(201).json({course: updatingCourseStatus });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Status course' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud Status course', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

export default router;