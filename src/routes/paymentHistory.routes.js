import { Router } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../config/db.js';
import * as validation from '../validation/paymentHistory.validation.js';

const router = Router();

router.post('/payment_history/new', validation.validateCreatePaymentHistory, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingPaymentHistory = await prisma.payment_history.findFirst({
            where: {
                folio: req.body.folio,
                id_method: req.body.id_method
            },
        });

        if (searchingPaymentHistory)
            return res.status(409).json({ error: 'Ya tienes registrado este folio.' });

        const createNewPaymentHistory = await prisma.payment_history.create({
            data: {
                date_time: req.body.date_time,
                amount: req.body.amount,
                concept: req.body.concept,
                folio: req.body.folio,
                id_course: req.body.id_course,
                id_method: req.body.id_method
            }
        });
        res.status(201).json({ message: 'Historial de pago agregado con exito.', Payment_History: createNewPaymentHistory });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud New payment_history' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud New payment_history', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/payment_history/view/:id', validation.validateViewPaymentHistory, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingPaymentHistory = await prisma.payment_history.findUnique({
            where: {
                id_history: Number(req.params.id),
            }
        });

        if (!searchingPaymentHistory)
            return res.status(404).json({ error: 'Historial de pago no encontrado.' });

        res.status(201).json({ Payment_History: searchingPaymentHistory });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud View Payment_History' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud View Payment_History', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/payment_history/list', async (req, res) => {
    try {
        const seachingPaymentHistoryList = await prisma.payment_history.findMany();

        if (seachingPaymentHistoryList.length === 0)
            return res.status(404).json({ error: 'No hay Metodos de pago registrados.' });

        res.status(201).json({ payment_history: seachingPaymentHistoryList });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud List Payment_History' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud List Payment_History', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.put('/payment_history/update/:id', validation.validateUpdatePaymentHistory, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingPaymentHistory = await prisma.payment_history.findFirst({
            where: {
                folio: req.body.folio,
                id_method: req.body.id_method
            },
        });

        if (searchingPaymentHistory)
            return res.status(409).json({ error: 'Ya tienes registrado este folio.' });


        const updatingPaymentHistory = await prisma.payment_history.update({
            where: {
                id_history: Number(req.params.id),
            },
            data: {
                date_time: req.body.date_time,
                amount: req.body.amount,
                concept: req.body.concept,
                folio: req.body.folio,
                status: req.body.status,
                id_course: req.body.id_course,
                id_method: req.body.id_method,
            }
        });
        res.status(201).json({Payment_History: updatingPaymentHistory });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Update Payment_History' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud Update Payment_History', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.patch('/payment_history/status/:id', validation.validateStatusPaymentHistory, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingPaymentHistory = await prisma.payment_history.findUnique({
            where: {
                id_history: Number(req.params.id),
            }
        });

        if (!searchingPaymentHistory)
            return res.status(404).json({ error: 'Historial de pago no encontrado.' });

        const updatingPaymentHistoryStatus = await prisma.payment_history.update({
            where: {
                id_history: Number(req.params.id),
            },
            data: {
                status: req.body.status,
            },
        });

        res.status(201).json({ payment_history: updatingPaymentHistoryStatus });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Status payment_history' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud Status payment_history', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

export default router;