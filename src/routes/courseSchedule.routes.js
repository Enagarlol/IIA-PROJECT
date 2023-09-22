import { Router } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../config/db.js';
import * as validation from '../validation/courseSchedule.validation.js';

const router = Router();

router.post('/schedule/new', validation.validateCreateSchedule, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {

        const timeEntry = new Date(`2000-01-01T${req.body.time_entry}`);
        const timeDeparture = new Date(`2000-01-01T${req.body.time_departure}`);

        if (isNaN(timeEntry) || isNaN(timeDeparture) || timeEntry >= timeDeparture) {
            return res.status(400).json({ error: 'El horario de salida debe ser mayor que el horario de entrada.' });
        }

        const searchingSchedule = await prisma.course_schedule.findFirst({
            where: {
                time_entry: req.body.time_entry,
                time_departure: req.body.time_departure,
                date: req.body.data,
                id_classroom: req.body.id_classroom
            },
        });

        if (searchingSchedule)
            return res.status(409).json({ error: 'Ya existe un curso en ese mismo horario.' });

        const createNewSchedule = await prisma.course_schedule.create({
            data: {
                time_entry: req.body.time_entry,
                time_departure: req.body.time_departure,
                date: req.body.date,
                id_classroom: req.body.id_classroom,
                id_course: req.body.id_course,
            }
        });
        res.status(201).json({ message: 'Horario agendado con éxito.', schedule:createNewSchedule });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud New Schedule' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud New Schedule', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/schedule/view/:id', validation.validateViewSchedule, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const schedule_view = await prisma.course_schedule.findUnique({
            where: {
                id_schedule: Number(req.params.id),
            }
        });

        if (!schedule_view)
            return res.status(404).json({ error: 'Horario no encontrado.' });

        res.status(201).json({ schedule: schedule_view });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud View Schedule' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud View Schedule', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/schedule/list', async (req, res) => {
    try {
        const seachingScheduleList = await prisma.course_schedule.findMany();

        if (seachingScheduleList.length === 0)
            return res.status(404).json({ error: 'No hay horarios registrados.' });

        res.status(201).json({ schedule: seachingScheduleList });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud List Schedule' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud List Schedule', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.put('/schedule/update/:id', validation.validateUpdateSchedule, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {

        const timeEntry = new Date(`2000-01-01T${req.body.time_entry}`);
        const timeDeparture = new Date(`2000-01-01T${req.body.time_departure}`);

        if (isNaN(timeEntry) || isNaN(timeDeparture) || timeEntry >= timeDeparture) {
            return res.status(400).json({ error: 'El horario de salida debe ser mayor que el horario de entrada.' });
        }

        const identicalSchedule = await prisma.course_schedule.findFirst({
            where: {
                time_entry: req.body.time_entry,
                time_departure: req.body.time_departure,
                date: req.body.data,
                id_classroom: req.body.id_classroom
            },
        });

        if (identicalSchedule)
            return res.status(409).json({ error: 'Ya existe un curso en ese mismo horario.' });

        const searchingSchedule = await prisma.course_schedule.findUnique({
            where: {
                id_schedule: Number(req.params.id),
            }
        });

        if (!searchingSchedule)
            return res.status(404).json({ error: 'Horario no encontrado.' });

        const updatingSchedule = await prisma.course_schedule.update({
            where: {
                id_schedule: Number(req.params.id),
            },
            data: {
                time_entry: req.body.time_entry,
                time_departure: req.body.time_departure,
                date: req.body.date,
                status: req.body.status,
                id_classroom: req.body.id_classroom,
                id_course: req.body.id_course,
            },
        });

        res.status(201).json({ schedule: updatingSchedule });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Update Schedule' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud Update Schedule', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.patch('/schedule/status/:id', validation.validateStatusSchedule, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingSchedule = await prisma.course_schedule.findUnique({
            where: {
                id_schedule: Number(req.params.id),
            }
        });

        if (!searchingSchedule)
            return res.status(404).json({ error: 'Horario no encontrado.' });

        const updatingScheduleStatus = await prisma.course_schedule.update({
            where: {
                id_schedule: Number(req.params.id),
            },
            data: {
                status: req.body.status,
            },
        });

        res.status(201).json({ schedule: updatingScheduleStatus });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Status Schedule' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud Status Schedule', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

export default router;