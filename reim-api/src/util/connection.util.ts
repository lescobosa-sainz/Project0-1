import { Pool } from 'pg';

const connectionConfiguration = {
    user: process.env.REIM_DB_USERNAME,
    host: process.env.REIM_DB_URL || 'localhost',
    database: process.env.REIM_DB_NAME || 'Reimbursements',
    password: process.env.REIM_DB_PASSWORD,
    port: +process.env.REIM_DB_PORT || 5432,
    max: 5
} 
// console.log(connectionConfiguration);
export const connectionPool = new Pool(connectionConfiguration)