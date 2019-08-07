import { connectionPool } from '../util/connection.util';
import { PoolClient } from 'pg';
import Role from '../models/role';

export async function findAll() {
    console.log('finding all Role');
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const result = await client.query('SELECT * FROM role');

        return result.rows.map(sqlRole=> new Role(sqlRole.role_id, sqlRole.role_name));
        // return result.rows.map(convertSqlRole);

    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}