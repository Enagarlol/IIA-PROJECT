import { Router } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../config/db.js';
import * as validation from '../validation/listCourse.validation.js';

const router = Router();

router.post('/list_course/new', validation.validateCreateListCourse, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingList = await prisma.list_Course.findFirst({
            where: {
                id_student: req.body.id_student,
                id_course: req.body.id_course
            },
        });

        if (searchingList)
            return res.status(409).json({ error: 'Este alumno ya esta agregado a este curso' });

        const creatingNewList = await prisma.list_Course.create({
            data: {
                assistance: req.body.assistance,
                id_student: req.body.id_student,
                id_course: req.body.id_course
            }
        });
        res.status(201).json({ message: 'Alumno agregado al curso con éxito.', list: creatingNewList});
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud New List' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud New ist', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/list_course/view/:id', validation.validateViewListCourse, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingList = await prisma.list_Course.findUnique({
            where: {
                id_list: Number(req.params.id),
            }
        });

        if (!searchingList)
            return res.status(404).json({ error: 'Lista no encontrado.' });

        res.status(201).json({List: searchingList});
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud View List' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud View List', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/list_course/list', async (req, res) => {
    try {
        const searchingListCourse = await prisma.list_Course.findMany();

        if (searchingListCourse.length === 0)
            return res.status(404).json({ error: 'No hay Alumnos registrados en cursos registrados.' });

        res.status(201).json({ classrooms: searchingListCourse });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud List course' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud List course', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.put('/list_course/update/:id', validation.validateUpdateListCourse, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingListCourse = await prisma.list_Course.findUnique({
            where: {
                id_list: Number(req.params.id),
            }
        });

        if (!searchingListCourse)
            return res.status(404).json({ error: 'Lista no encontrada.' });

        const updatingListCourse = await prisma.list_Course.update({
            where: {
                id_list: Number(req.params.id),
            },
            data: {
                assistance: req.body.assistance,
                id_student: req.body.id_student,
                id_course: req.body.id_course,
            },
        });

        res.status(201).json({ List: updatingListCourse });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Update List' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud Update List', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.patch('/list_course/status/:id', validation.validateStatusListCourse, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingListCourse = await prisma.list_Course.findUnique({
            where: {
                id_list: Number(req.params.id),
            }
        });

        if (!searchingListCourse)
        return res.status(404).json({ error: 'Lista del curso no encontrado.' });

        const updatingListCourseStatus = await prisma.list_Course.update({
            where: {
                id_list: Number(req.params.id),
            },
            data: {
                assistance: req.body.assistance,
            },
        });

        res.status(201).json({List: updatingListCourseStatus });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Status List  Course' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud Status List Course', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

export default router;