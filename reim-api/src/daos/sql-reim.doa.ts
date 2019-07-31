import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import { convertSqlReim } from '../util/reim.convert';
//import { convertSqlReim2 } from '../util/reim.convert';
import Reim from '../models/reim';



export async function findAll() {
    console.log('finding all reimbursements');
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this

        const result = await client.query(`select * from reim r
		inner join type using (type_id)
        inner join status using (status_id)
        inner join app_user w on (r.author = w.user_id)
        left join r_view v on (r.resolver = v.r_id)
        `);

        // convert result from sql object to js object
        return result.rows.map(convertSqlReim);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

export async function findByAuthorId(authorId: number) {
    console.log('finding status by authorid: ' + authorId);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this

        const result = await client.query(`Select * from reim r
		inner join type using (type_id)
        inner join status using (status_id)
        inner join app_user w on (r.author = w.user_id)
		 WHERE user_id = $1`, [authorId]);
        console.log('auther i won');

        return result.rows.map(convertSqlReim);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findById(id: number) {
    console.log('finding reim by id: ' + id);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this

        const result = await client.query(`Select * from reim r
		inner join type using (type_id)
        inner join status using (status_id)
        inner join app_user w on (r.author = w.user_id)
        left join r_view v on (r.resolver = v.r_id)
		 WHERE reimbursement_id = $1`, [id]);
        const sqlReim = result.rows[0];

        return sqlReim && convertSqlReim(sqlReim);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findByReimStatusId(statusId: number) {
    console.log('finding status by status id: ' + statusId);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        console.log(statusId);
        const result = await client.query(`Select * from reim r
		inner join type using (type_id)
        inner join status using (status_id)
        inner join app_user w on (r.author = w.user_id)
		 WHERE status_id = $1`, [statusId]);
       
         return result.rows.map(convertSqlReim);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function save(reim: Reim) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this

        const queryString = `
            INSERT INTO reim (author, amount, date_submited, date_resolved, description, resolver, status_id, type_id)
            VALUES 	($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING reimbursement_id
        `;
        const params = [reim.author, reim.amount, reim.dateSubmitted, reim.dateResolved, reim.description, reim.resolver, reim.status, reim.type];
        const result = await client.query(queryString, params);

        return result.rows[0].reimbursement_id;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

export async function update(reim: Reim) {
    const oldReim = await findById(reim.reimId);
    if (!oldReim) {
        return undefined;
    }
    reim = {
        ...oldReim,
        ...reim
    };
    console.log(reim);
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            UPDATE reim SET author = $1, amount = $2, date_submited = $3, date_resolved = $4, description = $5, resolver = $6, status_id = $7, type_id = $8
            WHERE reimbursement_id = $9
            RETURNING *
        `;
        const params = [reim.author, reim.amount, reim.dateSubmitted, reim.dateResolved, reim.description, reim.resolver, reim.status, reim.type, reim.reimId];
        const result = await client.query(queryString, params);
        const sqlReim = result.rows[0];
        return convertSqlReim(sqlReim);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}