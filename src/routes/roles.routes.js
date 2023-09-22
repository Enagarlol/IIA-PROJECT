import { Router } from 'express';
import { validationResult } from 'express-validator';
import { prisma } from '../config/db.js';
import * as validation from '../validation/roles.validation.js';

const router = Router();

router.post('/role/new', validation.validateCreateRole, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingRole = await prisma.roles.findFirst({
            where: {
                name: req.body.name,
            },
        });

        if (searchingRole)
            return res.status(409).json({ error: 'Ya existe un rol con el nombre "' + req.body.name + '"' });

        const creatingNewRole = await prisma.roles.create({
            data: {
                name: req.body.name,
            }
        });
        res.status(201).json({ message: 'Rol creado con éxito.', role: creatingNewRole });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud New Role' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud New Role', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/role/view/:id', validation.validateViewRole, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingRole = await prisma.roles.findUnique({
            where: {
                id_roles: Number(req.params.id),
            }
        });

        if (!searchingRole)
            return res.status(404).json({ error: 'Rol no encontrado.' });

        res.status(201).json({ role: searchingRole });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud View Role' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud View Role', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.get('/role/list', async (req, res) => {
    try {
        const searchingRoleList = await prisma.roles.findMany();

        if (searchingRoleList.length === 0)
            return res.status(404).json({ error: 'No hay roles registrados.' });

        res.status(201).json({ roles: searchingRoleList });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud List Role' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud List Role', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.put('/role/update/:id', validation.validateUpdateRole, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingRole = await prisma.roles.findUnique({
            where: {
                id_roles: Number(req.params.id),
            }
        });

        if (!searchingRole)
            return res.status(404).json({ error: 'Rol no encontrado.' });

        const updatingRole = await prisma.roles.update({
            where: {
                id_roles: Number(req.params.id),
            },
            data: {
                name: req.body.name,
                status: req.body.status,
            },
        });

        res.status(201).json({ role: updatingRole });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Update Role' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud Update Role', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

router.patch('/role/status/:id', validation.validateStatusRole, async (req, res) => {
    if (!validationResult(req).isEmpty())
        return res.status(400).json({ errors: validationResult(req).array() });

    try {
        const searchingRole = await prisma.roles.findUnique({
            where: {
                id_roles: Number(req.params.id),
            }
        });

        if (!searchingRole)
            return res.status(404).json({ error: 'Rol no encontrado.' });

        const updatingRoleStatus = await prisma.roles.update({
            where: {
                id_roles: Number(req.params.id),
            },
            data: {
                status: req.body.status,
            },
        });

        res.status(201).json({ role: updatingRoleStatus });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud Status Role' });
        console.error({ error: 'Error interno del servidor al procesar la solicitud Status Role', details: error.message });
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.error('Desconexion de prisma Exitosa');
    }
});

export default router;