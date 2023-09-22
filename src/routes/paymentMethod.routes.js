import { Router } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../config/db.js';
import * as validation from '../validation/paymentMethod.validation.js';

const router = Router();

router.post('/payment_method/new', validation.validateCreatePaymentMethod, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingPaymentMethod = await prisma.payment_method.findFirst({
            where: {
                card_number: req.body.card_number,
                id_student: req.body.id_student
            },
        });

        if (searchingPaymentMethod)
            return res.status(409).json({ error: 'Ya tienes registrado este numero de tarjeta.' });

        const createNewPaymentMethod = await prisma.payment_method.create({
            data: {
                name: req.body.name,
                card_number: req.body.card_number,
                valid_thru: req.body.valid_thru,
                name_bank: req.body.name_bank,
                type_card: req.body.type_card,
                type_account: req.body.type_account,
                id_student: req.body.id_student
            }
        });
        res.status(201).json({ message: 'Metodo de pago agregado con exito.', Payment_Method: createNewPaymentMethod });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud New payment_method' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud New payment_method', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/payment_method/view/:id', validation.validateViewPaymentMethod, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingPaymentMethod = await prisma.payment_method.findUnique({
            where: {
                id_method: Number(req.params.id),
            }
        });

        if (!searchingPaymentMethod)
            return res.status(404).json({ error: 'Metodo de pago no encontrado.' });

        res.status(201).json({ Payment_Method: searchingPaymentMethod });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud View Payment_method' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud View Payment_method', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/payment_method/list', async (req, res) => {
    try {
        const seachingPaymentMethodList = await prisma.payment_method.findMany();

        if (seachingPaymentMethodList.length === 0)
            return res.status(404).json({ error: 'No hay Metodos de pago registrados.' });

        res.status(201).json({ payment_method: seachingPaymentMethodList });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud List payment_method' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud List payment_method', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.put('/payment_method/update/:id', validation.validateUpdatePaymentMethod, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingPaymentMethod = await prisma.payment_method.findFirst({
            where: {
                card_number: req.body.card_number,
                id_student: req.body.id_student
            },
        });

        if (searchingPaymentMethod)
            return res.status(409).json({ error: 'Ya tienes registrado este numero de tarjeta.' });


        const updatingPaymentMethod = await prisma.payment_method.update({
            where: {
                id_method: Number(req.params.id),
            },
            data: {
                name: req.body.name,
                card_number: req.body.card_number,
                valid_thru: req.body.valid_thru,
                name_bank: req.body.name_bank,
                type_card: req.body.type_card,
                type_account: req.body.type_account,
                id_student: req.body.id_student,
                status: req.body.status
            }
        });
        res.status(201).json({Payment_Method: updatingPaymentMethod });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Update Payment_Method' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud Update Payment_Method', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.patch('/payment_method/status/:id', validation.validateStatusPaymentMethod, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingPaymentMethod = await prisma.payment_method.findUnique({
            where: {
                id_method: Number(req.params.id),
            }
        });

        if (!searchingPaymentMethod)
            return res.status(404).json({ error: 'Metodo de pago no encontrado.' });

        const updatingPaymentMethodStatus = await prisma.payment_method.update({
            where: {
                id_method: Number(req.params.id),
            },
            data: {
                status: req.body.status,
            },
        });

        res.status(201).json({ payment_method: updatingPaymentMethodStatus });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Status payment_method' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud Status payment_method', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

export default router;