import express from 'express';

import * as statusDao from '../daos/sql-status.dao';

export const statusRouter = express.Router();

statusRouter.get('', async (req, res) => {
    const statuss = await statusDao.findAll();
    res.json(statuss);
});
