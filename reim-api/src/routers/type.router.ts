import express from 'express';
import * as typeDao from '../daos/sql-type.dao';

export const typeRouter = express.Router();
typeRouter.get('', async (req, res) => {
    const types = await typeDao.findAll();
    res.json(types);
});
