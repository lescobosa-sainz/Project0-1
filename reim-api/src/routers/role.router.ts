import express from 'express';

import * as roleDao from '../daos/sql-role.dao';

export const roleRouter = express.Router();

roleRouter.get('', async (req, res) => {
    const roles = await roleDao.findAll();
    res.json(roles);
});
